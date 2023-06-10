import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import { Button, Searchbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export const AppRoot = () => {
  const [bottomSheetIndex, setBottomSheetIndex] = useState<number>(-1);
  const [invisiblePaddingHeight, setInvisiblePaddingHeight] =
    useState<number>(56);
  const [isMain, setIsMain] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["25%", "50%", "75%", "100%"], []);

  const handleBottomSheetChange = useCallback(
    (isMain: boolean) => {
      bottomSheetRef.current?.close();

      setIsMain(() => isMain);

      setTimeout(() => {
        bottomSheetRef.current?.snapToIndex(1);
      }, 0);
    },
    [bottomSheetRef]
  );

  return (
    <SafeAreaView style={{ flex: 1, width: "100%" }}>
      <View style={{ margin: 8 }}>
        <Text>This is how we do!</Text>
        <Button
          mode="elevated"
          onPress={() => {
            bottomSheetRef.current?.snapToIndex(1);
          }}
        >
          Make it rain
        </Button>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          margin: 8,
        }}
      >
        <Button
          mode="contained"
          onPress={() => {
            handleBottomSheetChange(true);
          }}
        >
          Main
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            handleBottomSheetChange(false);
          }}
        >
          Alt
        </Button>
      </View>
      <BottomSheet
        enablePanDownToClose
        index={bottomSheetIndex}
        onChange={(e) => {
          setBottomSheetIndex(() => e);
        }}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        style={{
          backgroundColor: "white",
          borderRadius: 24,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 16,
          },
          shadowOpacity: 0.1,
          shadowRadius: 24,
          elevation: 24,
        }}
      >
        <View
          style={{
            flex: 1,
            margin: 8,
            marginTop: 11,
          }}
        >
          {isMain ? (
            <BottomSheetContentMain
              invisiblePaddingHeight={invisiblePaddingHeight}
            />
          ) : (
            <BottomSheetContentAlt
              invisiblePaddingHeight={invisiblePaddingHeight}
            />
          )}
          <View
            onLayout={(e) => {
              setInvisiblePaddingHeight(() => e.nativeEvent.layout.height);
            }}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.75)",
              paddingBottom: 8,
              position: "absolute",
              width: "100%",
            }}
          >
            <Searchbar
              elevation={2}
              onChangeText={(e) => {
                setSearchTerm(() => e);
              }}
              onEndEditing={() => {
                console.log("DONE");
                console.log(searchTerm);
              }}
              onClearIconPress={() => setSearchTerm(() => "")}
              placeholder="This is what I'm looking for!"
              value={searchTerm}
            />
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const BottomSheetContentMain = ({
  invisiblePaddingHeight,
}: {
  invisiblePaddingHeight: number;
}) => {
  return (
    <BottomSheetScrollView>
      <View style={{ height: invisiblePaddingHeight }} />
      <Text variant="headlineLarge">Main</Text>
      {Array.from({ length: 200 })
        .map((_, idx) => idx)
        .map((item) => (
          <View key={item}>
            <Text>Main - {item}</Text>
          </View>
        ))}
    </BottomSheetScrollView>
  );
};

const BottomSheetContentAlt = ({
  invisiblePaddingHeight,
}: {
  invisiblePaddingHeight: number;
}) => {
  return (
    <BottomSheetScrollView>
      <View style={{ height: invisiblePaddingHeight }} />
      <Text variant="headlineLarge">Alt</Text>
      {Array.from({ length: 200 })
        .map((_, idx) => idx)
        .map((item) => (
          <View key={item}>
            <Text>Alt - {item}</Text>
          </View>
        ))}
    </BottomSheetScrollView>
  );
};

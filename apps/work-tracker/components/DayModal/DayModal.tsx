import { useCallback, useState } from "react";
import { View } from "react-native";
import {
  Button,
  IconButton,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";

import { useAppDispatch, useAppSelector } from "@hooks";
import { setTouchedDate } from "@store";
import { APP_PADDING } from "@theme";
import { DayInformation } from "@types";
import { formatDateString, getMonthName, getWeekdayName } from "@utils";

import { BottomButtonContainer, RowContainer } from "./Styled";

const DEFAULT_HOURLY_RATE = 28.4445;
const DEFAULT_HOURS_WORKED = 7.6;

export const DayModal = () => {
  const dispatch = useAppDispatch();

  const { touchedDate } = useAppSelector(({ app }) => ({ ...app }));

  const [dayInformation, setDayInformation] = useState<DayInformation>({
    hourlyRate: DEFAULT_HOURLY_RATE,
    hoursWorked: DEFAULT_HOURS_WORKED,
    comments: "",
  });

  const handleOK = useCallback(() => {
    setDayInformation(() => ({
      hourlyRate: DEFAULT_HOURLY_RATE,
      hoursWorked: DEFAULT_HOURS_WORKED,
      comments: "",
    }));

    dispatch(setTouchedDate(null));
  }, [dayInformation]);

  const handleCancel = () => {
    setDayInformation(() => ({
      hourlyRate: DEFAULT_HOURLY_RATE,
      hoursWorked: DEFAULT_HOURS_WORKED,
      comments: "",
    }));

    dispatch(setTouchedDate(null));
  };

  return (
    <Portal>
      <Modal
        contentContainerStyle={{ backgroundColor: "white", borderRadius: 5 }}
        onDismiss={handleCancel}
        style={{ margin: APP_PADDING }}
        visible={!!touchedDate}
      >
        <View>
          {!!touchedDate ? (
            <View style={{ padding: APP_PADDING }}>
              <Text variant="titleLarge">
                {getMonthName(touchedDate.SELECTED_MONTH)}{" "}
                {formatDateString(touchedDate.SELECTED_DATE)},{" "}
                {touchedDate.SELECTED_YEAR}
              </Text>
              <RowContainer>
                <TextInput
                  keyboardType="numeric"
                  label="Hours worked"
                  mode="outlined"
                  onChangeText={(e) => {
                    console.log(e);
                    if (e === "") {
                      return setDayInformation((dayInformation) => ({
                        ...dayInformation,
                        hoursWorked: 0,
                      }));
                    }

                    if (!!parseFloat(e) || !!e) {
                      return setDayInformation((dayInformation) => ({
                        ...dayInformation,
                        hoursWorked: parseFloat(e),
                      }));
                    }
                  }}
                  style={{
                    flex: 1,
                    marginTop: APP_PADDING,
                  }}
                  value={dayInformation.hoursWorked.toString()}
                />
                <IconButton
                  disabled={dayInformation.hoursWorked === DEFAULT_HOURS_WORKED}
                  icon="hand-okay"
                  mode="contained"
                  onPress={() => {
                    setDayInformation((dayInformation) => ({
                      ...dayInformation,
                      hoursWorked: DEFAULT_HOURS_WORKED,
                    }));
                  }}
                  style={{ marginLeft: APP_PADDING }}
                />
              </RowContainer>
              <RowContainer>
                <TextInput
                  keyboardType="numeric"
                  label="Hourly rate"
                  mode="outlined"
                  onChangeText={(e) => {
                    if (e === "") {
                      return setDayInformation((dayInformation) => ({
                        ...dayInformation,
                        hourlyRate: 0,
                      }));
                    }

                    if (!!parseFloat(e)) {
                      return setDayInformation((dayInformation) => ({
                        ...dayInformation,
                        hourlyRate: parseFloat(e),
                      }));
                    }
                  }}
                  style={{ flex: 1 }}
                  value={dayInformation.hourlyRate.toString()}
                />
                <IconButton
                  disabled={dayInformation.hourlyRate === DEFAULT_HOURLY_RATE}
                  icon="hand-okay"
                  mode="contained"
                  onPress={() => {
                    setDayInformation((dayInformation) => ({
                      ...dayInformation,
                      hourlyRate: DEFAULT_HOURLY_RATE,
                    }));
                  }}
                  style={{ marginLeft: APP_PADDING }}
                />
              </RowContainer>
              <TextInput
                label="Comments"
                mode="outlined"
                multiline
                numberOfLines={4}
                style={{ marginBottom: APP_PADDING }}
                value={dayInformation.comments}
              />
              <BottomButtonContainer>
                <Button onPress={handleCancel}>Cancel</Button>
                <Button mode="contained" onPress={handleOK}>
                  OK
                </Button>
              </BottomButtonContainer>
            </View>
          ) : (
            <View />
          )}
        </View>
      </Modal>
    </Portal>
  );
};

import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";

import { AppRoot } from "@components/AppRoot";
import { store } from "@store";
import { trpc } from "@utils";

const { API_URL, API_URL_DEV, ENV } = Constants.expoConfig?.extra! as {
  API_URL: string;
  API_URL_DEV: string;
  ENV: "development" | "production";
};

export const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${ENV === "development" ? API_URL_DEV : API_URL}/trpc`,
        }),
      ],
    })
  );

  return (
    <ReduxProvider store={store}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <PaperProvider>
                <View style={styles.container}>
                  <StatusBar style="auto" />
                  <AppRoot />
                </View>
              </PaperProvider>
            </GestureHandlerRootView>
          </NavigationContainer>
        </QueryClientProvider>
      </trpc.Provider>
    </ReduxProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

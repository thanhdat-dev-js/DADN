import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import LoginScreen from "./screens/LoginScreen";
import Register from "./screens/Register";
export const AppContext = React.createContext<any>(null);
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<any>(null);
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AppContext.Provider value={{ user, setUser }}>
          {user == "register" ? (
            <Register setUser={setUser} />
          ) : user ? (
            <Navigation colorScheme={colorScheme} />
          ) : (
            <LoginScreen setUser={setUser} />
          )}
          <StatusBar />
        </AppContext.Provider>
      </SafeAreaProvider>
    );
  }
}

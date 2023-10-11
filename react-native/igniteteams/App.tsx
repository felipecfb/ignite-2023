import { ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { ThemeProvider } from "styled-components/native";

import { Groups } from "@screens/Groups";

import theme from "./src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
    <ThemeProvider theme={theme}>
      {
        fontsLoaded ? <Groups /> : <ActivityIndicator />
      }
    </ThemeProvider>
  );
}

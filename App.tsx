/* eslint-disable camelcase */
import React, { useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeBaseProvider } from 'native-base'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import {
  NunitoSans_400Regular,
  NunitoSans_700Bold,
} from '@expo-google-fonts/nunito-sans'
import { theme } from './src/style/theme'
import { Home } from './src/sreens/home'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    NunitoSans_700Bold,
    NunitoSans_400Regular,
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaView>
        <Home />
      </SafeAreaView>
    </NativeBaseProvider>
  )
}

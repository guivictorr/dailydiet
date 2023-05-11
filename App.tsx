/* eslint-disable camelcase */
import React, { useCallback } from 'react'
import { NativeBaseProvider } from 'native-base'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import {
  NunitoSans_400Regular,
  NunitoSans_700Bold,
} from '@expo-google-fonts/nunito-sans'
import { theme } from './src/style/theme'
import { Routes } from './src/routes'
import { NavigationContainer } from '@react-navigation/native'

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
    <>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer onReady={onLayoutRootView}>
          <Routes />
        </NavigationContainer>
      </NativeBaseProvider>
    </>
  )
}

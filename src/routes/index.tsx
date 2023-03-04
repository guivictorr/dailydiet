import { SafeAreaView } from 'react-native'
import { useTheme } from 'native-base'
import { AppRoutes } from './app.routes'

export function Routes() {
  const { colors } = useTheme()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray['600'] }}>
      <AppRoutes />
    </SafeAreaView>
  )
}

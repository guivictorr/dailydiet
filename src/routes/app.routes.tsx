import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '../sreens/home'

type AppRoutesList = {
  Home: undefined
}

const { Screen, Navigator } = createNativeStackNavigator<AppRoutesList>()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
    </Navigator>
  )
}

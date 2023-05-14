import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import { Feedback } from '../sreens/feedback'
import { GeneralStatistics } from '../sreens/general-statistics'
import { Home } from '../sreens/home'
import { MealDetails } from '../sreens/meal-details'
import { NewMeal } from '../sreens/new-meal'

export type AppRoutesList = {
  Home: undefined
  NewMeal: { mode: 'EDIT' | 'CREATE' }
  GeneralStatistics: undefined
  Feedback: { isOnDiet: string }
  MealDetails: {
    mealId: string
  }
}

export type StackNavigationProp = NativeStackNavigationProp<AppRoutesList>

const { Screen, Navigator } = createNativeStackNavigator<AppRoutesList>()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="NewMeal" component={NewMeal} />
      <Screen name="GeneralStatistics" component={GeneralStatistics} />
      <Screen name="Feedback" component={Feedback} />
      <Screen name="MealDetails" component={MealDetails} />
    </Navigator>
  )
}

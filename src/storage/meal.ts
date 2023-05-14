import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Crypto from 'expo-crypto'

const STORAGE_PREFIX = '@daily-diet'

export type MealStorageDTO = {
  id: string
  name: string
  isOnDiet: 'yes' | 'no'
  description: string
  date: string
}

export async function getMeals() {
  try {
    const storage = await AsyncStorage.getItem(`${STORAGE_PREFIX}:meal`)
    const meals: MealStorageDTO[] = storage ? JSON.parse(storage) : []

    return meals
  } catch (error) {
    throw new Error('getMeals: error trying to parse meals')
  }
}

export async function getMealById(id: string) {
  try {
    const storedMeals = await getMeals()

    const filteredMealById = storedMeals.find((meal) => meal.id === id)

    if (!filteredMealById) {
      return null
    }

    return filteredMealById
  } catch (error) {
    throw new Error('getMealById: error trying to parse meal')
  }
}

export async function createMeal(meal: Omit<MealStorageDTO, 'id'>) {
  try {
    const storedMeals = await getMeals()

    const newMeal = {
      ...meal,
      id: Crypto.randomUUID(),
    }

    const storage = JSON.stringify([...storedMeals, newMeal])

    await AsyncStorage.setItem(`${STORAGE_PREFIX}:meal`, storage)
  } catch (error) {
    throw new Error('createMeal: an error happened during meal creation')
  }
}

export async function deleteMeal(mealId: string) {
  try {
    const storedMeals = await getMeals()

    const filteredMeals = storedMeals.filter((meal) => meal.id !== mealId)

    const storage = JSON.stringify(filteredMeals)

    await AsyncStorage.setItem(`${STORAGE_PREFIX}:meal`, storage)
  } catch (error) {
    throw new Error('deleteMeal: error trying to delete meal')
  }
}

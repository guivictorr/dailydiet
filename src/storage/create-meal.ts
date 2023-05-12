import AsyncStorage from '@react-native-async-storage/async-storage'
import { randomUUID } from 'node:crypto'

const STORAGE_PREFIX = '@daily-diet'

type MealStorageDTO = {
  id: string
  name: string
  isOnDiet: 'yes' | 'no'
  description: string
  date: Date
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

    const filteredMealById = storedMeals.filter((meal) => meal.id === id)

    return filteredMealById
  } catch (error) {
    throw new Error('getMealById: error trying to parse meal')
  }
}

export async function createMeal(meal: MealStorageDTO) {
  try {
    const storedMeals = await getMeals()

    const newMeal = {
      ...meal,
      id: randomUUID(),
    }

    const storage = JSON.stringify([...storedMeals, newMeal])

    await AsyncStorage.setItem(`${STORAGE_PREFIX}:meal`, storage)
  } catch (error) {
    throw new Error('createMeal: an error happened during meal creation')
  }
}

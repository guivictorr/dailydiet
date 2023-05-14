import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { getMeals, MealStorageDTO } from '../storage/meal'

export function useStatistics() {
  const [meals, setMeals] = useState<MealStorageDTO[]>([])
  const totalMeals = meals.length
  const totalMealsOnDiet = meals.filter(
    (meal) => meal.isOnDiet === 'yes',
  ).length
  const totalMealsOffDiet = meals.filter(
    (meal) => meal.isOnDiet === 'no',
  ).length

  const percentageOnDiet = (totalMealsOnDiet * 100) / totalMeals

  useFocusEffect(
    useCallback(() => {
      getMeals().then(setMeals)
    }, []),
  )

  return {
    percentageOnDiet,
    totalMealsOffDiet,
    totalMealsOnDiet,
    totalMeals,
  }
}

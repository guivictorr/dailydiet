import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { getMeals, MealStorageDTO } from "../storage/meal";

export function useStatistics() {
	const [meals, setMeals] = useState<MealStorageDTO[]>([]);
	const totalMeals = meals.length;
	const totalMealsOnDiet = meals.filter(
		(meal) => meal.isOnDiet === "yes"
	).length;
	const totalMealsOffDiet = meals.filter(
		(meal) => meal.isOnDiet === "no"
	).length;

	const percentageOnDiet = totalMeals
		? (totalMealsOnDiet * 100) / totalMeals
		: 0;

	const onDietStreak = meals
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
		.reduce((acc, meal) => {
			if (meal.isOnDiet === "yes") {
				acc++;
			} else {
				acc = 0;
			}

			return acc;
		}, 0);

	useFocusEffect(
		useCallback(() => {
			getMeals().then(setMeals);
		}, [])
	);

	return {
		percentageOnDiet,
		totalMealsOffDiet,
		totalMealsOnDiet,
		totalMeals,
		onDietStreak,
	};
}

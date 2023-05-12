import { useNavigation } from '@react-navigation/native'
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Image,
  SectionList,
  Text,
  VStack,
} from 'native-base'
import { Plus } from 'phosphor-react-native'
import { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import DailyDietLogo from '../../assets/logo.png'
import { Meal } from '../components/meal'
import { StatisticResume } from '../components/statistic-resume'
import { UserPhoto } from '../components/user-photo'
import { StackNavigationProp } from '../routes/app.routes'
import { getMeals, MealStorageDTO } from '../storage/meal'

export function Home() {
  const [meals, setMeals] = useState<
    { title: string; data: MealStorageDTO[] }[]
  >([])
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<StackNavigationProp>()

  useEffect(() => {
    getMeals().then((meals) => {
      const formattedMealsArray = meals.map((meal) => {
        return {
          title: meal.date.toString(),
          data: meals.filter(
            (originalMeals) => originalMeals.date === meal.date,
          ),
        }
      })

      setMeals(formattedMealsArray)
    })
  }, [])

  return (
    <VStack px="6" pt="5">
      <HStack
        pt={insets.top}
        alignItems="center"
        justifyContent="space-between"
      >
        <Image alt="Daily Diet" source={DailyDietLogo} />
        <UserPhoto />
      </HStack>
      <Box mt="8" mb="10">
        <StatisticResume status="OFF_DIET" />
      </Box>

      <Text mb="2" fontSize="lg">
        Refeições
      </Text>
      <Button
        onPress={() => navigation.navigate('NewMeal', { mode: 'CREATE' })}
        startIcon={<Icon as={<Plus color="white" size={18} />} />}
      >
        Nova Refeição
      </Button>

      <SectionList
        sections={meals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Meal createdAt={item.date} name={item.name} status="OFF_DIET" />
        )}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title } }) => (
          <Heading mt="8" mb="2" fontSize="xl">
            {new Date(title).toLocaleDateString('pt-br', {})}
          </Heading>
        )}
      />
    </VStack>
  )
}

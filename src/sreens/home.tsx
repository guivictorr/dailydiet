import { useFocusEffect, useNavigation } from '@react-navigation/native'
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  Pressable,
  SectionList,
  Text,
  VStack,
} from 'native-base'
import { Plus } from 'phosphor-react-native'
import { useCallback, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import DailyDietLogo from '../../assets/logo.png'
import { Meal } from '../components/meal'
import { StatisticResume } from '../components/statistic-resume'
import { UserPhoto } from '../components/user-photo'
import { StackNavigationProp } from '../routes/app.routes'
import { getMeals, MealStorageDTO } from '../storage/meal'

type SectionListMeal = { title: string; data: MealStorageDTO[] }

export function Home() {
  const [meals, setMeals] = useState<SectionListMeal[]>([])
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<StackNavigationProp>()

  useFocusEffect(
    useCallback(() => {
      getMeals().then((meals) => {
        const formattedMeals = meals.reduce((acc, meal) => {
          const day = new Date(meal.date).getDay().toString()
          acc[day] = acc[day] || { title: meal.date, data: [] }
          acc[day].data.push(meal)

          return acc
        }, {} as Record<string, SectionListMeal>)

        setMeals(
          Object.values(formattedMeals).sort(
            (a, b) => new Date(b.title).getTime() - new Date(a.title).getTime(),
          ),
        )
      })
    }, []),
  )

  return (
    <VStack flex={1} px="6" pt="5">
      <HStack
        pt={insets.top}
        alignItems="center"
        justifyContent="space-between"
      >
        <Image alt="Daily Diet" source={DailyDietLogo} />
        <Pressable onPress={() => navigation.navigate('Profile')}>
          <UserPhoto />
        </Pressable>
      </HStack>
      <Box mt="8" mb="10">
        <StatisticResume />
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
          <Meal
            mealId={item.id}
            createdAt={item.date}
            name={item.name}
            status={item.isOnDiet}
          />
        )}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={() => (
          <Center flex={1} h="full">
            <Heading fontSize="lg">Não há refeições cadastradas</Heading>
            <Text>Tente clicar em nova refeição</Text>
          </Center>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Heading mt="8" fontSize="xl">
            {new Date(title).toLocaleDateString('pt-br', {})}
          </Heading>
        )}
        contentContainerStyle={{
          paddingBottom: 24,
          flex: meals.length === 0 ? 1 : 0,
        }}
      />
    </VStack>
  )
}

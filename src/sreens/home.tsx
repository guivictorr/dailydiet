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
import { SectionListData } from 'react-native'
import DailyDietLogo from '../../assets/logo.png'
import { Meal, MealProps } from '../components/meal'
import { StatisticResume } from '../components/statistic-resume'
import { UserPhoto } from '../components/user-photo'

const mealsList: SectionListData<MealProps>[] = [
  {
    title: '18.05.2023',
    data: [
      {
        name: 'X-tudo',
        status: 'OFF_DIET',
        createdAt: new Date(),
      },
    ],
  },
  {
    title: '18.05.2023',
    data: [
      {
        name: 'Whey',
        status: 'ON_DIET',
        createdAt: new Date(),
      },
    ],
  },
]

export function Home() {
  return (
    <VStack px="6" pt="5">
      <HStack alignItems="center" justifyContent="space-between">
        <Image alt="Daily Diet" source={DailyDietLogo} />
        <UserPhoto />
      </HStack>
      <Box mt="8" mb="10">
        <StatisticResume status="OFF_DIET" />
      </Box>

      <Text mb="2" fontSize="lg">
        Refeições
      </Text>
      <Button startIcon={<Icon as={<Plus color="white" size={18} />} />}>
        Nova Refeição
      </Button>

      <SectionList
        sections={mealsList}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => <Meal {...item} />}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title } }) => (
          <Heading mt="8" mb="2" fontSize="xl">
            {title}
          </Heading>
        )}
      />
    </VStack>
  )
}

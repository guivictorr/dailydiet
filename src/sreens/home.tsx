import { Box, HStack, Image, VStack } from 'native-base'
import DailyDietLogo from '../../assets/logo.png'
import { StatisticResume } from '../components/statistic-resume'
import { UserPhoto } from '../components/user-photo'

export function Home() {
  return (
    <VStack px="6" pt="5">
      <HStack alignItems="center" justifyContent="space-between">
        <Image alt="Daily Diet" source={DailyDietLogo} />
        <UserPhoto />
      </HStack>
      <Box mt="8">
        <StatisticResume />
      </Box>
    </VStack>
  )
}

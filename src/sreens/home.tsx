import { Box, Button, HStack, Icon, Image, Text, VStack } from 'native-base'
import { Plus } from 'phosphor-react-native'
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
      <Box mt="8" mb="10">
        <StatisticResume />
      </Box>

      <Text mb="2" fontSize="lg">
        Refeições
      </Text>
      <Button startIcon={<Icon as={<Plus color="white" size={18} />} />}>
        Nova Refeição
      </Button>
    </VStack>
  )
}

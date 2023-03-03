import { HStack, Image, VStack } from 'native-base'
import DailyDietLogo from '../../assets/logo.png'
import { UserPhoto } from '../components/user-photo'

export function Home() {
  return (
    <VStack flex={1}>
      <HStack justifyContent="space-between" pt="5" px="6">
        <Image alt="Daily Diet" source={DailyDietLogo} />
        <UserPhoto />
      </HStack>
    </VStack>
  )
}

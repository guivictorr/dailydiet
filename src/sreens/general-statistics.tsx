import { useNavigation } from '@react-navigation/native'
import {
  Center,
  Heading,
  Icon,
  IconButton,
  Text,
  useTheme,
  VStack,
} from 'native-base'
import { ArrowLeft } from 'phosphor-react-native'
import { StackNavigationProp } from '../routes/app.routes'

export function GeneralStatistics() {
  const { colors } = useTheme()
  const navigation = useNavigation<StackNavigationProp>()
  return (
    <VStack>
      <Center px="8" h={160} bg="greenLight" position="relative">
        <IconButton
          onPress={navigation.goBack}
          position="absolute"
          top="4"
          left="24px"
          icon={<Icon as={() => <ArrowLeft color={colors.greenDark} />} />}
          _pressed={{
            backgroundColor: 'greenMid',
            rounded: 'full',
          }}
        />
        <Heading fontSize="3xl">90,86%</Heading>
        <Text fontSize="md">das refeições dentro da dieta</Text>
      </Center>
    </VStack>
  )
}

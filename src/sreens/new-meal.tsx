import { useNavigation } from '@react-navigation/native'
import {
  Center,
  Heading,
  Icon,
  IconButton,
  useTheme,
  VStack,
} from 'native-base'
import { ArrowLeft } from 'phosphor-react-native'
import { Input } from '../components/input'
import { StackNavigationProp } from '../routes/app.routes'

export function NewMeal() {
  const { colors } = useTheme()
  const navigation = useNavigation<StackNavigationProp>()
  return (
    <VStack>
      <Center px="8" h={20} bg="gray.500" position="relative">
        <IconButton
          onPress={navigation.goBack}
          position="absolute"
          top="4"
          left="24px"
          icon={<Icon as={() => <ArrowLeft color={colors.gray['100']} />} />}
          _pressed={{
            backgroundColor: 'gray.400:alpha.40',
            rounded: 'full',
          }}
        />
        <Heading fontSize="lg">Nova refeição</Heading>
      </Center>
      <VStack pt="10" px="8" bg="gray.700" roundedTop="20" mt={-2} h="full">
        <Input label="Nome" errorMessage="Error message" />
      </VStack>
    </VStack>
  )
}

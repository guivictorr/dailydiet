import { useNavigation, useRoute } from '@react-navigation/native'
import {
  Center,
  Heading,
  Icon,
  IconButton,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from 'native-base'
import { ArrowLeft } from 'phosphor-react-native'
import { StackNavigationProp } from '../routes/app.routes'

export function MealDetails() {
  const { params } = useRoute()
  const { colors } = useTheme()
  const navigation = useNavigation<StackNavigationProp>()

  const { isOnDiet } = params as { isOnDiet: boolean }
  const color = isOnDiet ? 'green' : 'red'

  return (
    <VStack>
      <Center px="8" h={20} bg={`${color}Light`} position="relative">
        <IconButton
          onPress={navigation.goBack}
          position="absolute"
          top="4"
          left="24px"
          icon={
            <Icon as={() => <ArrowLeft color={colors[`${color}Dark`]} />} />
          }
          _pressed={{
            backgroundColor: 'gray.400:alpha.40',
            rounded: 'full',
          }}
        />
        <Heading fontSize="lg">Refeição</Heading>
      </Center>
      <ScrollView pt="10" px="8" bg="gray.700" roundedTop="20" mt={-2} h="full">
        <Text>Hello</Text>
      </ScrollView>
    </VStack>
  )
}

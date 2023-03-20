import { useNavigation } from '@react-navigation/native'
import {
  Center,
  Heading,
  HStack,
  ICenterProps,
  Icon,
  IconButton,
  Stack,
  Text,
  useTheme,
  VStack,
} from 'native-base'
import { ArrowLeft } from 'phosphor-react-native'
import { StackNavigationProp } from '../routes/app.routes'

type CenteredBoxProps = {
  title: string
  description: string
} & ICenterProps

const CenteredBox = ({ title, description, ...rest }: CenteredBoxProps) => (
  <Center bg="gray.600" rounded="8" p="4" {...rest}>
    <Heading>{title}</Heading>
    <Text textAlign="center">{description}</Text>
  </Center>
)

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
      <VStack bg="gray.700" roundedTop="20" mt={-2} h="full">
        <Center>
          <Heading fontSize="xs" mt="8" mb="6">
            Estatísticas gerais
          </Heading>
          <Stack space="3" px="8" w="full">
            <CenteredBox
              title="22"
              description="melhor sequência de pratos dentro da dieta"
            />
            <CenteredBox title="109" description="refeições registradas" />
            <HStack space="3" justifyContent="space-between">
              <CenteredBox
                title="99"
                description="refeições dentro da dieta"
                flex={1}
                bg="greenLight"
              />
              <CenteredBox
                title="10"
                description="refeições fora da dieta"
                flex={1}
                bg="redLight"
              />
            </HStack>
          </Stack>
        </Center>
      </VStack>
    </VStack>
  )
}

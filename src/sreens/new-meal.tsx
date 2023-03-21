import { useNavigation } from '@react-navigation/native'
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Icon,
  IconButton,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from 'native-base'
import { ArrowLeft } from 'phosphor-react-native'
import { ReactNode } from 'react'
import { Input } from '../components/input'
import { StackNavigationProp } from '../routes/app.routes'

type RadioButtonProps = {
  children: ReactNode
  color: 'red' | 'green'
}

function RadioButton({ children, color }: RadioButtonProps) {
  return (
    <Button
      flex={1}
      flexDir="row"
      bg="gray.600"
      rounded="6"
      borderWidth={1}
      borderColor="gray.600"
      _pressed={{
        bg: `${color}Light`,
        borderWidth: 1,
        borderColor: `${color}Dark`,
      }}
    >
      <HStack alignItems="center">
        <Box boxSize="2" mr="2" bg={`${color}Dark`} rounded="full" />
        <Text fontSize="md" fontWeight="bold" color="gray.100">
          {children}
        </Text>
      </HStack>
    </Button>
  )
}

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
      <ScrollView pt="10" px="8" bg="gray.700" roundedTop="20" mt={-2} h="full">
        <VStack space="6">
          <Input label="Nome" />
          <Input
            label="Descrição"
            input={{
              multiline: true,
              h: 120,
            }}
          />
          <HStack space="5" justifyContent="space-between">
            <Input
              label="Data"
              formControl={{
                flex: 1,
              }}
            />
            <Input
              label="Hora"
              formControl={{
                flex: 1,
              }}
            />
          </HStack>
          <VStack>
            <Text mb="2" fontWeight="bold" fontSize="md">
              Está dentro da dieta ?
            </Text>
            <HStack space="4" justifyContent="space-between">
              <RadioButton color="green">Sim </RadioButton>
              <RadioButton color="red">Não</RadioButton>
            </HStack>
          </VStack>

          <Button>Cadastrar refeição</Button>
        </VStack>
      </ScrollView>
    </VStack>
  )
}

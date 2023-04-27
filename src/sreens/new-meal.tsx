import { useNavigation, useRoute } from '@react-navigation/native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
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
import { ReactNode, useState } from 'react'
import { Input } from '../components/input'
import { StackNavigationProp, AppRoutesList } from '../routes/app.routes'

type RadioButtonProps = {
  children: ReactNode
  color: 'red' | 'green'
  isSelected?: boolean
  onPress?: () => void
}

function RadioButton({
  children,
  color,
  isSelected,
  onPress,
}: RadioButtonProps) {
  return (
    <Button
      flex={1}
      flexDir="row"
      bg="gray.600"
      rounded="6"
      borderWidth={1}
      borderColor="gray.600"
      isPressed={isSelected}
      onPress={onPress}
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

const modes = {
  EDIT: {
    title: 'Editar refeição',
    submitText: 'Salvar refeição',
  },
  CREATE: {
    title: 'Nova refeição',
    submitText: 'Cadastrar refeição',
  },
}

export function NewMeal() {
  const [isOnDiet, setIsOnDiet] = useState(true)
  const { colors } = useTheme()
  const navigation = useNavigation<StackNavigationProp>()
  const { params } = useRoute()
  const { mode } = params as AppRoutesList['NewMeal']

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [date, setDate] = useState<Date | null>(null)

  const showDateTimePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date: Date) => {
    setDate(date)
    hideDatePicker()
  }

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
        <Heading fontSize="lg">{modes[mode].title}</Heading>
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
            <VStack w="full">
              <Text fontWeight="bold" fontSize="md">
                Data e hora
              </Text>
              <Button
                bg="transparent"
                h="16"
                borderWidth={1}
                borderColor="gray.500"
                onPress={showDateTimePicker}
                _text={{
                  color: 'black',
                }}
                _pressed={{
                  bg: 'transparent',
                }}
              >
                {date &&
                  date.toLocaleDateString('pt-br', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
              </Button>
            </VStack>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </HStack>
          <VStack>
            <Text mb="2" fontWeight="bold" fontSize="md">
              Está dentro da dieta ?
            </Text>
            <HStack space="4" justifyContent="space-between">
              <RadioButton
                isSelected={isOnDiet}
                onPress={() => setIsOnDiet(true)}
                color="green"
              >
                Sim
              </RadioButton>
              <RadioButton
                isSelected={!isOnDiet}
                onPress={() => setIsOnDiet(false)}
                color="red"
              >
                Não
              </RadioButton>
            </HStack>
          </VStack>

          <Button
            mt="8"
            onPress={() => navigation.navigate('Feedback', { isOnDiet })}
          >
            {modes[mode].submitText}
          </Button>
        </VStack>
      </ScrollView>
    </VStack>
  )
}

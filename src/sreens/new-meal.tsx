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
import { useState } from 'react'
import { Input } from '../components/input'
import { StackNavigationProp, AppRoutesList } from '../routes/app.routes'
import { Controller, useForm } from 'react-hook-form'

type RadioButtonProps = {
  options: {
    label: string
    value: string
    color: 'red' | 'green'
  }[]
  onChangeValue?: (radioValue: string) => void
}

function RadioButtons({ options, onChangeValue }: RadioButtonProps) {
  const [selectedId, setSelectedId] = useState(options[0].value)

  function onPressRadioButton(radioValue: string) {
    setSelectedId(radioValue)
    if (onChangeValue) {
      onChangeValue(radioValue)
    }
  }

  return (
    <HStack space="4" justifyContent="space-between">
      {options.map((option) => (
        <Button
          key={option.value}
          flex={1}
          flexDir="row"
          bg="gray.600"
          rounded="6"
          borderWidth={1}
          borderColor="gray.600"
          isPressed={selectedId === option.value}
          _pressed={{
            bg: `${option.color}Light`,
            borderWidth: 1,
            borderColor: `${option.color}Dark`,
          }}
          onPress={() => onPressRadioButton(option.value)}
        >
          <HStack alignItems="center">
            <Box boxSize="2" mr="2" bg={`${option.color}Dark`} rounded="full" />
            <Text fontSize="md" fontWeight="bold" color="gray.100">
              {option.label}
            </Text>
          </HStack>
        </Button>
      ))}
    </HStack>
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
  const { control, handleSubmit, getValues } = useForm()
  const { colors } = useTheme()
  const navigation = useNavigation<StackNavigationProp>()
  const { params } = useRoute()
  const { mode } = params as AppRoutesList['NewMeal']

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const handleFormSubmit = (data: any) => {
    console.warn(data)
  }

  const showDateTimePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
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
          <Input name="name" control={control} label="Nome" />
          <Input
            name="description"
            control={control}
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
                {getValues().date &&
                  getValues().date.toLocaleDateString('pt-br', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
              </Button>
            </VStack>
            <Controller
              control={control}
              name="date"
              render={({ field: { onChange } }) => (
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="datetime"
                  onConfirm={(event) => {
                    onChange(event)
                    hideDatePicker()
                  }}
                  onCancel={hideDatePicker}
                />
              )}
            />
          </HStack>
          <VStack>
            <Text mb="2" fontWeight="bold" fontSize="md">
              Está dentro da dieta ?
            </Text>
            <Controller
              control={control}
              name="isOnDiet"
              render={({ field: { onChange } }) => (
                <RadioButtons
                  onChangeValue={onChange}
                  options={[
                    { label: 'Sim', value: 'yes', color: 'green' },
                    { label: 'Não', value: 'no', color: 'red' },
                  ]}
                />
              )}
            />
          </VStack>

          <Button mt="8" onPress={handleSubmit(handleFormSubmit)}>
            {modes[mode].submitText}
          </Button>
        </VStack>
      </ScrollView>
    </VStack>
  )
}

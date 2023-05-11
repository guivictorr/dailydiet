import { useNavigation, useRoute } from '@react-navigation/native'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '../components/input'
import { StackNavigationProp, AppRoutesList } from '../routes/app.routes'
import { Controller, useForm } from 'react-hook-form'
import { DatetimePicker } from '../components/datetime-picker'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type RadioButtonProps = {
  options: {
    label: string
    value: string
    color: 'red' | 'green'
  }[]
  value: string
  onChangeValue?: (radioValue: string) => void
}

function RadioButtons({ options, onChangeValue, value }: RadioButtonProps) {
  const [selectedId, setSelectedId] = useState(value)

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

const newMealSchema = z.object({
  name: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .min(1),
  description: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .min(1),
  date: z.date({
    required_error: 'Campo obrigatório',
  }),
  isOnDiet: z.enum(['yes', 'no'], {
    required_error: 'Campo obrigatório',
  }),
})

type NewMealSchemaForm = z.infer<typeof newMealSchema>

export function NewMeal() {
  const insets = useSafeAreaInsets()
  const { control, handleSubmit, getValues } = useForm<NewMealSchemaForm>({
    resolver: zodResolver(newMealSchema),
    defaultValues: {
      isOnDiet: 'yes',
    },
  })

  const { colors } = useTheme()
  const navigation = useNavigation<StackNavigationProp>()
  const { params } = useRoute()
  const { mode } = params as AppRoutesList['NewMeal']

  const handleFormSubmit = (data: any) => {
    navigation.navigate('Feedback', { isOnDiet: getValues().isOnDiet })
    console.warn(data)
  }

  return (
    <VStack flex={1} bg="gray.500">
      <Box pt={insets.top}>
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
      </Box>

      <ScrollView
        _contentContainerStyle={{
          py: 10,
        }}
        px="8"
        bg="gray.700"
        roundedTop="20"
        mt={-2}
      >
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
          <DatetimePicker control={control} />
          <VStack>
            <Text mb="2" fontWeight="bold" fontSize="md">
              Está dentro da dieta ?
            </Text>
            <Controller
              control={control}
              name="isOnDiet"
              render={({ field: { onChange, value } }) => (
                <RadioButtons
                  onChangeValue={onChange}
                  value={value}
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

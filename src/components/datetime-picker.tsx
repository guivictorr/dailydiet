import { Button, FormControl, HStack } from 'native-base'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { Control, FieldValues, useController } from 'react-hook-form'
import { useState } from 'react'

type DatetimePickerProps = {
  control: Control<FieldValues, any>
}

export const DatetimePicker = ({ control }: DatetimePickerProps) => {
  const { field, fieldState } = useController({
    control,
    name: 'date',
  })

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const showDateTimePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  return (
    <HStack space="5" justifyContent="space-between">
      <FormControl isInvalid={fieldState.invalid} w="full">
        <FormControl.Label
          _text={{
            color: 'gray.200',
            fontWeight: 'bold',
            fontSize: 'md',
          }}
        >
          Data e hora
        </FormControl.Label>
        <Button
          bg="transparent"
          h="16"
          borderWidth={1}
          borderColor={fieldState.invalid ? 'red.500' : 'gray.500'}
          onPress={showDateTimePicker}
          _text={{
            color: 'black',
          }}
          _pressed={{
            bg: 'transparent',
          }}
        >
          {field.value &&
            field.value.toLocaleDateString('pt-br', {
              hour: '2-digit',
              minute: '2-digit',
            })}
        </Button>
        <FormControl.ErrorMessage>
          {fieldState.error?.message}
        </FormControl.ErrorMessage>
      </FormControl>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={(event) => {
          field.onChange(event)
          hideDatePicker()
        }}
        onCancel={hideDatePicker}
      />
    </HStack>
  )
}

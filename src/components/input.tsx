import {
  FormControl,
  IFormControlProps,
  IInputProps,
  Input as NativeBaseInput,
} from 'native-base'
import { Control, FieldValues, useController } from 'react-hook-form'

type InputProps = {
  label: string
  errorMessage?: string
  control?: Control<FieldValues, any>
  name: string
  input?: IInputProps
  formControl?: IFormControlProps
}

export function Input({
  label = 'Label',
  errorMessage,
  input,
  control,
  name,
  formControl,
}: InputProps) {
  const { field } = useController({
    control,
    name,
  })
  return (
    <FormControl isInvalid={!!errorMessage} {...formControl}>
      <FormControl.Label
        _text={{ color: 'gray.200', fontWeight: 'bold', fontSize: 'md' }}
      >
        {label}
      </FormControl.Label>
      <NativeBaseInput
        rounded="6"
        p="4"
        color="gray.100"
        fontSize="md"
        borderColor="gray.500"
        _focus={{
          bg: 'transparent',
          borderColor: 'gray.400',
        }}
        onChangeText={field.onChange}
        value={field.value}
        {...input}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  )
}

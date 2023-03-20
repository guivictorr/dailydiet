import { FormControl, IInputProps, Input as NativeBaseInput } from 'native-base'

type InputProps = {
  label: string
  errorMessage?: string
  input?: IInputProps
}

export function Input({ label = 'Label', errorMessage, input }: InputProps) {
  return (
    <FormControl isInvalid={!!errorMessage}>
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
          bg: 'white',
          borderColor: 'gray.400',
        }}
        {...input}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  )
}

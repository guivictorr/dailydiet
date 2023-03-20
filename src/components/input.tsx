import { FormControl, IInputProps, Input as NativeBaseInput } from 'native-base'

type InputProps = {
  input?: IInputProps
}

export function Input({ input }: InputProps) {
  return (
    <FormControl>
      <FormControl.Label
        _text={{ color: 'gray.200', fontWeight: 'bold', fontSize: 'md' }}
      >
        Label
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
      <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
    </FormControl>
  )
}

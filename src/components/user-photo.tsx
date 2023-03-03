import { IImageProps, Image } from 'native-base'

export function UserPhoto(props: IImageProps) {
  return (
    <Image
      borderWidth={2}
      borderColor="gray.200"
      rounded="full"
      boxSize="12"
      source={{ uri: 'https://github.com/guivictorr.png' }}
      alt="User Photo"
      {...props}
    />
  )
}

import { Center, IImageProps, Image, Spinner } from 'native-base'
import { useProfilePicture } from '../hooks/useProfilePicture'

type UserPhotoProps = {
  uri?: string
  isLoading?: boolean
} & IImageProps

export function UserPhoto(props: UserPhotoProps) {
  const profilePicture = useProfilePicture()

  if (props.isLoading) {
    return (
      <Center
        borderWidth={2}
        borderColor="gray.200"
        rounded="full"
        boxSize={props.boxSize || '12'}
        bg="gray.500"
      >
        <Spinner color="gray.100" />
      </Center>
    )
  }

  return (
    <Image
      borderWidth={2}
      borderColor="gray.200"
      rounded="full"
      boxSize="12"
      source={{ uri: props.uri || profilePicture }}
      alt="User Photo"
      {...props}
    />
  )
}

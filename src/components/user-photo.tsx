import { IImageProps, Image } from 'native-base'
import { useProfilePicture } from '../hooks/useProfilePicture'

export function UserPhoto(props: IImageProps) {
  const profilePicture = useProfilePicture()

  return (
    <Image
      borderWidth={2}
      borderColor="gray.200"
      rounded="full"
      boxSize="12"
      source={{ uri: profilePicture }}
      alt="User Photo"
      {...props}
    />
  )
}

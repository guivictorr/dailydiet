import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import {
  Box,
  Button,
  Center,
  Heading,
  Icon,
  IconButton,
  useTheme,
  VStack,
} from 'native-base'
import { ArrowLeft } from 'phosphor-react-native'
import { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { UserPhoto } from '../components/user-photo'
import { setPicture } from '../storage/profile'

export function Profile() {
  const [imagePickerResult, setImagePickerResult] = useState('')
  const [loadingPicker, setLoadingPicker] = useState(false)
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const { colors } = useTheme()

  async function pickImage() {
    setLoadingPicker(true)
    const imageResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!imageResult.canceled) {
      setImagePickerResult(imageResult.assets[0].uri)
      setPicture(imageResult.assets[0].uri)
    }

    setLoadingPicker(false)
  }

  return (
    <VStack flex={1}>
      <Box pt={insets.top} bg="gray.500">
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
          <Heading fontSize="lg">Perfil</Heading>
        </Center>
      </Box>
      <Center mt="32">
        <UserPhoto
          isLoading={loadingPicker}
          uri={imagePickerResult}
          boxSize="32"
        />
        <Button onPress={pickImage} mt="8">
          Mudar foto de perfil
        </Button>
      </Center>
    </VStack>
  )
}

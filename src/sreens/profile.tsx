import { useNavigation } from '@react-navigation/native'
import {
  Box,
  Button,
  Center,
  Heading,
  Icon,
  IconButton,
  Image,
  useTheme,
  VStack,
} from 'native-base'
import { ArrowLeft } from 'phosphor-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function Profile() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const { colors } = useTheme()

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
        <Image
          borderWidth={2}
          borderColor="gray.200"
          rounded="full"
          boxSize="32"
          alt="foto"
          source={{ uri: 'https://github.com/guivictorr.png' }}
        />
        <Button mt="8">Mudar foto de perfil</Button>
      </Center>
    </VStack>
  )
}

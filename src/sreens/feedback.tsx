import { useNavigation, useRoute } from '@react-navigation/native'
import { Button, Center, Heading, Image, Text } from 'native-base'

import positiveImage from '../../assets/positive.png'
import negativeImage from '../../assets/negative.png'
import { StackNavigationProp } from '../routes/app.routes'

export function Feedback() {
  const route = useRoute()
  const navigation = useNavigation<StackNavigationProp>()
  const { isOnDiet } = route.params as { isOnDiet: boolean }

  const values = {
    title: isOnDiet ? 'Continue assim!' : 'Que pena!',
    description: isOnDiet
      ? 'Você continua dentro da dieta. Muito bem!'
      : 'Você saiu da dieta dessa vez, mas continue se esforçando e não desista!',
    color: isOnDiet ? 'green' : 'red',
  }

  return (
    <Center flex={1}>
      <Heading color={`${values.color}Dark`}>{values.title}</Heading>
      <Text fontSize="md" textAlign="center" maxW="64" color="gray.100" mt="2">
        {values.description}
      </Text>
      <Image source={isOnDiet ? positiveImage : negativeImage} mt="10" alt="" />
      <Button mt="8" onPress={() => navigation.navigate('Home')}>
        Ir para a página inicial
      </Button>
    </Center>
  )
}

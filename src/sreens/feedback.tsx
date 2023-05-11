import { useNavigation, useRoute } from '@react-navigation/native'
import { Button, Center, Heading, Image, Text } from 'native-base'

import positiveImage from '../../assets/positive.png'
import negativeImage from '../../assets/negative.png'
import { StackNavigationProp } from '../routes/app.routes'

export function Feedback() {
  const route = useRoute()
  const navigation = useNavigation<StackNavigationProp>()
  const { isOnDiet } = route.params as { isOnDiet: 'yes' | 'no' }

  const values = {
    yes: {
      title: 'Continue assim!',
      description: 'Você continua dentro da dieta. Muito bem!',
      color: 'green',
      image: positiveImage,
    },
    no: {
      title: 'Que pena!',
      description:
        'Você saiu da dieta dessa vez, mas continue se esforçando e não desista!',
      color: 'red',
      image: negativeImage,
    },
  }

  return (
    <Center flex={1}>
      <Heading color={`${values[isOnDiet].color}Dark`}>
        {values[isOnDiet].title}
      </Heading>
      <Text fontSize="md" textAlign="center" maxW="64" color="gray.100" mt="2">
        {values[isOnDiet].description}
      </Text>
      <Image source={values[isOnDiet].image} mt="10" alt="" />
      <Button mt="8" onPress={() => navigation.navigate('Home')}>
        Ir para a página inicial
      </Button>
    </Center>
  )
}

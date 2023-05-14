/* eslint-disable no-unused-vars */
import { useNavigation } from '@react-navigation/native'
import { Box, Text, Divider, HStack, Pressable, Heading } from 'native-base'
import { StackNavigationProp } from '../routes/app.routes'

export type MealProps = {
  createdAt: string
  name: string
  status: 'yes' | 'no'
  mealId: string
}

export function Meal({ name, createdAt, status, mealId }: MealProps) {
  const navigation = useNavigation<StackNavigationProp>()
  const color = status === 'yes' ? 'green' : 'red'
  return (
    <Pressable
      onPress={() => navigation.navigate('MealDetails', { mealId })}
      borderWidth={1}
      rounded={6}
      borderColor="gray.500"
      py="4"
      pl="3"
      pr="4"
      my="2"
      _pressed={{
        opacity: 0.7,
      }}
    >
      <HStack alignItems="center" justifyContent="space-between">
        <HStack justifyContent="space-between" alignItems="center">
          <Heading fontSize="xs">
            {new Date(createdAt).getHours()}:{new Date(createdAt).getMinutes()}
          </Heading>
          <Divider h={14} color="gray.400" orientation="vertical" mx="3" />
          <Text fontSize="lg">{name}</Text>
        </HStack>

        <Box boxSize={14} bg={`${color}Mid`} rounded="full" />
      </HStack>
    </Pressable>
  )
}

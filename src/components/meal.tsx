/* eslint-disable no-unused-vars */
import { Box, Text, Divider, HStack, Pressable, Heading } from 'native-base'

enum MealStatus {
  ON_DIET = 'greenMid',
  OFF_DIET = 'redMid',
}

export type MealProps = {
  createdAt: Date
  name: string
  status: keyof typeof MealStatus
}

export function Meal({ name, createdAt, status }: MealProps) {
  return (
    <Pressable
      borderWidth={1}
      rounded={6}
      borderColor="gray.500"
      py="4"
      pl="3"
      pr="4"
      _pressed={{
        opacity: 0.7,
      }}
    >
      <HStack alignItems="center" justifyContent="space-between">
        <HStack justifyContent="space-between" alignItems="center">
          <Heading fontSize="xs">
            {createdAt.getHours()}:{createdAt.getMinutes()}
          </Heading>
          <Divider h={14} color="gray.400" orientation="vertical" mx="3" />
          <Text fontSize="lg">{name}</Text>
        </HStack>

        <Box boxSize={14} bg={MealStatus[status]} rounded="full" />
      </HStack>
    </Pressable>
  )
}

import { Heading, Icon, Pressable, Text, useTheme } from 'native-base'
import { ArrowUpRight } from 'phosphor-react-native'

export function StatisticResume() {
  const { colors } = useTheme()
  return (
    <Pressable
      justifyContent="center"
      alignItems="center"
      bg="greenLight"
      rounded="md"
      w="full"
      px="4"
      py="5"
      _pressed={{
        opacity: 0.7,
      }}
    >
      <Heading fontSize="3xl">90,86%</Heading>
      <Text fontSize="md">das refeições dentro da dieta</Text>
      <Icon
        as={<ArrowUpRight color={colors.greenDark} />}
        position="absolute"
        right={2}
        top={2}
      />
    </Pressable>
  )
}

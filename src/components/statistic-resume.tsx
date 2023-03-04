/* eslint-disable no-unused-vars */
import { Heading, Icon, Pressable, Text, useTheme } from 'native-base'
import { ArrowUpRight } from 'phosphor-react-native'

enum StatisticResumeStatus {
  ON_DIET = 'green',
  OFF_DIET = 'red',
}

type StatisticResumeProps = {
  status: keyof typeof StatisticResumeStatus
}

export function StatisticResume({ status }: StatisticResumeProps) {
  const { colors } = useTheme()
  return (
    <Pressable
      justifyContent="center"
      alignItems="center"
      bg={`${StatisticResumeStatus[status]}Light`}
      rounded={8}
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
        as={
          <ArrowUpRight
            color={colors[`${StatisticResumeStatus[status]}Dark`]}
          />
        }
        position="absolute"
        right={2}
        top={2}
      />
    </Pressable>
  )
}

import { useNavigation } from '@react-navigation/native'
import { Heading, Icon, Pressable, Text, useTheme } from 'native-base'
import { ArrowUpRight } from 'phosphor-react-native'
import { useStatistics } from '../hooks/useStatistics'
import { StackNavigationProp } from '../routes/app.routes'

export function StatisticResume() {
  const { percentageOnDiet } = useStatistics()
  const navigation = useNavigation<StackNavigationProp>()
  const { colors } = useTheme()

  return (
    <Pressable
      onPress={() => navigation.navigate('GeneralStatistics')}
      justifyContent="center"
      alignItems="center"
      bg={percentageOnDiet < 50 ? 'redLight' : 'greenLight'}
      rounded={8}
      w="full"
      px="4"
      py="5"
      _pressed={{
        opacity: 0.7,
      }}
    >
      <Heading fontSize="3xl">{percentageOnDiet.toFixed(2)}%</Heading>
      <Text fontSize="md">das refeições dentro da dieta</Text>
      <Icon
        as={
          <ArrowUpRight
            color={colors[percentageOnDiet < 50 ? 'redDark' : 'greenDark']}
          />
        }
        position="absolute"
        right={2}
        top={2}
      />
    </Pressable>
  )
}

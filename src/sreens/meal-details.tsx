import { useNavigation, useRoute } from '@react-navigation/native'
import {
  Badge,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Modal,
  Icon,
  IconButton,
  ScrollView,
  Text,
  useTheme,
  VStack,
  Skeleton,
} from 'native-base'
import { ArrowLeft } from 'phosphor-react-native'
import { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StackNavigationProp } from '../routes/app.routes'
import { deleteMeal, getMealById, MealStorageDTO } from '../storage/meal'

export function MealDetails() {
  const [meal, setMeal] = useState<MealStorageDTO | null>(null)

  const insets = useSafeAreaInsets()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { params } = useRoute()
  const { colors } = useTheme()
  const navigation = useNavigation<StackNavigationProp>()

  const { mealId } = params as { mealId: string }

  const color = meal?.isOnDiet === 'yes' ? 'green' : 'red'
  const badgeText =
    meal?.isOnDiet === 'yes' ? 'Dentro da dieta' : 'Fora da dieta'

  function handleDeleteMeal() {
    deleteMeal(mealId).finally(() => {
      navigation.navigate('Home')
    })
  }

  useEffect(() => {
    getMealById(mealId).then((meal) => {
      setTimeout(() => setMeal(meal), 1000)
    })
  }, [mealId])

  return (
    <VStack flex={1} bg={meal ? `${color}Light` : 'gray.500'}>
      <Box pt={insets.top}>
        <Center
          px="8"
          h={20}
          bg={meal ? `${color}Light` : 'gray.500'}
          position="relative"
        >
          <IconButton
            onPress={navigation.goBack}
            position="absolute"
            top="4"
            left="24px"
            icon={
              <Icon
                as={() => (
                  <ArrowLeft
                    color={meal ? colors[`${color}Dark`] : colors.gray['100']}
                  />
                )}
              />
            }
            _pressed={{
              backgroundColor: 'gray.400:alpha.40',
              rounded: 'full',
            }}
          />
          <Heading fontSize="lg">Refeição</Heading>
        </Center>
      </Box>

      <ScrollView
        _contentContainerStyle={{
          flex: 1,
          pt: 10,
          pb: 10,
          px: 9,
        }}
        bg="gray.700"
        roundedTop="20"
        mt={-2}
        h="full"
      >
        <VStack h="full" justifyContent="space-between" space="6">
          <VStack space="6">
            <VStack>
              <Skeleton.Text isLoaded={!!meal} mb="8" lines={1}>
                <Heading mb="2" fontSize="xl">
                  {meal?.name}
                </Heading>
              </Skeleton.Text>
              <Skeleton.Text isLoaded={!!meal} w="2/3" lines={1}>
                <Text>{meal?.description}</Text>
              </Skeleton.Text>
            </VStack>
            <VStack>
              <Heading fontSize="md">Data e hora</Heading>
              <Skeleton.Text lines={1} mt="4" isLoaded={!!meal} w="2/5">
                <Text mt="2">
                  {new Date(meal?.date!).toLocaleDateString('pt-br', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </Skeleton.Text>
            </VStack>
            <Skeleton isLoaded={!!meal} rounded="full">
              <Badge rounded="full" py="2" px="4" bg="gray.600">
                <HStack alignItems="center">
                  <Box rounded="full" w="2" h="2" mr="2" bg={`${color}Dark`} />
                  <Text color="gray.100">{badgeText}</Text>
                </HStack>
              </Badge>
            </Skeleton>
          </VStack>
          <VStack space="2">
            <Button
              onPress={() => navigation.navigate('NewMeal', { mode: 'EDIT' })}
            >
              Editar refeição
            </Button>
            <Button variant="outline" onPress={() => setIsModalOpen(true)}>
              Excluir refeição
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
      <Modal isOpen={isModalOpen} size="xl">
        <Modal.Content maxH="96" p="4">
          <Modal.Body>
            <Text fontWeight="bold" fontSize="xl" textAlign="center">
              Deseja realmente excluir o registro da refeição?
            </Text>
            <HStack mt="8" space="3">
              <Button
                onPress={() => setIsModalOpen(false)}
                _text={{ fontSize: 'sm' }}
                flex={1}
                variant="outline"
              >
                Cancelar
              </Button>
              <Button
                onPress={handleDeleteMeal}
                _text={{ fontSize: 'sm' }}
                flex={1}
              >
                Sim, Excluir
              </Button>
            </HStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </VStack>
  )
}

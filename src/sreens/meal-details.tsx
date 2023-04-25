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
} from 'native-base'
import { ArrowLeft } from 'phosphor-react-native'
import { useState } from 'react'
import { StackNavigationProp } from '../routes/app.routes'

export function MealDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { params } = useRoute()
  const { colors } = useTheme()
  const navigation = useNavigation<StackNavigationProp>()

  const { isOnDiet } = params as { isOnDiet: boolean }
  const color = isOnDiet ? 'green' : 'red'
  const badgeText = isOnDiet ? 'Dentro da dieta' : 'Fora da dieta'

  return (
    <VStack>
      <Center px="8" h={20} bg={`${color}Light`} position="relative">
        <IconButton
          onPress={navigation.goBack}
          position="absolute"
          top="4"
          left="24px"
          icon={
            <Icon as={() => <ArrowLeft color={colors[`${color}Dark`]} />} />
          }
          _pressed={{
            backgroundColor: 'gray.400:alpha.40',
            rounded: 'full',
          }}
        />
        <Heading fontSize="lg">Refeição</Heading>
      </Center>
      <ScrollView
        _contentContainerStyle={{
          flex: 1,
          pt: 10,
          px: 9,
          paddingBottom: 20,
        }}
        bg="gray.700"
        roundedTop="20"
        mt={-2}
        h="full"
      >
        <VStack h="full" justifyContent="space-between" space="6">
          <VStack space="6">
            <VStack>
              <Heading mb="2" fontSize="xl">
                Sanduíche
              </Heading>
              <Text>
                Sanduíche de pão integral com atum e salada de alface e tomate
              </Text>
            </VStack>
            <VStack>
              <Heading mb="2" fontSize="md">
                Data e hora
              </Heading>
              <Text>12/08/2022 às 16:00</Text>
            </VStack>

            <Badge rounded="full" py="2" px="4" bg="gray.600">
              <HStack alignItems="center">
                <Box rounded="full" w="2" h="2" mr="2" bg={`${color}Dark`} />
                <Text color="gray.100">{badgeText}</Text>
              </HStack>
            </Badge>
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
              <Button _text={{ fontSize: 'sm' }} flex={1}>
                Sim, Excluir
              </Button>
            </HStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </VStack>
  )
}

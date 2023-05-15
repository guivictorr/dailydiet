import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORAGE_PREFIX } from './meal'

export async function getPicture() {
  try {
    const profilePicture = await AsyncStorage.getItem(
      `${STORAGE_PREFIX}:profilePicture`,
    )

    if (!profilePicture) {
      return null
    }

    return profilePicture
  } catch (error) {
    throw new Error('getPicture: error trying to get profile picture')
  }
}

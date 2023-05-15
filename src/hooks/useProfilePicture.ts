import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { getPicture } from '../storage/profile'

export function useProfilePicture() {
  const [profilePicture, setProfilePicture] = useState(
    `https://i.imgur.com/ib8FKUj.png`,
  )

  useFocusEffect(
    useCallback(() => {
      getPicture().then((uri) => {
        if (uri) {
          setProfilePicture(uri)
        }
      })
    }, []),
  )

  return profilePicture
}

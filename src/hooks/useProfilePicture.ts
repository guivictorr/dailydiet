import { useEffect, useState } from 'react'
import { getPicture } from '../storage/profile'

export function useProfilePicture() {
  const [profilePicture, setProfilePicture] = useState<string | null>(null)

  useEffect(() => {
    getPicture().then(setProfilePicture)
  }, [])

  return profilePicture
}

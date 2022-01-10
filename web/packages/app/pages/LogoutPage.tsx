import React, { useEffect } from 'react'
import { useAuth } from '@web-technologies/shared/hooks/user'

const LogoutPage: React.FC = () => {
  const auth = useAuth()

  useEffect(() => {
    auth.logout()
  }, [])

  return <></>
}

export default LogoutPage

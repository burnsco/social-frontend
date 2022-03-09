import { useMemo } from 'react'
import { useMyFriendsQuery } from '../generated/graphql'

export const useMyFriends = () => {
  const { data } = useMyFriendsQuery()

  const MyFriends = useMemo(() => data?.myFriends, [data])

  return [MyFriends]
}

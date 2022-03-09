import { useCategoryChatSubSubscription } from '@/generated/graphql'

function useNewUserNotification(categoryId: string) {
  const { data } = useCategoryChatSubSubscription({ variables: { categoryId } })

  if (data?.newMessage) {
    return data?.newMessage
  }
  return null
}

export default useNewUserNotification

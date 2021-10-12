import { useNewUserSubscription } from "@/generated/graphql"

function useNewUserNotification() {
  const { data } = useNewUserSubscription()

  if (data && data.newUser) {
    const user = data.newUser.username
    return user
  }
  return null
}

export default useNewUserNotification

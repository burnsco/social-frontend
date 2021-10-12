import { useMemo } from "react"
import { useMeQuery } from "../generated/graphql"

export const useLoggedInUser = () => {
  const { data } = useMeQuery()

  const loggedInUser = useMemo(() => data?.me, [data])

  return [loggedInUser]
}

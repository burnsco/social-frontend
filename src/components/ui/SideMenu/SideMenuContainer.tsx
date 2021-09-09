import { useMeQuery } from "@/generated/graphql"
import { Box, Skeleton, useColorModeValue } from "@chakra-ui/react"
import React from "react"
import AuthorizedSideMenu from "./Auth"
import NoAuthSideMenu from "./NoAuth"

export default function SideMenuContainer() {
  const bg = useColorModeValue("white", "#202020")
  const { data, loading } = useMeQuery({
    ssr: false,
    fetchPolicy: "network-only"
  })
  return (
    <Skeleton isLoaded={!loading}>
      <Box bg={bg} minW="200px" maxW="300px" boxShadow="xs">
        {data && data.me ? <AuthorizedSideMenu /> : <NoAuthSideMenu />}
      </Box>
    </Skeleton>
  )
}

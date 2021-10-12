import { chakra } from "@chakra-ui/react"

export const OnlineCircle = () => (
  <chakra.span
    h="8px"
    w="8px"
    ml={2}
    bgColor="green.400"
    borderRadius="50%"
    display="inline-block"
  />
)

export const OfflineCircle = () => (
  <chakra.span
    h="8px"
    w="8px"
    ml={2}
    bgColor="red.400"
    borderRadius="50%"
    display="inline-block"
  />
)

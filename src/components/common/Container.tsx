import { Box, BoxProps } from "@chakra-ui/react"

const Container = (props: BoxProps) => (
  <Box w="full" pb="12" pt="3" mx="auto" maxW="1200px" px={6} {...props} />
)

export default Container

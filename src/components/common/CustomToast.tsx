import { Box, useColorModeValue, useToast } from "@chakra-ui/react"

export default function CustomToast(input: string) {
  const bg = useColorModeValue("white", "#202020")
  const bc = useColorModeValue("gray.100", "#313131")
  const toast = useToast()

  return toast({
    position: "bottom-left",
    render: () => (
      <Box boxShadow="sm" borderColor={bc} color="white" p={3} bg={bg}>
        {input}
      </Box>
    )
  })
}

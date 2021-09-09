import { HStack, Input, useColorModeValue } from "@chakra-ui/react"

export default function MessageInput() {
  const submitButtonColor = useColorModeValue("purple", "blue")

  const handleSubmitMessage = () => {
    console.log("message sent")
  }

  return (
    <HStack w="full">
      <Input placeholder="small size" size="sm" />
    </HStack>
  )
}

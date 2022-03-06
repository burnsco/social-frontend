import { Flex, useColorModeValue } from '@chakra-ui/react'
import ChatDisplay from './ChatDisplay'
import ChatInput from './ChatInput'
import ChatSelection from './ChatSelect'

export default function ChatDrawerFullPage() {
  const drawerbg = useColorModeValue('red', 'purple')
  return (
    <Flex bg={drawerbg}>
      <ChatSelection />
      <ChatDisplay />
      <ChatInput />
    </Flex>
  )
}

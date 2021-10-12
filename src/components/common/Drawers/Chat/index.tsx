import {
  chakra,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Tooltip,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react"
import { useRef } from "react"
import { IoChatboxEllipsesOutline } from "react-icons/io5"
import ChatDisplay from "./ChatDisplay"
import ChatInput from "./ChatInput"
import ChatSelection from "./ChatSelect"

export default function ChatDrawerPage() {
  const drawerbg = useColorModeValue("whitesmoke", "gray.900")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement | null>(null)

  return (
    <>
      <Tooltip
        hasArrow
        label="Chat"
        fontSize="md"
        bg="black"
        color="whitesmoke"
      >
        <chakra.span>
          <IconButton
            onClick={onOpen}
            variant="ghost"
            aria-label="Create a Subreddit"
            icon={<IoChatboxEllipsesOutline size="1.5em" />}
            size="md"
          />
        </chakra.span>
      </Tooltip>
      <Drawer
        size="xxl"
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={drawerbg}>
          <DrawerCloseButton />
          <DrawerHeader>
            <ChatSelection />
          </DrawerHeader>

          <DrawerBody>
            <ChatDisplay />
          </DrawerBody>

          <DrawerFooter>
            <ChatInput />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

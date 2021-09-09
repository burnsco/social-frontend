import {
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useColorModeValue
} from "@chakra-ui/react"
import React from "react"
import { FaUserFriends } from "react-icons/fa"
import ChatDisplay from "./ChatDisplay"
import ChatInput from "./ChatInput"
import ChatSelection from "./ChatSelect"

export default function ChatDrawerPopOver() {
  const bg = useColorModeValue("whitesmoke", "gray.900")

  return (
    <>
      <Popover placement="bottom" closeOnBlur={true}>
        <PopoverTrigger>
          <FaUserFriends />
        </PopoverTrigger>

        <PopoverContent bg={bg} h="37.5rem" w="40rem">
          <PopoverHeader>
            <ChatSelection />
          </PopoverHeader>

          <PopoverCloseButton />

          <PopoverBody flex={2}>
            <ChatDisplay />
          </PopoverBody>

          <PopoverFooter>
            <ChatInput />
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  )
}

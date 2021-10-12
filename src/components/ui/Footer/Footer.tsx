import MessageUser from "@/components/common/MessageUser"
import { OfflineCircle, OnlineCircle } from "@/components/common/OnlineOffline"
import { useMyFriendsLazyQuery, User } from "@/generated/graphql"
import {
  Avatar,
  Badge,
  Box,
  Button,
  chakra,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  useColorModeValue
} from "@chakra-ui/react"
import { Form, Formik } from "formik"
import React, { useEffect } from "react"
import { FaUserFriends } from "react-icons/fa"
import { ImSpinner } from "react-icons/im"
import { useSendPrivateMessageMutation } from "../../../generated/graphql"

// create apollo variables for each chat room (chat user session) ?
// create a subscription to a chat with each friend (much like chat)
// or just show them if they have a messag length of > 0

export default function Footer() {
  const bg = useColorModeValue("white", "#202020")

  const [fetchFriends, { data, loading, refetch }] = useMyFriendsLazyQuery({
    ssr: false
  })

  useEffect(() => fetchFriends(), [fetchFriends])

  const FriendsCount = () => {
    if (data && data.myFriends && data.myFriends.length > 0) {
      const onlineFriends = data.myFriends.map(
        (friend: Partial<User>) => friend.online
      ).length

      return (
        <Badge mr={2} colorScheme="green">
          {onlineFriends}
        </Badge>
      )
    }
    return null
  }

  const FriendsMenu = () => (
    <>
      {data && data.myFriends && refetch ? (
        <Menu>
          <MenuButton
            onClick={() => refetch()}
            as={Button}
            rightIcon={!loading ? <FaUserFriends /> : <ImSpinner />}
          >
            <FriendsCount />
            FRIENDS
          </MenuButton>
          <MenuList>
            {data &&
              data.myFriends &&
              data.myFriends.map((user: Partial<User>) => (
                <MenuItem key={`friend-${user.id}`}>
                  <Avatar
                    size="xs"
                    name="Ryan Florence"
                    src="https://bit.ly/ryan-florence"
                    mr={3}
                  />
                  {user.username} {user && <MessageUser {...user} />}
                  {user.online ? <OnlineCircle /> : <OfflineCircle />}
                </MenuItem>
              ))}
          </MenuList>
        </Menu>
      ) : (
        <Heading>No Friends</Heading>
      )}
    </>
  )

  const ChatMenu = () => (
    <>
      {data && data.myFriends && refetch ? (
        <Menu>
          <MenuButton
            onClick={() => refetch()}
            as={Button}
            rightIcon={!loading ? <FaUserFriends /> : <ImSpinner />}
          >
            <FriendsCount />
            FRIENDS
          </MenuButton>
          <MenuList>
            {data.myFriends.map((user: any) => (
              <MenuItem key={`friend-${user.id}`}>
                <Avatar
                  size="xs"
                  name="Ryan Florence"
                  src="https://bit.ly/ryan-florence"
                  mr={3}
                />
                {user.username} {user && <MessageUser {...user} />}
                {user.online ? <OnlineCircle /> : <OfflineCircle />}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      ) : (
        <Heading>No Friends</Heading>
      )}
    </>
  )

  function FooterContent() {
    const initialFocusRef = React.useRef<HTMLInputElement | null>(null)

    const [submitMessage] = useSendPrivateMessageMutation()

    const handleSubmitMessage = async (values: any, actions: any) => {
      const response = await submitMessage({
        variables: {
          data: {
            ...values
          }
        }
      })

      actions.resetForm()
      return response
    }

    return (
      <Flex w="100%" h="100%">
        {data &&
          data.myFriends &&
          data.myFriends.map((user: Partial<User>) => (
            <Popover
              key={`user friends chat list-${user.username}`}
              initialFocusRef={initialFocusRef}
              placement="top"
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <Box
                  onClick={() => {
                    if (refetch !== undefined) refetch()
                  }}
                  as={Button}
                  rightIcon={!loading ? <FaUserFriends /> : <ImSpinner />}
                >
                  {user.username}
                </Box>
              </PopoverTrigger>
              {/* make a graphql query using each friend (userId) */}
              {/* same concept as Chat, but with users instead of category */}
              <PopoverContent
                minH="300px"
                minW="280px"
                display="flex"
                flexDir="column"
              >
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Header</PopoverHeader>
                {data &&
                  data.myFriends &&
                  data.myFriends.map((user: Partial<User>) => (
                    <PopoverBody flexGrow={2} key={`friend-${user.id}`}>
                      <Avatar
                        size="xs"
                        name="Ryan Florence"
                        src="https://bit.ly/ryan-florence"
                        mr={3}
                      />
                      {user.username} {user && <MessageUser {...user} />}
                      {user.online ? <OnlineCircle /> : <OfflineCircle />}
                    </PopoverBody>
                  ))}

                <PopoverFooter p={0}>
                  <InputGroup w="full" size="md">
                    <Formik
                      initialValues={{ body: "", userId: user.id }}
                      onSubmit={handleSubmitMessage}
                    >
                      <Form>
                        <Input
                          id={`chat-input-to-${user.username}`}
                          placeholder="small size"
                          size="sm"
                          ref={initialFocusRef}
                        />
                        <InputRightElement width="4.5rem">
                          <Box as={Button} h="1.9rem">
                            Submit
                          </Box>
                        </InputRightElement>
                      </Form>
                    </Formik>
                  </InputGroup>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          ))}
        <Spacer />
        <FriendsMenu />
      </Flex>
    )
  }

  return (
    <chakra.header
      pos="fixed"
      bottom="0"
      zIndex="1"
      bg={bg}
      left="0"
      right="0"
      width="full"
    >
      <chakra.div height="2.5rem" mx="auto" maxW="1200px" px={1}>
        <FooterContent />
      </chakra.div>
    </chakra.header>
  )
}

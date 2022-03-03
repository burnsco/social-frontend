import MessageUser from '@/components/common/MessageUser'
import { OfflineCircle, OnlineCircle } from '@/components/common/OnlineOffline'
import {
  useMyFriendsQuery,
  useMyPrivateMessagesQuery,
  User,
  useSendPrivateMessageMutation,
} from '@/generated/graphql'
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
  useColorModeValue,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import { FaUserFriends } from 'react-icons/fa'
import { ImSpinner } from 'react-icons/im'

// create apollo variables for each chat room (chat user session) ?
// create a subscription to a chat with each friend (much like chat)
// or just show them if they have a messag length of > 0

export default function Footer() {
  const bg = useColorModeValue('white', '#202020')

  const { data, loading, error } = useMyFriendsQuery()
  const { data: myMessages } = useMyPrivateMessagesQuery()

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

  console.log('my friends query')
  console.log(data)
  console.log('my private messages query')
  console.log(myMessages)

  const FriendsMenu = () => (
    <>
      {data && data.myFriends ? (
        <Menu>
          <MenuButton
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

  function FooterContent() {
    const initialFocusRef = React.useRef<HTMLInputElement | null>(null)

    const [submitMessage] = useSendPrivateMessageMutation()

    const handleSubmitMessage = async (values: any, actions: any) => {
      const response = await submitMessage({
        variables: {
          data: {
            ...values,
          },
        },
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
                <PopoverHeader>{user.username}</PopoverHeader>
                {myMessages &&
                  myMessages.myPrivateMessages &&
                  myMessages.myPrivateMessages.map((message: any) => (
                    <PopoverBody flexGrow={2} key={`friend-${message.id}`}>
                      <Avatar
                        size="xs"
                        name="Ryan Florence"
                        src="https://bit.ly/ryan-florence"
                        mr={3}
                      />
                      {message.body}
                      {message.sentBy && <MessageUser {...message.sentBy} />}
                    </PopoverBody>
                  ))}

                <PopoverFooter p={0}>
                  <InputGroup w="full" size="md">
                    <Formik
                      initialValues={{ body: '', userId: user.id }}
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
    <chakra.footer
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
    </chakra.footer>
  )
}

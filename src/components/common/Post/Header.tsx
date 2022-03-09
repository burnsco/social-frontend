import DeletePostDialog from '@/components/common/DeletePostDialog'
import InputField from '@/components/common/Forms/InputField'
import {
  useAddFriendMutation,
  User,
  useSendPrivateMessageMutation,
} from '@/generated/graphql'
import { useLoggedInUser } from '@/hooks/useLoggedInUser'
import { useMyFriends } from '@/hooks/useMyFriends'
import { timeDifferenceForDate } from '@/utils/index'
import { sleep } from '@/utils/sleepy'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Spacer,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { IoAddCircle } from 'react-icons/io5'
import { MdMessage } from 'react-icons/md'
import { RiMailSendLine } from 'react-icons/ri'
import { OfflineCircle, OnlineCircle } from '../OnlineOffline'

type PostHeaderType = {
  category?: string | null
  author?: Partial<User>
  createdAt?: number
  updatedAt?: number
  postId?: string | null | undefined
}

export default function PostHeader({
  category,
  author,
  createdAt,
  postId,
  updatedAt,
}: PostHeaderType) {
  const [loggedInUser] = useLoggedInUser()
  const [myFriends] = useMyFriends()

  const fontColor = useColorModeValue('#1A1A1B', 'gray.200')
  const bg = useColorModeValue('white', '#202020')
  const router = useRouter()
  const toast = useToast()

  const [addFriend, { loading }] = useAddFriendMutation()

  const isMyFriend = myFriends?.filter((friend) => friend.id === author?.id)

  const isOwnerOfPost = loggedInUser?.username === author?.username

  const handleAddFriend = async (username: string | undefined) => {
    console.log('inside handle add friend')
    if (username) {
      let response
      try {
        response = await addFriend({
          variables: {
            data: {
              username,
            },
          },
          update(cache, { data }) {
            if (loggedInUser && !data?.addFriend.errors) {
              console.log('cache')
              console.log(cache)

              console.log('data')
              console.log(data)
            }
            return null
          },
        })
      } catch (ex) {
        return ex
      }
      if (response?.data?.addFriend?.friend) {
        console.log(response)
        const { friend } = response?.data?.addFriend
        console.log(friend)
        toast({
          id: `user-${friend.username}-added`,
          title: 'Success',
          description: `User '${friend.username}' is now your friend `,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      }
    }
    return null
  }

  const AuthorizedAndIsFriendMenu = () => {
    const toast = useToast()
    const [sendMessage, { loading }] = useSendPrivateMessageMutation()
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef<null | HTMLButtonElement>(null)

    return (
      <>
        <MenuList opacity="0.7" bg={bg}>
          <MenuGroup color="lightsteelblue">
            <MenuItem onClick={() => router.push(`/user/${author?.username}`)}>
              <FaUserCircle />
              <Box ml={3}>Profile</Box>
            </MenuItem>
            <MenuDivider />
          </MenuGroup>
          <MenuItem onClick={() => setIsOpen(true)}>
            <RiMailSendLine />
            <Box ml={3}> Message </Box>
          </MenuItem>
          <MenuItem onClick={() => router.push('/user/account')}>
            <MdMessage />
            <Box ml={3}> Chat</Box>
          </MenuItem>
        </MenuList>
        <AlertDialog
          returnFocusOnClose={false}
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader
                color="red.400"
                fontSize="lg"
                fontWeight="bold"
              >
                To: <Badge colorScheme="purple">{author?.username}</Badge>
              </AlertDialogHeader>

              <Formik
                initialValues={{ body: '' }}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(false)
                  sleep(1000)
                  const response = await sendMessage({
                    variables: {
                      data: {
                        userId: author?.id as string,
                        body: values.body,
                      },
                    },
                  })
                  if (!response.errors) {
                    toast({
                      position: 'bottom-left',
                      render: () => (
                        <Box color="white" p={3} bg="blue.500">
                          Message Sent!
                        </Box>
                      ),
                    })
                    onClose()
                  }
                }}
              >
                <Form>
                  <AlertDialogBody>
                    <InputField id="body" name="body" label="Message" />
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      isLoading={loading}
                      colorScheme="red"
                      ml={3}
                    >
                      Send
                    </Button>
                  </AlertDialogFooter>
                </Form>
              </Formik>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }

  const AuthorizedAndIsNotAFriendMenu = () => {
    return (
      <MenuList opacity="0.7" bg={bg}>
        <MenuGroup color="lightsteelblue">
          <MenuItem onClick={() => router.push(`/user/${author?.username}`)}>
            <FaUserCircle />
            <Box ml={3}>Profile</Box>
          </MenuItem>
          <MenuDivider />
        </MenuGroup>

        <MenuItem onClick={() => handleAddFriend(author?.username)}>
          <IoAddCircle />
          <Box ml={3}>Add to Friends</Box>
        </MenuItem>
      </MenuList>
    )
  }

  const AuthorizedUserMenu = () => (
    <>
      {isMyFriend ? (
        <AuthorizedAndIsFriendMenu />
      ) : (
        <AuthorizedAndIsNotAFriendMenu />
      )}
    </>
  )

  const UnAuthorizedUserMenu = () => (
    <MenuList opacity="0.7" bg={bg}>
      <MenuGroup color="lightsteelblue">
        <MenuItem>
          <FaUserCircle />
          <Box ml={3}>Login/Register to use this menu</Box>
        </MenuItem>
      </MenuGroup>
    </MenuList>
  )

  const renderPostCreatedOrEdited = () => (
    <Box ml="3" textDecoration="none">
      {createdAt === updatedAt ? `Posted by` : `Edited by`}
      <Menu isLazy>
        <Button
          ml={2}
          size="xs"
          variant="outline"
          disabled={isOwnerOfPost}
          as={MenuButton}
        >
          {isOwnerOfPost ? (
            `YOU`
          ) : (
            <>
              {author?.username}
              {author?.online ? <OnlineCircle /> : <OfflineCircle />}
            </>
          )}
        </Button>

        {loggedInUser?.username ? (
          <AuthorizedUserMenu />
        ) : (
          <UnAuthorizedUserMenu />
        )}
      </Menu>
      {createdAt === updatedAt ? (
        <Box display="inline" mx="3">
          {timeDifferenceForDate(createdAt)}
        </Box>
      ) : (
        <Box display="inline" mx="3">
          {timeDifferenceForDate(updatedAt)}
        </Box>
      )}
    </Box>
  )

  const renderPostCategoryLink = () => (
    <Box
      fontWeight="600"
      mr="2"
      color="orange.500"
      _hover={{
        textDecoration: 'underline',
      }}
    >
      <Box
        _hover={{
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
        onClick={() => router.push(`/r/${category}`)}
      >
        /r/{category}
      </Box>
    </Box>
  )

  return (
    <HStack fontSize="sm" my={1} color={fontColor} w="full">
      <HStack>
        {renderPostCategoryLink()}
        {renderPostCreatedOrEdited()}
      </HStack>
      <Spacer />

      <Flex mr={1}>
        <DeletePostDialog postId={postId} />
      </Flex>
    </HStack>
  )
}

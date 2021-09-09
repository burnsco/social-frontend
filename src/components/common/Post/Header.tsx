import DeletePostDialog from "@/components/common/DeletePostDialog"
import { useAddFriendMutation, User } from "@/generated/graphql"
import { useLoggedInUser } from "@/hooks/useLoggedInUser"
import { timeDifferenceForDate } from "@/utils/index"
import { gql } from "@apollo/client"
import {
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
  useToast
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import { FaUserCircle } from "react-icons/fa"
import { IoAddCircle } from "react-icons/io5"
import { MdEmail, MdMessage } from "react-icons/md"
import { OfflineCircle, OnlineCircle } from "../OnlineOffline"

type PostHeaderType = {
  category?: string | null
  author?: Partial<User>
  createdAt?: string | null
  updatedAt?: string | null
  postId?: string | null | undefined
}

export default function PostHeader({
  category,
  author,
  createdAt,
  postId,
  updatedAt
}: PostHeaderType) {
  const [loggedInUser] = useLoggedInUser()
  const fontColor = useColorModeValue("#1A1A1B", "gray.200")
  const bg = useColorModeValue("white", "#202020")
  const router = useRouter()
  const toast = useToast()
  const [addFriend, { loading }] = useAddFriendMutation()

  const handleAddFriend = async (username: string | undefined) => {
    if (username) {
      let response
      try {
        response = await addFriend({
          variables: {
            data: {
              username
            }
          },
          update(cache, { data }) {
            if (loggedInUser && !data?.addFriend.errors) {
              cache.modify({
                id: cache.identify(loggedInUser),
                fields: {
                  friends(existingFriends = []) {
                    const newFriendRef = cache.writeFragment({
                      data: data?.addFriend.me,
                      fragment: gql`
                        fragment NewFriend on User {
                          id
                          username
                          online
                        }
                      `
                    })
                    return [newFriendRef, ...existingFriends]
                  }
                }
              })
            }
            return null
          }
        })
      } catch (ex) {
        return ex
      }
      if (
        response &&
        response.data &&
        response.data.addFriend &&
        response.data.addFriend.me &&
        response.data.addFriend.friend
      ) {
        const { friend } = response.data.addFriend
        toast({
          id: `user-${friend.username}-added`,
          title: "Success",
          description: `User '${friend.username}' is now your friend `,
          status: "success",
          duration: 9000,
          isClosable: true
        })
      }
    }
    return null
  }

  const AuthorizedUserMenu = () => (
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
      <MenuItem onClick={() => router.push("/user/account")}>
        <MdEmail />
        <Box ml={3}>Message</Box>
      </MenuItem>
      <MenuItem onClick={() => router.push("/user/account")}>
        <MdMessage />
        <Box ml={3}>Chat</Box>
      </MenuItem>
    </MenuList>
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
      <Menu>
        <Button ml={2} size="xs" variant="outline" as={MenuButton}>
          {loggedInUser?.username === author?.username ? (
            `YOU`
          ) : (
            <>
              {author?.username}
              {author?.online ? <OnlineCircle /> : <OfflineCircle />}
            </>
          )}
        </Button>

        {loggedInUser && loggedInUser.username ? (
          <AuthorizedUserMenu />
        ) : (
          <UnAuthorizedUserMenu />
        )}
      </Menu>
      {createdAt === updatedAt ? (
        <Box display="inline" ml="2">
          {timeDifferenceForDate(createdAt)}
        </Box>
      ) : (
        <Box display="inline" ml="2">
          {timeDifferenceForDate(updatedAt)}
        </Box>
      )}
    </Box>
  )

  const renderPostCategoryLink = () => (
    <Box
      fontWeight="600"
      color="orange.500"
      _hover={{
        textDecoration: "underline"
      }}
    >
      <Box
        _hover={{
          textDecoration: "underline",
          cursor: "pointer"
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

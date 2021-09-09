import { useAddFriendMutation } from "@/generated/graphql"
import { useLoggedInUser } from "@/hooks/useLoggedInUser"
import { gql } from "@apollo/client"
import {
  Box,
  ListItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useColorModeValue
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import { FaUserCircle } from "react-icons/fa"
import { ImSpinner } from "react-icons/im"
import { IoAddCircle } from "react-icons/io5"
import { MdEmail } from "react-icons/md"

export default function UserMenuDialog(username: string) {
  const bg = useColorModeValue("white", "#202020")
  const [addFriend, { loading }] = useAddFriendMutation()
  const router = useRouter()
  const [loggedInUser] = useLoggedInUser()

  const UserProfileButton = () => (
    <MenuGroup color="lightsteelblue">
      <MenuItem onClick={() => router.push(`/user/${username}`)}>
        <FaUserCircle />
        <Box ml={3}>Profile</Box>
      </MenuItem>
      <MenuDivider />
    </MenuGroup>
  )

  const MessageUserButton = () => (
    <MenuItem onClick={() => router.push("/user/account")}>
      <MdEmail />
      <Box ml={3}>Message</Box>
    </MenuItem>
  )

  const me = loggedInUser

  const AddUserButton = () => (
    <MenuItem
      onClick={async () => {
        let response
        try {
          response = await addFriend({
            variables: {
              data: {
                username
              }
            },
            update(cache, { data }) {
              if (me) {
                cache.modify({
                  id: cache.identify(me),
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
              throw new Error("Something went wrong adding a friend")
            }
          })
        } catch (ex) {
          throw new Error(ex)
        }
      }}
    >
      <IoAddCircle />
      <Box ml={3}>Add to Friends</Box>
    </MenuItem>
  )

  return (
    <Menu>
      <ListItem ml={2} size="xs" variant="outline" as={MenuButton}>
        {username}
        {loading ? <ImSpinner /> : null}
      </ListItem>

      <MenuList opacity="0.7" bg={bg}>
        <UserProfileButton />
        <AddUserButton />
        <MessageUserButton />
      </MenuList>
    </Menu>
  )
}

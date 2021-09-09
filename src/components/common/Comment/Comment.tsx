import { CommentQuery, useAddFriendMutation } from "@/generated/graphql"
import { useLoggedInUser } from "@/hooks/useLoggedInUser"
import { timeDifferenceForDate } from "@/utils/index"
import { gql } from "@apollo/client"
import {
  Box,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import { BsLightning } from "react-icons/bs"
import { FaUserCircle } from "react-icons/fa"
import { IoAddCircle } from "react-icons/io5"
import { MdEmail, MdMessage } from "react-icons/md"
import { OfflineCircle, OnlineCircle } from "../OnlineOffline"

export default function CommentPage({ comment }: CommentQuery) {
  const [loggedInUser] = useLoggedInUser()
  const [addFriend, { loading }] = useAddFriendMutation()

  const bg = useColorModeValue("white", "#202020")
  const stackColor = useColorModeValue("gray.600", "gray.400")
  const router = useRouter()
  const huh = useColorModeValue("darkblue", "lightblue")
  const votebg = useColorModeValue("gray.50", "#313131")

  // #TODO fix voting, make it like or nothing
  // click the lightening bolt on/off
  return (
    <Flex bg={bg} minH="80px" width="100%">
      {/* Vote Box Container (Left Aside) */}
      <Box bg={votebg}>
        <Flex
          width="45px"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          p="2"
          height="100%"
        >
          <IconButton
            variant="ghost"
            color="current"
            aria-label="UpVote"
            icon={<BsLightning size="2em" />}
          />
        </Flex>
      </Box>

      {/* Comment Details Container (HEADER) */}
      <Box
        p={2}
        ml="1"
        minH="80px"
        width="100%"
        display="flex"
        flexDir="column"
      >
        <Stack fontSize="xs" color={stackColor}>
          <Box textDecoration="none" mb={2}>
            Comment by
            <Menu>
              <Button ml={2} size="xs" variant="outline" as={MenuButton}>
                {comment?.createdBy?.username}
                {comment.createdBy?.online ? (
                  <OnlineCircle />
                ) : (
                  <OfflineCircle />
                )}
              </Button>

              <MenuList opacity="0.7" bg={bg}>
                <MenuGroup color="lightsteelblue">
                  <MenuItem
                    onClick={() =>
                      router.push(`/user/${comment?.createdBy.username}`)
                    }
                  >
                    <FaUserCircle />
                    <Box ml={3}>Profile</Box>
                  </MenuItem>
                  <MenuDivider />
                </MenuGroup>
                <MenuItem
                  onClick={async () => {
                    let response
                    try {
                      response = await addFriend({
                        variables: {
                          data: {
                            username: comment?.createdBy.username
                          }
                        },
                        update(cache, { data }) {
                          if (loggedInUser) {
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
                          throw new Error(
                            "Something went wrong adding a friend"
                          )
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
                <MenuItem onClick={() => router.push("/user/account")}>
                  <MdEmail />
                  <Box ml={3}>Message</Box>
                </MenuItem>
                <MenuItem onClick={() => router.push("/user/account")}>
                  <MdMessage />
                  <Box ml={3}>Chat</Box>
                </MenuItem>
              </MenuList>
            </Menu>
            <Box
              display="inline"
              color={huh}
              ml="1"
              _hover={{
                textDecoration: "underline",
                cursor: "pointer"
              }}
            ></Box>
            <Box display="inline" ml="2">
              {timeDifferenceForDate(comment?.createdAt)}
            </Box>
          </Box>
        </Stack>
        {/* Comment Body Container (Text) */}
        <Box p={1}>
          <Text>{comment?.body}</Text>
        </Box>
      </Box>
    </Flex>
  )
}

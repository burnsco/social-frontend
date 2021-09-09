import { ChakraField } from "@/components/common/index"
import { useAddFriendMutation } from "@/generated/graphql"
import { useLoggedInUser } from "@/hooks/useLoggedInUser"
import convertToErrorMap from "@/utils/toErrorMap"
import { gql } from "@apollo/client"
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useColorModeValue,
  useToast
} from "@chakra-ui/react"
import { Form, Formik } from "formik"
import React from "react"
import { FaUserFriends } from "react-icons/fa"

export default function AddFriendPopOver() {
  const [loggedInUser] = useLoggedInUser()

  const bg = useColorModeValue("whitesmoke", "gray.900")
  const toast = useToast()
  const buttonColor = useColorModeValue("purple", "blue")

  const [addFriend, { loading }] = useAddFriendMutation()

  const initialFocusRef = React.useRef<HTMLButtonElement | null>(null)
  return (
    <>
      <Popover
        initialFocusRef={initialFocusRef}
        placement="bottom"
        closeOnBlur={true}
      >
        {({ isOpen, onClose }) => (
          <>
            <PopoverTrigger>
              <HStack>
                <FaUserFriends size="1.5em" />
              </HStack>
            </PopoverTrigger>
            <PopoverContent bg={bg} h="37.5rem" w="40rem">
              <PopoverHeader pt={4} fontWeight="bold" border="0">
                Add Friend
              </PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <Formik
                initialValues={{ username: "" }}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(false)
                  let response
                  try {
                    response = await addFriend({
                      variables: {
                        data: {
                          username: values.username
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
                    throw new Error(ex)
                  }
                  if (response?.data?.addFriend.errors) {
                    actions.setErrors(
                      convertToErrorMap(response.data.addFriend.errors)
                    )
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
                    actions.resetForm()
                    onClose()
                  }
                }}
              >
                {({ isSubmitting }) => {
                  return (
                    <Form>
                      <PopoverBody>
                        <ChakraField
                          id="username"
                          name="username"
                          label="Username: "
                        />
                      </PopoverBody>

                      <PopoverFooter
                        border="0"
                        d="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        pb={4}
                      >
                        <Box fontSize="sm">
                          {isSubmitting ? "searching..." : null}
                        </Box>
                        <ButtonGroup size="sm">
                          <Button onClick={onClose} colorScheme="red">
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            isLoading={isSubmitting}
                            colorScheme={buttonColor}
                            ref={initialFocusRef}
                          >
                            Confirm
                          </Button>
                        </ButtonGroup>
                      </PopoverFooter>
                    </Form>
                  )
                }}
              </Formik>
            </PopoverContent>
          </>
        )}
      </Popover>
    </>
  )
}

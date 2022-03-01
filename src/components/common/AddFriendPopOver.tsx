import { useAddFriendMutation } from '@/generated/graphql'
import { useLoggedInUser } from '@/hooks/useLoggedInUser'
import convertToErrorMap from '@/utils/toErrorMap'
import { gql } from '@apollo/client'
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  HStack,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useColorModeValue,
  useDisclosure,
  useToast,
  VisuallyHidden,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import ReactFocusLock from 'react-focus-lock'
import { FaUserFriends } from 'react-icons/fa'

export default function AddFriendPopOver() {
  const [loggedInUser] = useLoggedInUser()
  const { onOpen, onClose, isOpen } = useDisclosure()
  const bg = useColorModeValue('whitesmoke', 'gray.900')
  const toast = useToast()
  const buttonColor = useColorModeValue('purple', 'blue')

  const [addFriend, { loading }] = useAddFriendMutation()

  const initialFocusRef = React.useRef<HTMLInputElement | null>(null)

  if (loading) return <VisuallyHidden>loading/adding friend</VisuallyHidden>

  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={initialFocusRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={false}
      >
        {({ onClose }) => (
          <>
            <PopoverTrigger>
              <HStack>
                <FaUserFriends size="1.5em" />
              </HStack>
            </PopoverTrigger>
            <PopoverContent bg={bg} p="2">
              <PopoverHeader pt={2} fontWeight="bold" fontSize="lg" border="0">
                Add Friend
              </PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <Formik
                initialValues={{ username: '' }}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(false)
                  let response
                  try {
                    response = await addFriend({
                      variables: {
                        data: {
                          username: values.username,
                        },
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
                                  `,
                                })
                                return [newFriendRef, ...existingFriends]
                              },
                            },
                          })
                        }
                        return null
                      },
                    })
                  } catch (ex: any) {
                    console.log(ex)
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
                      title: 'Success',
                      description: `User '${friend.username}' is now your friend `,
                      status: 'success',
                      duration: 9000,
                      isClosable: true,
                    })
                    actions.resetForm()
                    onClose()
                  }
                }}
              >
                {({ isSubmitting, errors }) => {
                  return (
                    <Form>
                      <FormControl isInvalid={!!errors}>
                        <PopoverBody my="4">
                          <ReactFocusLock>
                            <Input
                              ref={initialFocusRef}
                              id="username"
                              name="username"
                            />
                          </ReactFocusLock>
                        </PopoverBody>

                        <PopoverFooter
                          border="0"
                          d="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box fontSize="sm">
                            {isSubmitting ? 'searching...' : null}
                          </Box>
                          <ButtonGroup size="sm">
                            <Button onClick={onClose} colorScheme="red">
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              isLoading={isSubmitting}
                              isDisabled={!isSubmitting}
                              colorScheme={buttonColor}
                            >
                              Confirm
                            </Button>
                          </ButtonGroup>
                        </PopoverFooter>
                      </FormControl>
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

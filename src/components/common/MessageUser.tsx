import { InputField } from "@/components/common/index"
import { User, useSendPrivateMessageMutation } from "@/generated/graphql"
import { sleep } from "@/utils/sleepy"
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
  chakra,
  IconButton,
  Tooltip,
  useToast
} from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { useRef, useState } from "react"
import { RiMailSendLine } from "react-icons/ri"

const MessageUser = (user: Partial<User>) => {
  const toast = useToast()
  const [sendMessage, { loading }] = useSendPrivateMessageMutation()
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef<null | HTMLButtonElement>(null)

  if (user && user.username && user.id) {
    return (
      <>
        <Tooltip
          hasArrow
          label="Send Message"
          fontSize="md"
          bg="black"
          color="whitesmoke"
        >
          <chakra.span>
            <IconButton
              onClick={() => setIsOpen(true)}
              size="xs"
              aria-label={`Message ${user.username}`}
              icon={<RiMailSendLine />}
            />
          </chakra.span>
        </Tooltip>

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
                To: <Badge colorScheme="purple">{user.username}</Badge>
              </AlertDialogHeader>

              <Formik
                initialValues={{ body: "" }}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(false)
                  sleep(1000)
                  const response = await sendMessage({
                    variables: {
                      data: {
                        userId: Number(user.id),
                        body: values.body
                      }
                    }
                  })
                  if (!response.errors) {
                    toast({
                      position: "bottom-left",
                      render: () => (
                        <Box color="white" p={3} bg="blue.500">
                          Message Sent!
                        </Box>
                      )
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
  return null
}

export default MessageUser

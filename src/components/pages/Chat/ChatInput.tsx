import { InputField } from "@/components/common/index"
import { useCreateMessageMutation } from "@/generated/graphql"
import { selectedChatRoomId } from "@/lib/apolloClient"
import { useReactiveVar } from "@apollo/client"
import {
  Box,
  Button,
  HStack,
  useColorModeValue,
  VStack
} from "@chakra-ui/react"
import { Form, Formik } from "formik"

export default function ChatInput() {
  const submitButtonColor = useColorModeValue("purple", "blue")

  const selectedCategoryId = useReactiveVar(selectedChatRoomId)
  const [submitMessage] = useCreateMessageMutation()

  const handleSubmitMessage = async (values: any, actions: any) => {
    const response = await submitMessage({
      variables: {
        data: {
          content: values.content,
          categoryId: Number(selectedCategoryId)
        }
      }
    })

    actions.resetForm()
    return response
  }

  return (
    <Box>
      <Formik initialValues={{ content: "" }} onSubmit={handleSubmitMessage}>
        <Form>
          <VStack w="full">
            <HStack w="full">
              <InputField
                label=""
                id="content"
                name="content"
                placeholder="chat here..."
              />

              <Button type="submit" colorScheme={submitButtonColor}>
                Submit
              </Button>
            </HStack>
          </VStack>
        </Form>
      </Formik>
    </Box>
  )
}

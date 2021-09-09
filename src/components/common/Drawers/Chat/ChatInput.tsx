import { useCreateMessageMutation } from "@/generated/graphql"
import { selectedChatRoomId } from "@/lib/apolloClient"
import { useReactiveVar } from "@apollo/client"
import { HStack } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import ChatField from "../../Forms/ChatField"

export default function ChatInput() {
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
    <HStack w="full" p={1}>
      <Formik initialValues={{ content: "" }} onSubmit={handleSubmitMessage}>
        <Form>
          <ChatField
            label=""
            id="content"
            name="content"
            placeholder="chat here..."
          />
        </Form>
      </Formik>
    </HStack>
  )
}

import { InputField } from "@/components/common/index"
import { useCreateMessageMutation } from "@/generated/graphql"
import { selectedChatRoomId } from "@/lib/apolloClient"
import { useReactiveVar } from "@apollo/client"
import { Button, HStack, useColorModeValue } from "@chakra-ui/react"
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
    <HStack w="full">
      <Formik initialValues={{ content: "" }} onSubmit={handleSubmitMessage}>
        <Form>
          <InputField
            label=""
            id="content"
            name="content"
            placeholder="chat here..."
          />

          <Button type="submit" colorScheme={submitButtonColor}>
            Submit
          </Button>
        </Form>
      </Formik>
    </HStack>
  )
}

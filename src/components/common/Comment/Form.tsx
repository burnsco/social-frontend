import { InputField } from "@/components/common/index"
import { useCreateCommentMutation } from "@/generated/graphql"
import { useLoggedInUser } from "@/hooks/useLoggedInUser"
import CreateCommentSchema from "@/types/Comment/schemas"
import { gql } from "@apollo/client"
import { Box, Button, useColorModeValue, useToast } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"

const SubmitCommentForm = () => {
  const buttomScheme = useColorModeValue("purple", "orange")
  const bg = useColorModeValue("white", "#202020")
  const hoverBc = useColorModeValue("gray.200", "gray.600")
  const toast = useToast()
  const loggedInUser = useLoggedInUser()
  const router = useRouter()
  const postId = router.query.id

  const [
    submitComment,
    { loading: mutationLoading, error: mutationError }
  ] = useCreateCommentMutation()

  return (
    <Box
      bg={bg}
      borderWidth="1px"
      rounded="md"
      p={3}
      _hover={{
        boxShadow: "lg",
        borderWidth: "1px",
        borderColor: hoverBc
      }}
    >
      <Formik
        initialValues={{ body: "", postId: 0 }}
        validationSchema={CreateCommentSchema}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(false)
          const response = await submitComment({
            variables: {
              data: {
                body: values.body,
                postId: Number(postId)
              }
            },
            update(cache, { data }) {
              cache.modify({
                id: cache.identify({ id: `Post:${postId}` }),
                fields: {
                  comments(existingComments = []) {
                    const newCommentRef = cache.writeFragment({
                      data: data?.createComment?.comment,
                      fragment: gql`
                        fragment NewComment on Comment {
                          id
                          createdAt
                          updatedAt
                          body
                          createdBy {
                            id
                            username
                            online
                          }
                        }
                      `
                    })
                    return [newCommentRef, ...existingComments]
                  }
                }
              })
            }
          })
          if (
            response &&
            response.data &&
            response.data.createComment &&
            response.data.createComment.comment
          ) {
            toast({
              id: `${response.data.createComment.comment.body}-toast`,
              title: "Your comment was posted successfully.",
              status: "success",
              duration: 3000,
              isClosable: true
            })
            actions.resetForm()
          }
        }}
      >
        {formik => (
          <Form>
            <InputField id="body" name="body" label="" textarea />
            <Button
              borderTopLeftRadius="none"
              borderBottomLeftRadius="lg"
              mt={1}
              size="sm"
              colorScheme={buttomScheme}
              isLoading={mutationLoading || formik.isSubmitting}
              isDisabled={mutationLoading || formik.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      {mutationError &&
        toast({
          id: "error",
          title: "An error occurred.",
          description: "There was an error trying to submit your comment",
          status: "error",
          duration: 3000,
          isClosable: true
        })}
    </Box>
  )
}

export default SubmitCommentForm

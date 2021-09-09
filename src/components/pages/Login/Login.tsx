import { ChakraField } from "@/components/common/index"
import { Wrapper } from "@/components/common/wrapper"
import { Layout } from "@/components/ui"
import { MeDocument, MeQuery, useLoginMutation } from "@/generated/graphql"
import { LoginSchema } from "@/types/User/schemas"
import { LoginUserInputType } from "@/types/User/types"
import { convertToErrorMap } from "@/utils/index"
import {
  Box,
  Button,
  useColorModeValue,
  useToast,
  VisuallyHidden
} from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"

export default function LoginPage() {
  const bg = useColorModeValue("white", "#1A1A1B")
  const router = useRouter()
  const toast = useToast()
  const [Login, { loading: loginAttempt }] = useLoginMutation()

  if (loginAttempt) return <VisuallyHidden>Attempting to Login</VisuallyHidden>

  return (
    <Layout title="Login">
      <Box shadow="sm" borderWidth="1px" rounded="md" bg={bg} p={2}>
        <Wrapper variant="small">
          <Formik
            initialValues={LoginUserInputType}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setErrors }) => {
              const response = await Login({
                variables: {
                  data: {
                    ...values
                  }
                },
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      me: data?.login.user
                    }
                  })
                }
              })
              if (response.data?.login?.user) {
                toast({
                  id: `${response.data.login.user.username}-toast`,
                  title: `Welcome ${response.data.login.user.username}!`,
                  description: "Your account was created successfully.",
                  status: "success",
                  duration: 9000,
                  isClosable: true
                })
                router.push("/")
              } else if (response.data?.login.errors) {
                setErrors(convertToErrorMap(response.data.login.errors))
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <ChakraField name="email" placeholder="email" label="Email" />
                <Box my="4">
                  <ChakraField
                    name="password"
                    placeholder="password"
                    label="Password"
                    type="password"
                  />
                </Box>
                <Button
                  mt={4}
                  colorScheme="red"
                  type="submit"
                  isDisabled={isSubmitting}
                  isLoading={isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Wrapper>
      </Box>
    </Layout>
  )
}

import { ChakraField } from "@/components/common/index"
import { MeDocument, useLoginMutation } from "@/generated/graphql"
import { LoginSchema } from "@/types/User/schemas"
import { LoginUserInputType } from "@/types/User/types"
import { convertToErrorMap } from "@/utils/index"
import { sleep } from "@/utils/sleepy"
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  useColorModeValue,
  useDisclosure,
  useToast
} from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useRef } from "react"

export default function LoginDrawer() {
  const router = useRouter()
  const [login] = useLoginMutation()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const colorScheme = useColorModeValue("purple", "blue")
  const buttonScheme = useColorModeValue("purple", "orange")
  const drawerBG = useColorModeValue("whitesmoke", "gray.900")

  return (
    <>
      <Button
        variant="outline"
        size="md"
        ref={btnRef}
        colorScheme={buttonScheme}
        onClick={onOpen}
      >
        Login
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={drawerBG}>
          <DrawerCloseButton />
          <DrawerHeader>Login</DrawerHeader>
          <Formik
            initialValues={LoginUserInputType}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setErrors }) => {
              await sleep(1000)
              const response = await login({
                variables: {
                  data: {
                    email: values.email,
                    password: values.password
                  }
                },
                update: (cache, { data }) => {
                  cache.writeQuery({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      me: data?.login.user
                    }
                  })
                }
              })
              if (response?.data?.login?.errors) {
                setErrors(convertToErrorMap(response?.data?.login?.errors))
              } else {
                toast({
                  id: `${response?.data?.login?.user?.username}-toast`,
                  title: `Welcome ${response?.data?.login?.user?.username}!`,
                  description: "You were logged in successfully",
                  status: "success",
                  duration: 2000,
                  isClosable: true
                })
                router.push("/")
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <DrawerBody>
                  <Stack spacing={4}>
                    <ChakraField
                      id="email"
                      name="email"
                      type="email"
                      label="Email"
                    />

                    <ChakraField
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                    />
                  </Stack>
                </DrawerBody>
                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText="Submitting"
                    colorScheme={colorScheme}
                  >
                    Submit
                  </Button>
                </DrawerFooter>
              </Form>
            )}
          </Formik>
        </DrawerContent>
      </Drawer>
    </>
  )
}

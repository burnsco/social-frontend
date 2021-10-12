import { ChakraField, PasswordField } from "@/components/common/index"
import { MeDocument, useRegisterMutation } from "@/generated/graphql"
import { RegisterSchema } from "@/types/User/schemas"
import { RegisterUserInputType } from "@/types/User/types"
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
  Heading,
  Stack,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useRef } from "react"

export default function RegisterDrawer() {
  const router = useRouter()
  const [register] = useRegisterMutation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const colorScheme = useColorModeValue("purple", "blue")
  const buttonScheme = useColorModeValue("purple", "orange")
  const colorbg = useColorModeValue("whitesmoke", "gray.900")

  return (
    <>
      <Button
        ref={btnRef}
        size="md"
        colorScheme={buttonScheme}
        onClick={onOpen}
      >
        Register
      </Button>
      <Drawer
        size="sm"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={colorbg}>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading>Join the Community!</Heading>
          </DrawerHeader>
          <Formik
            initialValues={RegisterUserInputType}
            validationSchema={RegisterSchema}
            onSubmit={async (values, { setErrors }) => {
              await sleep(1000)
              const response = await register({
                variables: {
                  data: {
                    username: values.username,
                    email: values.email,
                    password: values.password
                  }
                },
                update: (cache, { data }) => {
                  cache.writeQuery({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      me: data?.register.user
                    }
                  })
                }
              })
              if (response?.data?.register?.errors) {
                setErrors(convertToErrorMap(response?.data?.register?.errors))
              } else {
                router.push("/")
              }
            }}
          >
            {({ isSubmitting }) => {
              return (
                <Form>
                  <DrawerBody>
                    <Stack spacing={6}>
                      <ChakraField
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                      />

                      <ChakraField
                        id="username"
                        name="username"
                        type="text"
                        label="Username"
                      />

                      <PasswordField
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                      />
                    </Stack>
                  </DrawerBody>

                  <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      variant="solid"
                      type="submit"
                      isLoading={isSubmitting}
                      colorScheme={colorScheme}
                    >
                      Submit
                    </Button>
                  </DrawerFooter>
                </Form>
              )
            }}
          </Formik>
        </DrawerContent>
      </Drawer>
    </>
  )
}

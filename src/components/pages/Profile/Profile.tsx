import { ChakraField } from "@/components/common/index"
import Layout from "@/components/ui/Layout"
import { useEditUserMutation, useMeQuery } from "@/generated/graphql"
import useCloudDrop from "@/hooks/useCloudDrop"
import { EditUserSchema } from "@/types/User/schemas"
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Progress,
  Spinner,
  useColorModeValue
} from "@chakra-ui/react"
import { Form, Formik } from "formik"

const ProfilePage = () => {
  useCloudDrop()
  const {
    imageUrl,
    onDrop,
    uploadProgress,
    getRootProps,
    getInputProps,
    isDragActive
  } = useCloudDrop()
  const bg = useColorModeValue("white", "#202020")

  const { data, loading } = useMeQuery()

  const [editUser, { loading: editUserLoading }] = useEditUserMutation()

  // TODO fix this!
  // make about me change properly
  // make avatar uploading/changing work properly

  if (!loading) {
    return (
      <Layout title="My Profile">
        <Box shadow="sm" borderWidth="1px" rounded="md" p={4} bg={bg}>
          <Formik
            initialValues={{
              username: data?.me?.username ?? "",
              about: data?.me?.about ?? "",
              email: data?.me?.email ?? "",
              password: "",
              avatar: data?.me?.avatar ?? ""
            }}
            validationSchema={EditUserSchema}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false)
              setTimeout(() => {
                editUser({
                  variables: {
                    data: {
                      username: values.username,
                      about: values.about,
                      email: values.about,
                      avatar: imageUrl
                    }
                  }
                })
              }, 1000)
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box my="4">
                  <ChakraField id="about" name="about" label="About Me" />
                </Box>
                <Box my="4">
                  <ChakraField id="username" name="username" label="Username" />
                </Box>
                <Box my="4">
                  <ChakraField id="avatar" name="avatar" label="Avatar" />
                </Box>
                <div {...getRootProps({})}>
                  <Box id="upload-media" border="3px dashed" p={4} my={2}>
                    {isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <p>
                        Drag and drop some files here, or click to select files
                      </p>
                    )}
                    <input {...getInputProps({})} />

                    {uploadProgress === 100 ? (
                      <Alert status="success">
                        <AlertIcon />
                        Image Upload Complete!
                      </Alert>
                    ) : (
                      <ChakraField
                        label=""
                        id="image"
                        name="image"
                        placeholder="image"
                        aria-placeholder="Post Image"
                      />
                    )}
                    {uploadProgress !== 0 && uploadProgress !== 100 ? (
                      <Progress
                        my={4}
                        size="lg"
                        hasStripe
                        value={uploadProgress}
                      />
                    ) : null}
                  </Box>
                </div>

                <Button
                  mt={4}
                  colorScheme="red"
                  type="submit"
                  isDisabled={isSubmitting || editUserLoading}
                  isLoading={isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Layout>
    )
  }
  return <Spinner />
}

export default ProfilePage

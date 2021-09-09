import { EditUserField } from "@/components/common/index"
import { Layout } from "@/components/ui"
import { useEditUserMutation, useMeQuery } from "@/generated/graphql"
import { EditUserSchema } from "@/types/User/schemas"
import { convertToErrorMap } from "@/utils/index"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Spinner,
  useColorModeValue,
  VisuallyHidden
} from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import request from "superagent"

const AccountContent = (): JSX.Element => {
  const [uploadProgress, setUploadProgress] = useState(0)

  const [imageUrl, setImageUrl] = useState<string>("")
  const bg = useColorModeValue("white", "#1A1A1B")
  const { data, loading: meQueryLoading } = useMeQuery()
  const [editUser, { loading: editUserLoading }] = useEditUserMutation()

  const accountFormData = [
    { id: "edit-user-username-field", field: "username", title: "Username" },
    {
      id: "edit-user-password-field",
      field: "password",
      title: "Password",
      type: "password"
    },
    {
      id: "edit-user-email-field",
      field: "email",
      title: "Email",
      type: "email"
    },
    { id: "edit-user-about-field", field: "about", title: "About" }
  ]

  const onDrop = useCallback(acceptedFile => {
    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dmztdsduf/upload"
    const cloudinaryPreset = "qapnebg6"

    request
      .post(cloudinaryUrl)
      .field("upload_preset", cloudinaryPreset)
      .field("file", acceptedFile)
      .field("multiple", false)
      .on("progress", progress => {
        if (progress && progress.percent) {
          setUploadProgress(progress.percent)
        }
      })
      .end((error, response) => {
        if (error) {
          throw new Error(error.message)
        }

        setImageUrl(response.body.public_id)
      })
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles
  } = useDropzone({
    onDrop,
    maxFiles: 1
  })

  if (!meQueryLoading) {
    return (
      <Layout title="my account">
        <Container>
          <Box shadow="sm" borderWidth="1px" rounded="md" bg={bg} p={5}>
            <Formik
              initialValues={{
                username: data?.me?.username ?? "",
                about: data?.me?.about ?? "",
                email: data?.me?.email,
                password: "",
                avatar: imageUrl
              }}
              validationSchema={EditUserSchema}
              onSubmit={async (values, actions) => {
                actions.setSubmitting(false)
                setTimeout(async () => {
                  const response = await editUser({
                    variables: {
                      data: {
                        ...values
                      }
                    }
                  })
                  if (response.data?.editUser?.errors) {
                    actions.setErrors(
                      convertToErrorMap(response.data.editUser.errors)
                    )
                  }
                }, 1000)
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Accordion allowToggle>
                    <>
                      {accountFormData.map(formItem => (
                        <AccordionItem key={formItem.id}>
                          <h2>
                            <AccordionButton>
                              <Box flex="1" textAlign="left">
                                {formItem.title}
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            <EditUserField
                              name={formItem.field}
                              type={formItem.type || "text"}
                              id={formItem.field}
                              label=""
                            />
                          </AccordionPanel>
                        </AccordionItem>
                      ))}
                      <AccordionItem>
                        <h2>
                          <AccordionButton>
                            <Box flex="1" textAlign="left">
                              Avatar
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <div {...getRootProps({})}>
                            {uploadProgress !== 100 ? (
                              <Box
                                width="300px"
                                height="100px"
                                id="upload-media"
                                border="3px dashed"
                                p={4}
                              >
                                <Center>
                                  {isDragActive ? (
                                    <p>Drop the files here ...</p>
                                  ) : (
                                    <p>
                                      {uploadProgress === 0
                                        ? "Drag and drop your avatar here, or click to select file"
                                        : "Uploading..."}
                                    </p>
                                  )}
                                </Center>
                                <VisuallyHidden>
                                  <EditUserField
                                    name="avatar"
                                    type="text"
                                    id="avatar"
                                    label=""
                                  />
                                </VisuallyHidden>
                                <input {...getInputProps({})} />
                                {uploadProgress !== 0 &&
                                uploadProgress !== 100 ? (
                                  <CircularProgress
                                    my={4}
                                    color="green.400"
                                    value={uploadProgress}
                                  >
                                    <CircularProgressLabel>
                                      {uploadProgress}
                                    </CircularProgressLabel>
                                  </CircularProgress>
                                ) : null}
                              </Box>
                            ) : (
                              <Alert status="success" variant="top-accent">
                                <AlertIcon />
                                Image uploaded !
                              </Alert>
                            )}
                          </div>
                        </AccordionPanel>
                      </AccordionItem>
                    </>
                  </Accordion>

                  <Button
                    mt={4}
                    colorScheme="red"
                    type="submit"
                    isDisabled={editUserLoading || meQueryLoading}
                    isLoading={isSubmitting}
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Container>
      </Layout>
    )
  }
  return <Spinner />
}

export default AccountContent

import { ChakraField, ChakraSelect } from "@/components/common/index"
import {
  CreatePostInput,
  useCategoriesLazyQuery,
  useCreatePostMutation
} from "@/generated/graphql"
import { CreatePostInputType } from "@/types/Post/types"
import { gql } from "@apollo/client"
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  chakra,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Progress,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  useToast,
  VisuallyHidden,
  VStack
} from "@chakra-ui/react"
import { Form, Formik, FormikHelpers } from "formik"
import { useRouter } from "next/router"
import { useCallback, useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { BsPaperclip, BsPencilSquare } from "react-icons/bs"
import { MdLink } from "react-icons/md"
import { RiPictureInPictureFill } from "react-icons/ri"
import request from "superagent"

export default function CreatePostDrawer() {
  const [uploadProgress, setUploadProgress] = useState(0)

  const [imageUrl, setImageUrl] = useState<string>("")
  const [imageH, setImageH] = useState<number>(0)
  const [imageW, setImageW] = useState<number>(0)

  const router = useRouter()
  const toast = useToast()

  const [getSubreddits, { data }] = useCategoriesLazyQuery()
  const [submitPost, { loading }] = useCreatePostMutation()

  useEffect(() => getSubreddits(), [getSubreddits])

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement | null>(null)

  const drawerBG = useColorModeValue("whitesmoke", "gray.900")

  const createPostHandler = async (
    values: typeof CreatePostInputType,
    actions: FormikHelpers<CreatePostInput>
  ) => {
    actions.setSubmitting(false)

    try {
      const response = await submitPost({
        variables: {
          data: {
            categoryId: Number(values.categoryId),
            title: values.title,
            text: values.text,
            link: values.link,
            image: imageUrl,
            imageH: imageH,
            imageW: imageW
          }
        },
        update(cache, { data }) {
          cache.modify({
            fields: {
              posts(existingPosts = []) {
                const newPostRef = cache.writeFragment({
                  data: data?.createPost.post,
                  fragment: gql`
                    fragment NewPost on Post {
                      id
                      title
                    }
                  `
                })
                return [newPostRef, ...existingPosts]
              }
            }
          })
        }
      })

      if (response.data?.createPost.post) {
        toast({
          id: `success-${response.data?.createPost.post.title}`,
          title: `${response.data?.createPost?.post.title}!`,
          description: "Your post was submitted successfully.",
          status: "success",
          duration: 9000,
          isClosable: true
        })
        router.push("/")
        onClose()
      }
    } catch (error) {
      throw new Error(error)
    }
  }

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
        setImageH(response.body.height)
        setImageW(response.body.width)
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

  return (
    <>
      <Tooltip
        hasArrow
        label="Create Post"
        fontSize="md"
        bg="black"
        color="whitesmoke"
      >
        <chakra.span>
          <IconButton
            variant="ghost"
            aria-label="Create a Post"
            icon={<BsPencilSquare size="1.5em" />}
            ref={btnRef}
            size="md"
            onClick={onOpen}
          />
        </chakra.span>
      </Tooltip>
      <Drawer
        size="sm"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={drawerBG}>
          <DrawerCloseButton />
          <DrawerHeader>Submit a Post!</DrawerHeader>
          <Formik
            initialValues={CreatePostInputType}
            onSubmit={(actions, values) => createPostHandler(actions, values)}
          >
            {formik => {
              return (
                <Form>
                  <DrawerBody>
                    <Stack spacing={5}>
                      <ChakraSelect
                        placeholder="Choose a community"
                        aria-label="Choose a community"
                        id="categoryId"
                        name="categoryId"
                        label=""
                      >
                        {data?.categories?.map(subreddit => (
                          <option
                            key={`subreddit-${subreddit.name}-sidemenu`}
                            value={subreddit.id}
                          >
                            {subreddit.name}
                          </option>
                        ))}
                      </ChakraSelect>

                      <Tabs
                        isLazy
                        variant="enclosed"
                        onChange={() => {
                          formik.handleReset()
                        }}
                      >
                        <TabList>
                          <Tab>
                            <BsPaperclip />
                            <chakra.span ml={2}>Post</chakra.span>
                          </Tab>
                          <Tab>
                            <MdLink />
                            <chakra.span ml={2}>Link</chakra.span>
                          </Tab>

                          <Tab>
                            <RiPictureInPictureFill />
                            <chakra.span ml={2}>Image</chakra.span>
                          </Tab>
                        </TabList>

                        <TabPanels>
                          <TabPanel>
                            <VStack spacing={4}>
                              <ChakraField
                                label="Title: "
                                id="title"
                                placeholder="...enter your post title"
                                aria-placeholder="Post Title Input"
                                name="title"
                              />

                              <ChakraField
                                label="Text: "
                                id="text"
                                placeholder="...type some details"
                                aria-placeholder="Post Text Input"
                                name="text"
                              />
                            </VStack>
                          </TabPanel>

                          <TabPanel>
                            <VStack spacing={4}>
                              <ChakraField
                                label="Title: "
                                id="title"
                                name="title"
                                placeholder="...my cool post"
                                aria-placeholder="Post Title"
                              />
                              <ChakraField
                                label="Link(URL): "
                                id="link"
                                name="link"
                                placeholder="http://nicepics/cool.jpg"
                                aria-placeholder="Post Link"
                              />
                            </VStack>
                          </TabPanel>

                          <TabPanel>
                            <VStack spacing={6}>
                              <ChakraField
                                label="Title: "
                                id="title"
                                name="title"
                                placeholder="title"
                                aria-placeholder="Post Title"
                              />

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
                                            ? "Drag and drop some files here, or click to select files"
                                            : "Uploading..."}
                                        </p>
                                      )}
                                    </Center>
                                    <VisuallyHidden>
                                      <ChakraField
                                        label=""
                                        id="image"
                                        name="image"
                                        placeholder="image"
                                        aria-placeholder="Post Image"
                                      />
                                    </VisuallyHidden>
                                    <input {...getInputProps({})} />

                                    {uploadProgress !== 0 &&
                                    uploadProgress !== 100 ? (
                                      <Progress
                                        my={4}
                                        size="lg"
                                        hasStripe
                                        value={uploadProgress}
                                      />
                                    ) : null}
                                  </Box>
                                ) : (
                                  <Alert status="success" variant="top-accent">
                                    <AlertIcon />
                                    Image uploaded !
                                  </Alert>
                                )}
                              </div>
                            </VStack>
                          </TabPanel>
                        </TabPanels>
                      </Tabs>
                    </Stack>
                  </DrawerBody>

                  <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      isDisabled={formik.isSubmitting || loading}
                      isLoading={formik.isSubmitting}
                      colorScheme="orange"
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

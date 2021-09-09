import { ChakraSelect } from "@/components/common/index"
import {
  useCategoriesLazyQuery,
  useCreatePostMutation
} from "@/generated/graphql"
import { CreatePostSchema } from "@/types/Post/schemas"
import { CreatePostInputType } from "@/types/Post/types"
import { gql } from "@apollo/client"
import {
  Box,
  Button,
  Stack,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  useColorModeValue,
  useToast
} from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { LinkPost, MediaPost, RegularPost } from "./PostTypes"

export default function CreatePost() {
  const router = useRouter()
  const bg = useColorModeValue("white", "#1A1A1B")
  const toast = useToast()

  const [getSubreddits, { data }] = useCategoriesLazyQuery()

  const [submitPost, { loading }] = useCreatePostMutation()

  return (
    <Box shadow="sm" borderWidth="1px" rounded="md" bg={bg} p={2}>
      <Formik
        initialValues={CreatePostInputType}
        validationSchema={CreatePostSchema}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(false)
          const response = await submitPost({
            variables: {
              data: {
                ...values
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
              id: `${response.data?.createPost?.post.title}-toast`,
              title: `${response.data?.createPost?.post.title}!`,
              description: "Your post was submitted successfully.",
              status: "success",
              duration: 9000,
              isClosable: true
            })
            router.push("/")
          }
        }}
      >
        {formik => {
          return (
            <Form>
              <Stack spacing={5}>
                <ChakraSelect
                  placeholder="Choose a community"
                  aria-label="Choose a community"
                  onMouseOver={() => getSubreddits()}
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
                  variant="enclosed"
                  onChange={() => {
                    formik.handleReset()
                  }}
                >
                  <TabList>
                    <Tab>Post</Tab>
                    <Tab>Link</Tab>
                    <Tab>Images & Video</Tab>
                  </TabList>

                  <TabPanels>
                    <RegularPost />
                    <LinkPost />
                    <MediaPost />
                  </TabPanels>
                </Tabs>
              </Stack>
              <Button
                m={2}
                colorScheme="purple"
                isDisabled={loading}
                isLoading={formik.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )
        }}
      </Formik>
    </Box>
  )
}

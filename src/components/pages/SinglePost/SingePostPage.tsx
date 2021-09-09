import CommentsPageWithData from "@/components/common/Comment/Data"
import SubmitCommentForm from "@/components/common/Comment/Form"
import NewPost from "@/components/common/Post"
import Layout from "@/components/ui/Layout"
import { useMeQuery, usePostQuery } from "@/generated/graphql"
import { Alert, Box, Skeleton, Stack, VisuallyHidden } from "@chakra-ui/react"
import { useRouter } from "next/router"

export default function SinglePostPage() {
  const router = useRouter()

  const postId = router.query.id

  const { data, loading, error } = usePostQuery({
    variables: { postId: Number(postId) }
  })

  const { data: userData } = useMeQuery({ ssr: false })

  if (loading) return <VisuallyHidden>loading</VisuallyHidden>

  if (error) {
    return <Alert>Error!</Alert>
  }

  return (
    <Layout title="Post">
      <Skeleton isLoaded={!loading}>
        <Stack spacing={4}>
          {data && data.post ? (
            <NewPost
              key={`post-${data?.post.id}-${data?.post.title}`}
              post={data?.post}
            />
          ) : (
            <Alert>Post Not Found</Alert>
          )}
          {userData && userData.me ? (
            <SubmitCommentForm />
          ) : (
            <Box>Login/Register to comment</Box>
          )}

          <CommentsPageWithData />
        </Stack>
      </Skeleton>
    </Layout>
  )
}

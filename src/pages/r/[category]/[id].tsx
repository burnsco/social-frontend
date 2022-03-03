import CommentsPageWithData from '@/components/common/Comment/Data'
import SubmitCommentForm from '@/components/common/Comment/Form'
import NewPost from '@/components/common/Post'
import { Layout } from '@/components/ui'
import {
  Post,
  PostDocument,
  PostQuery,
  PostsDocument,
  useMeQuery,
  usePostQuery,
} from '@/generated/graphql'
import { initializeApollo } from '@/lib/apolloClient'
import { Alert, Box, Skeleton, Stack, VisuallyHidden } from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()

  await apolloClient.query<PostQuery>({
    query: PostDocument,
    variables: {
      postId: Number(params?.id) ?? 1,
    },
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      postId: Number(params?.id) ?? 1,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: PostsDocument,
  })

  const paths =
    data.posts.map(
      (item: Post) => `/r/${item.category.name}/${item.category.id}`
    ) || []

  return {
    paths,
    fallback: 'blocking',
  }
}

export default function PostAndCommentsPage() {
  const router = useRouter()

  const postId = router.query.id

  const { data, loading, error } = usePostQuery({
    variables: { postId: Number(postId) },
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

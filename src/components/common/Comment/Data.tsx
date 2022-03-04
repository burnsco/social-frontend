import { useCommentsForPostQuery } from '@/generated/graphql'
import { Skeleton, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import CommentPage from './index'

export default function CommentsPageWithData() {
  const router = useRouter()
  const postId = router.query.id as string

  const { data, loading } = useCommentsForPostQuery({
    variables: { postId },
  })

  if (data && data.post && data.post.comments) {
    const { comments } = data.post
    const arePosts = comments.length > 0

    if (arePosts) {
      return (
        <Skeleton isLoaded={!loading}>
          <Stack>
            {comments.map((comment, index) => (
              <CommentPage
                key={`comment-${comment.id}-${index}`}
                comment={comment}
              />
            ))}
          </Stack>
        </Skeleton>
      )
    }
  }

  return (
    <Stack>
      <Text>No comments yet</Text>
    </Stack>
  )
}

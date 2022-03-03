import { Box, Button } from '@chakra-ui/react'

type MorePostsProps = {
  loadMorePosts: () => void
  areMorePosts: boolean
  loadingMorePosts: boolean
}

export const ShowMorePosts = ({
  loadMorePosts,
  areMorePosts,
  loadingMorePosts,
}: MorePostsProps) => {
  if (areMorePosts) {
    return (
      <Box m={4}>
        <Button
          colorScheme="blue"
          onClick={() => loadMorePosts()}
          disabled={loadingMorePosts}
        >
          {loadingMorePosts ? 'Loading...' : 'Show More'}
        </Button>
      </Box>
    )
  }
  return null
}

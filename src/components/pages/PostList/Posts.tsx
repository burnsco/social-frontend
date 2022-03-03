import NewPost from '@/components/common/Post'
import { ShowMorePosts } from '@/components/common/ShowMorePosts'
import { usePostsQuery } from '@/generated/graphql'
import { allPostsQueryVars } from '@/types/pagination'
import { NetworkStatus } from '@apollo/client'
import { Box, Text, VisuallyHidden, VStack } from '@chakra-ui/react'

export default function Posts() {
  const { loading, data, fetchMore, networkStatus } = usePostsQuery({
    variables: allPostsQueryVars,
    notifyOnNetworkStatusChange: true,
  })

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  const allPosts = data?.posts ?? []
  const _allPostsMeta = data?._allPostsMeta
  const areMorePosts = (allPosts?.length ?? 1) < (_allPostsMeta?.count ?? 0)

  const loadMorePosts = () => {
    if (fetchMore) {
      fetchMore({
        variables: {
          skip: data?.posts?.length ?? 0,
        },
      })
    }
  }

  const ViewPosts = () => {
    if (allPosts.length > 0) {
      return (
        <VStack spacing={4}>
          {allPosts.map((post, index) => (
            <NewPost key={`post-${post.id}-${index}`} post={post} />
          ))}
        </VStack>
      )
    }
    return <Text>No posts here.</Text>
  }

  if (loading && !loadingMorePosts) {
    return <VisuallyHidden>loading all posts</VisuallyHidden>
  }

  return (
    <Box as="section">
      <ViewPosts />
      <ShowMorePosts
        loadMorePosts={loadMorePosts}
        areMorePosts={areMorePosts}
        loadingMorePosts={loadingMorePosts}
      />
    </Box>
  )
}

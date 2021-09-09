import NewPost from "@/components/common/Post"
import ShowMorePosts from "@/components/pages/PostList/showMore"
import { Layout } from "@/components/ui"
import { usePostsLazyQuery } from "@/generated/graphql"
import { NetworkStatus } from "@apollo/client"
import { Box, Text, VisuallyHidden, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

const CategoryPosts = (): JSX.Element => {
  const router = useRouter()
  const category = router.query.category as string

  const [
    fetchPosts,
    { loading, data, fetchMore, networkStatus }
  ] = usePostsLazyQuery({
    variables: {
      category: category,
      skip: 0,
      first: 2
    },
    notifyOnNetworkStatusChange: true
  })

  useEffect(() => fetchPosts(), [fetchPosts])

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore
  const loadMorePosts = () => {
    if (fetchMore && postsBySubreddit) {
      fetchMore({
        variables: {
          skip: postsBySubreddit.length
        }
      })
    }
  }

  const postsBySubreddit = data?.posts ?? []
  const _categoryPostsMeta = data?._categoryPostsMeta
  const areMorePosts =
    (postsBySubreddit?.length ?? 1) < (_categoryPostsMeta?.count ?? 0)

  const ViewPosts = () => {
    if (postsBySubreddit?.length > 0) {
      return (
        <VStack spacing={4}>
          {postsBySubreddit.map(post => (
            <NewPost key={`post-${post.id}-categoryPage`} post={post} />
          ))}
        </VStack>
      )
    }
    return <Text>No posts here.</Text>
  }

  if (loading && !loadingMorePosts) {
    return <VisuallyHidden>loading posts by category</VisuallyHidden>
  }

  return (
    <Layout title="reddit">
      <Box as="section">
        <ViewPosts />
        <ShowMorePosts
          loadMorePosts={loadMorePosts}
          areMorePosts={areMorePosts}
          loadingMorePosts={loadingMorePosts}
        />
      </Box>
    </Layout>
  )
}

export default CategoryPosts

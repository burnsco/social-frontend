import NewPost from '@/components/common/Post'
import { ShowMorePosts } from '@/components/common/ShowMorePosts'
import { Layout } from '@/components/ui'
import {
  CategoriesDocument,
  Category,
  PostsDocument,
  PostsQuery,
  usePostsQuery,
} from '@/generated/graphql'
import { initializeApollo } from '@/lib/apolloClient'
import { NetworkStatus } from '@apollo/client'
import { Box, VisuallyHidden, VStack } from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()

  await apolloClient.query<PostsQuery>({
    query: PostsDocument,
    variables: {
      category: params?.category ?? 'react',
      skip: 0,
      first: 4,
    },
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      category: params?.category ?? 'react',
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: CategoriesDocument,
  })

  const paths = data.categories.map((item: Category) => `/r/${item.name}`)

  return {
    paths,
    fallback: 'blocking',
  }
}

export default function CategoryPage() {
  const router = useRouter()

  const category = router.query.category as string

  const { loading, data, fetchMore, networkStatus } = usePostsQuery({
    variables: {
      category: category,
      skip: 0,
      first: 4,
    },
    notifyOnNetworkStatusChange: true,
  })

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore
  const loadMorePosts = () => {
    if (fetchMore && postsBySubreddit) {
      fetchMore({
        variables: {
          skip: postsBySubreddit.length,
        },
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
          {postsBySubreddit
            .filter((post) => post.category.name === category)
            .map((post) => (
              <NewPost key={`post-${post.id}-categoryPage`} post={post} />
            ))}
        </VStack>
      )
    }
    return <div>No posts here.</div>
  }

  if (loading && !loadingMorePosts) {
    return <VisuallyHidden>loading posts by category</VisuallyHidden>
  }

  return (
    <Layout title={`${category}`}>
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

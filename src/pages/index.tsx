import PostList from '@/components/pages/PostList'
import { PostsDocument, PostsQuery } from '@/generated/graphql'
import { addApolloState, initializeApollo } from '@/lib/apolloClient'
import { allPostsQueryVars } from '@/types/pagination'

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query<PostsQuery>({
    query: PostsDocument,
    variables: allPostsQueryVars,
  })

  return addApolloState(apolloClient, {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 10,
  })
}

export default function IndexPage() {
  return <PostList />
}

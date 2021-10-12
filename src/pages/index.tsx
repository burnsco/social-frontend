import { PostsDocument, PostsQuery } from "@/generated/graphql"
import { initializeApollo } from "@/lib/apolloClient"
import { allPostsQueryVars } from "@/types/pagination"
import dynamic from "next/dynamic"

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query<PostsQuery>({
    query: PostsDocument,
    variables: allPostsQueryVars
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 10
  }
}

const DynamicPostList = dynamic(
  () => import("@/components/pages/PostList/index")
)

export default function IndexPage() {
  return <DynamicPostList />
}

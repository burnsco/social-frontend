import SinglePostPage from '@/components/pages/SinglePost/SingePostPage'
import {
  Post,
  PostDocument,
  PostQuery,
  PostsDocument,
} from '@/generated/graphql'
import { initializeApollo } from '@/lib/apolloClient'
import { GetStaticPaths, GetStaticProps } from 'next'

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
  return <SinglePostPage />
}

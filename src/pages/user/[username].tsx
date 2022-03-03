import { Layout } from '@/components/ui'
import {
  User,
  UsersDocument,
  UsersQuery,
  useUserQuery,
} from '@/generated/graphql'
import { initializeApollo } from '@/lib/apolloClient'
import {
  Box,
  Container,
  Heading,
  List,
  ListItem,
  VisuallyHidden,
} from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: UsersDocument,
  })

  const paths = data.users.map((item: User) => `/user/${item.username}`) || []

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()

  await apolloClient.query<UsersQuery>({
    query: UsersDocument,
    variables: {
      userId: params?.username ?? null,
    },
  })

  return {
    props: {
      userId: params?.username,
    },
    revalidate: 60,
  }
}

export default function AboutUserPage() {
  const router = useRouter()
  const username = router.query.username
  const { data, loading } = useUserQuery({
    variables: { data: { username: username as string } },
  })

  if (loading) return <VisuallyHidden>loading</VisuallyHidden>

  if (data && data.user) {
    return (
      <Layout title={data.user.username || 'user'}>
        <Container>
          <Box
            p={1}
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Heading>User Details</Heading>
            <List>
              <ListItem>{data.user.username} </ListItem>
              <ListItem>{data.user.email} </ListItem>
              <ListItem>{data.user.about} </ListItem>
              <ListItem>{data.user.online} </ListItem>
            </List>
          </Box>
        </Container>
      </Layout>
    )
  }
  return null
}

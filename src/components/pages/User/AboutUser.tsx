import Layout from "@/components/ui/Layout"
import { useUserQuery } from "@/generated/graphql"
import {
  Box,
  Container,
  Heading,
  List,
  ListItem,
  VisuallyHidden
} from "@chakra-ui/react"
import { useRouter } from "next/router"

const AboutUserPage = () => {
  const router = useRouter()
  const username = router.query.username
  const { data, loading } = useUserQuery({
    variables: { data: { username: username as string } }
  })

  if (loading) return <VisuallyHidden>loading</VisuallyHidden>

  if (data && data.user) {
    return (
      <Layout title={data.user.username || "user"}>
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

export default AboutUserPage

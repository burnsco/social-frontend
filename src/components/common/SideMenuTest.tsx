import NextChakraLink from '@/components/common/NextChakraLink'
import { useCategoriesQuery } from '@/generated/graphql'
import {
  Box,
  List,
  ListItem,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function SideMenuTest() {
  const router = useRouter()

  const color = useColorModeValue('gray.700', 'gray.300')
  const hover = useColorModeValue('black', 'white')
  const bg = useColorModeValue('white', '#202020')
  const linkbg = useColorModeValue('#ebedf0', '#3661ed')
  const linkbg2 = useColorModeValue('translucent', 'translucent')

  const { category } = router.query

  const { data, loading } = useCategoriesQuery()

  if (loading) return <VisuallyHidden>loading</VisuallyHidden>

  return (
    <Box
      bg={bg}
      minW="200px"
      borderWidth="1px"
      overflow="hidden"
      boxShadow="xs"
    >
      <Box h="100%" w="100%">
        <List minH="100%" spacing={3} fontSize="md" p={2}>
          {data?.categories?.map((subreddit) => (
            <ListItem key={`subreddit-${subreddit.id}`}>
              <NextChakraLink
                p={1}
                bg={category === subreddit.name ? linkbg : linkbg2}
                fontWeight={category === subreddit.name ? 500 : 400}
                color={category === subreddit.name ? hover : color}
                _hover={{
                  color: hover,
                  bg: linkbg,
                  marginLeft: 1,
                }}
                href="/r/[category]"
                as={`/r/${subreddit.name}`}
              >
                {subreddit.name}
              </NextChakraLink>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}

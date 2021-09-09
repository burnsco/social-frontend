import { NextChakraLink } from "@/components/common/index"
import { useCategoriesLazyQuery } from "@/generated/graphql"
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  Badge,
  Box,
  List,
  ListItem,
  useColorModeValue
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { ImSpinner } from "react-icons/im"

export default function SubredditsAccordion() {
  const bg = useColorModeValue("white", "#202020")
  const router = useRouter()
  const color = useColorModeValue("gray.700", "gray.300")
  const hover = useColorModeValue("black", "white")

  const linkbg = useColorModeValue("#ebedf0", "#3661ed")

  const [
    fetchCategories,
    {
      data: subreddits,
      loading: loadingSubreddits,
      error: subredditsError,
      refetch: refetchCategories
    }
  ] = useCategoriesLazyQuery()

  const { category } = router.query

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const SubredditsCount = () => {
    if (
      subreddits &&
      subreddits.categories &&
      subreddits.categories.length > 0
    ) {
      const count = subreddits.categories.length
      return (
        <Badge ml={1} colorScheme="orange">
          {count}
        </Badge>
      )
    }
    return null
  }

  if (subredditsError) return <Alert>Error loading Subreddits</Alert>

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            CATEGORIES <SubredditsCount />
          </Box>
          {!loadingSubreddits ? <AccordionIcon /> : <ImSpinner />}
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <List mt={2} spacing={3}>
          {subreddits && subreddits.categories ? (
            <>
              {subreddits.categories.map(subreddit => {
                return (
                  <ListItem key={`subreddit-list-${subreddit.id}`}>
                    <NextChakraLink
                      p={1}
                      fontWeight={category === subreddit.name ? "500" : "400"}
                      color={category === subreddit.name ? hover : color}
                      _hover={{
                        borderRadius: 5,
                        color: hover,
                        bg: linkbg,
                        marginLeft: 1
                      }}
                      href="/r/[category]"
                      as={`/r/${subreddit.name}`}
                    >
                      {subreddit.name}
                    </NextChakraLink>
                  </ListItem>
                )
              })}
            </>
          ) : (
            <ListItem>No Subreddits Yet</ListItem>
          )}
        </List>
      </AccordionPanel>
    </AccordionItem>
  )
}

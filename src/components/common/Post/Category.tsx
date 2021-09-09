import { NextChakraLink } from "@/components/common/index"
import { Box } from "@chakra-ui/react"
import { memo } from "react"

type PostCategoryProps = {
  category?: string | null
}

const PostCategory = memo(
  (props: PostCategoryProps) => {
    return (
      <Box
        fontWeight="600"
        color="orange.500"
        _hover={{
          textDecoration: "underline"
        }}
      >
        <NextChakraLink href="/r/[category]" as={`/r/${props.category}`}>
          /r/{props.category}
        </NextChakraLink>
      </Box>
    )
  },
  (prevProps, nextProps) => {
    if (prevProps.category === nextProps.category) {
      return true
    }
    return false
  }
)

export default PostCategory

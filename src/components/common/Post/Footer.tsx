import { Box, Button, Flex, HStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { RiMessage2Fill } from "react-icons/ri"

type PostFooterType = {
  category?: string | null
  id?: string | null
  commentsCount?: number
}

export default function PostFooter({
  category,
  id,
  commentsCount
}: PostFooterType) {
  const router = useRouter()
  return (
    <Flex width="100%" fontSize="sm" fontWeight="500" p={1}>
      <Button size="sm" p={1} variant="ghost" color="#818384" borderRadius={2}>
        <HStack>
          <RiMessage2Fill />
          <Box
            _hover={{ textTransform: "none" }}
            onClick={() => router.push(`/r/${category}/${id}`)}
          >
            {commentsCount} Comments
          </Box>
        </HStack>
      </Button>
    </Flex>
  )
}

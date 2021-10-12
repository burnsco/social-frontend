import { useCreateVoteMutation } from "@/generated/graphql"
import { Flex, IconButton, Text, useColorModeValue } from "@chakra-ui/react"
import { ImArrowDown, ImArrowUp } from "react-icons/im"

type VoteBoxType = {
  postId?: string
  postScore?: number
  isLoggedIn?: boolean
}

export default function VoteBox({
  postId,
  postScore,
  isLoggedIn
}: VoteBoxType) {
  const bg = useColorModeValue("gray.50", "#313131")
  const [vote, { loading }] = useCreateVoteMutation()

  if (postId) {
    return (
      <Flex
        bg={bg}
        width="45px"
        flexDir="column"
        alignItems="center"
        p={1}
        minH="100%"
      >
        <IconButton
          size="md"
          isDisabled={loading || !isLoggedIn}
          onClick={async () => {
            await vote({
              variables: { data: { value: 1, postId: Number(postId) } }
            })
          }}
          variant="ghost"
          color="current"
          aria-label="Up Vote"
          icon={<ImArrowUp />}
        />

        <Text fontSize="md" fontWeight="bold">
          {postScore}
        </Text>
        <IconButton
          size="md"
          isDisabled={loading || !isLoggedIn}
          onClick={async () => {
            await vote({
              variables: { data: { value: -1, postId: Number(postId) } }
            })
          }}
          variant="ghost"
          color="current"
          aria-label="Down Vote"
          icon={<ImArrowDown />}
        />
      </Flex>
    )
  }
  return null
}

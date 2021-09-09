import { Box, Button, Skeleton, Spinner } from "@chakra-ui/react"
import { memo } from "react"

type MoreCommentsProps = {
  loadMoreComments: () => void
  areMoreComments: boolean
  loadingMoreComments: boolean
}

const ShowMoreComments = ({
  loadMoreComments,
  areMoreComments,
  loadingMoreComments
}: MoreCommentsProps) => {
  return (
    <Box m={2}>
      <Skeleton isLoaded={areMoreComments}>
        {areMoreComments && (
          <Button
            variant="outline"
            onClick={() => loadMoreComments()}
            disabled={loadingMoreComments}
          >
            {loadingMoreComments ? <Spinner /> : "Show More"}
          </Button>
        )}
      </Skeleton>
    </Box>
  )
}

export default memo(ShowMoreComments)

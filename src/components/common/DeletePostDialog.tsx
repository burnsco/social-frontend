import { useDeletePostMutation } from "@/generated/graphql"
import { sleep } from "@/utils/sleepy"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  chakra,
  IconButton,
  Tooltip
} from "@chakra-ui/react"
import { useRef, useState } from "react"
import { AiFillDelete } from "react-icons/ai"

type DeletePostProps = {
  postId?: string | null | undefined
}

export default function DeletePostDialog({ postId }: DeletePostProps) {
  const [deletePost] = useDeletePostMutation()
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef<null | HTMLButtonElement>(null)

  if (postId) {
    return (
      <>
        <Tooltip
          hasArrow
          label="Delete Post"
          fontSize="md"
          bg="black"
          color="whitesmoke"
        >
          <chakra.span>
            <IconButton
              onClick={() => setIsOpen(true)}
              size="xs"
              aria-label="Delete Post"
              icon={<AiFillDelete />}
            />
          </chakra.span>
        </Tooltip>

        <AlertDialog
          returnFocusOnClose={false}
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader
                color="red.400"
                fontSize="lg"
                fontWeight="bold"
              >
                Delete Post
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You cannot undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={async () => {
                    sleep(1000)
                    await deletePost({
                      variables: {
                        postId: Number(postId)
                      },
                      update(cache, { data }) {
                        if (data?.deletePost) {
                          cache.modify({
                            fields: {
                              posts(existingPostRefs, { readField }) {
                                return existingPostRefs.filter(
                                  (postRef: any) =>
                                    data.deletePost.post?.id !==
                                    readField("id", postRef)
                                )
                              }
                            }
                          })
                        }
                        return null
                      }
                    })
                    onClose()
                  }}
                  colorScheme="red"
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }
  return null
}

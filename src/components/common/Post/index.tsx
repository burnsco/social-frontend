import { PostQuery } from "@/generated/graphql"
import { useLoggedInUser } from "@/hooks/useLoggedInUser"
import { Alert, Flex, useColorModeValue } from "@chakra-ui/react"
import PostBody from "./Body"
import PostContainer from "./Container"
import PostFooter from "./Footer"
import PostHeader from "./Header"
import VoteBox from "./VoteBox"

export default function NewPost(props: PostQuery) {
  const bg = useColorModeValue("white", "#202020")
  const [loggedInUser] = useLoggedInUser()

  if (props.post) {
    const { post } = props

    const postId = post?.id
    const postScore = post?.totalVotes?.score ?? 0
    const postCategory = post?.category.name
    const categoryId = post?.category.id
    const postAuthor = post?.author
    const postCreatedTime = post?.createdAt
    const postUpdatedTime = post?.updatedAt
    const postTitle = post?.title
    const postText = post?.text
    const postImage = post?.image
    const postImageH = post?.imageH
    const postImageW = post?.imageW
    const postLink = post?.link
    const postCommentsCount = post?.totalComments?.count ?? 0
    const isOwner = loggedInUser?.id === post?.author.id ?? false
    const isLoggedIn = loggedInUser !== null

    return (
      <PostContainer bg={bg}>
        <VoteBox
          postId={postId}
          postScore={postScore}
          isLoggedIn={isLoggedIn}
        />
        <Flex minH="160px" width="100%" flexDir="column" ml={3}>
          {isOwner ? (
            <>
              <PostHeader
                postId={postId}
                author={postAuthor}
                createdAt={postCreatedTime}
                updatedAt={postUpdatedTime}
                category={postCategory}
              />
              <PostBody
                postId={postId}
                imageW={postImageW}
                imageH={postImageH}
                categoryId={categoryId}
                image={postImage}
                title={postTitle}
                text={postText}
                link={postLink}
              />
            </>
          ) : (
            <>
              <PostHeader
                author={postAuthor}
                createdAt={postCreatedTime}
                updatedAt={postUpdatedTime}
                category={postCategory}
              />

              <PostBody
                image={postImage}
                title={postTitle}
                imageW={postImageW}
                imageH={postImageH}
                text={postText}
                link={postLink}
              />
            </>
          )}

          <PostFooter
            category={postCategory}
            id={postId}
            commentsCount={postCommentsCount}
          />
        </Flex>
      </PostContainer>
    )
  }
  return <Alert>Post Not Found</Alert>
}

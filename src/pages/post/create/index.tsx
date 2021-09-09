import dynamic from "next/dynamic"

const DynamicCreatePostPage = dynamic(
  () => import("@/components/pages/CreatePost/index")
)

const CreatePostPage = () => <DynamicCreatePostPage />

export default CreatePostPage

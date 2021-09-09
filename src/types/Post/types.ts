import { CreatePostInput } from "@/generated/graphql"

export const CreatePostInputType: CreatePostInput = {
  categoryId: 0,
  title: "",
  text: "",
  link: "",
  image: "",
  imageW: "",
  imageH: ""
}

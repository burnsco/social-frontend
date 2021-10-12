import Layout from "@/components/ui/Layout"
import CategoryPosts from "./Category"

export default function CategoryPostListContainer({ title = "reddit" }) {
  return (
    <Layout title={title}>
      <CategoryPosts />
    </Layout>
  )
}

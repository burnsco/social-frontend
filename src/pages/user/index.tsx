import dynamic from "next/dynamic"

const DynamicUserPage = dynamic(() => import("@/components/pages/Me/Me"))

export default function UserPage() {
  return <DynamicUserPage />
}

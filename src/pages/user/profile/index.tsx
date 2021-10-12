import dynamic from "next/dynamic"

const DynamicProfilePage = dynamic(
  () => import("@/components/pages/Profile/Profile")
)

const ProfilePage = () => <DynamicProfilePage />

export default ProfilePage

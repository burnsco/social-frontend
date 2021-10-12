import dynamic from "next/dynamic"

const DynamicRegisterPage = dynamic(
  () => import("@/components/pages/Register/Register")
)

const RegisterPage = () => <DynamicRegisterPage />

export default RegisterPage

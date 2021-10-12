import dynamic from "next/dynamic"

const DynamicLoginPage = dynamic(() => import("@/components/pages/Login/Login"))

const RegisterPage = () => <DynamicLoginPage />

export default RegisterPage

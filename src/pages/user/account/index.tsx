import dynamic from 'next/dynamic'

const DynamicAccountPage = dynamic(
  () => import('@/components/pages/Account/Account')
)

export default function AccountPage() {
  return <DynamicAccountPage />
}

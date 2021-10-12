import Logo2 from "@/components/common/Logo2"
import { Flex } from "@chakra-ui/react"
import { useRouter } from "next/router"

const LogoSection = () => {
  const router = useRouter()

  return (
    <Flex
      aria-label="Home Header Link"
      align="center"
      h="full"
      p="0.5"
      flexGrow={1}
      display={{ base: "flex" }}
    >
      <Flex cursor="pointer" align="center" onClick={() => router.push("/")}>
        <Logo2 />
      </Flex>
    </Flex>
  )
}

export default LogoSection

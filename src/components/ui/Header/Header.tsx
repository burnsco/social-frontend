import { ThemedContainer } from "@/components/common/ThemedContainer"
import useNewUserNotification from "@/hooks/useNewUserNotify"
import {
  Badge,
  chakra,
  Flex,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
  useSafeLayoutEffect,
  useToast
} from "@chakra-ui/react"
import React from "react"
import { FaMoon, FaSun } from "react-icons/fa"
import NavSection from "./Center"
import LogoSection from "./Left"
import MenuIconsSection from "./Right"

const HeaderContent = () => {
  const { toggleColorMode: toggleMode } = useColorMode()
  const text = useColorModeValue("dark", "light")
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <Flex w="100%" h="100%" px="4" align="center" justify="space-around">
      <LogoSection />
      <NavSection />
      <MenuIconsSection />
      <IconButton
        size="md"
        fontSize="lg"
        aria-label={`Switch to ${text} mode`}
        variant="ghost"
        color="current"
        onClick={toggleMode}
        icon={<SwitchIcon />}
      />
    </Flex>
  )
}

const Header = () => {
  const headerBG = useColorModeValue("white", "#202020")
  const headerShadow = useColorModeValue("md", "dark-lg")
  const colorScheme = useColorModeValue("green", "orange")
  const toast = useToast()
  const newUser = useNewUserNotification()

  useSafeLayoutEffect(() => {
    if (newUser) {
      toast({
        position: "bottom-left",
        render: () => (
          <ThemedContainer p={4}>
            <Badge colorScheme={colorScheme} variant="solid" p={1}>
              {newUser}
            </Badge>{" "}
            <Text as="em" color="gray.50">
              Has just joined the community!
            </Text>
          </ThemedContainer>
        )
      })
    }
  }, [newUser])

  return (
    <chakra.nav
      pos="fixed"
      zIndex="1000"
      height="3.5rem"
      maxW="1400px"
      bg={headerBG}
      boxShadow={headerShadow}
      width="full"
    >
      <HeaderContent />
    </chakra.nav>
  )
}

export default Header

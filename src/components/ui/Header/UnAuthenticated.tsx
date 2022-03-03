import LoginDrawer from '@/components/common/Drawers/Login'
import RegisterDrawer from '@/components/common/Drawers/Register'
import Logo from '@/components/common/Logo'
import NavigationMenu from '@/components/common/NavigationMenu'
import {
  Flex,
  IconButton,
  Spacer,
  Stack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FaMoon, FaSun } from 'react-icons/fa'

function LogoSection() {
  const router = useRouter()

  return (
    <Flex
      aria-label="Home Header Link"
      align="center"
      h="full"
      p="0.5"
      flexGrow={1}
      display={{ base: 'flex' }}
    >
      <Flex cursor="pointer" align="center" onClick={() => router.push('/')}>
        <Logo />
      </Flex>
    </Flex>
  )
}

export default function UnAuthenticatedHeader() {
  const { toggleColorMode: toggleMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  return (
    <Flex w="100%" h="100%" px="4" align="center" justify="space-around">
      <LogoSection />
      <Spacer />
      <NavigationMenu />
      <Stack spacing={4} mr={2} direction="row">
        <RegisterDrawer />

        <LoginDrawer />
      </Stack>
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

import AddFriendPopOver from '@/components/common/AddFriendPopOver'
import Logo from '@/components/common/Logo'
import NavigationMenu from '@/components/common/NavigationMenu'
import { ThemedContainer } from '@/components/common/ThemedContainer'
import { useLogoutMutation, useMeQuery } from '@/generated/graphql'
import useNewUserNotification from '@/hooks/useNewUserNotify'
import {
  Avatar,
  Badge,
  Box,
  ButtonGroup,
  chakra,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useSafeLayoutEffect,
  useToast,
  VisuallyHidden,
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { AiOutlineLogout } from 'react-icons/ai'
import { FaMoon, FaSun, FaUserCircle } from 'react-icons/fa'
import { MdSettings } from 'react-icons/md'

const DynamicChatRoomDrawer = dynamic(
  () => import('@/components/common/Drawers/Chat')
)

const DynamicRegisterDrawer = dynamic(
  () => import('@/components/common/Drawers/Register')
)

const DynamicLoginDrawer = dynamic(
  () => import('@/components/common/Drawers/Login')
)

const DynamicCreateCategoryDrawer = dynamic(
  () => import('@/components/common/Drawers/CreateSubreddit')
)

const DynamicCreatePostDrawer = dynamic(
  () => import('@/components/common/Drawers/CreatePost')
)

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

function HeaderIconsSection() {
  const router = useRouter()
  const bg = useColorModeValue('white', '#202020')
  const { data, loading } = useMeQuery({ ssr: false })
  const [logout, { client }] = useLogoutMutation()

  if (loading) return <VisuallyHidden>Loading Header</VisuallyHidden>

  if (data && data?.me?.username && !loading) {
    return (
      <HStack>
        <ButtonGroup spacing="4" mr="2">
          <DynamicChatRoomDrawer />
          <DynamicCreatePostDrawer />
          <DynamicCreateCategoryDrawer />
          <AddFriendPopOver />
        </ButtonGroup>

        <Menu isLazy>
          <IconButton
            as={MenuButton}
            variant="ghost"
            aria-label="Create a Subreddit"
            icon={
              <Avatar
                size="xs"
                name="Ryan Florence"
                src={data?.me.avatar || 'https://bit.ly/ryan-florence'}
              />
            }
            size="md"
          />

          <MenuList opacity="0.7" bg={bg}>
            <MenuGroup title={data.me.username} color="lightsteelblue">
              <MenuDivider />
              <MenuItem onClick={() => router.push('/user')}>
                <FaUserCircle />
                <Box ml={3}>Profile</Box>
              </MenuItem>
              <MenuItem onClick={() => router.push('/user/account')}>
                <MdSettings />
                <Box ml={3}>Account</Box>
              </MenuItem>
              <MenuItem onClick={() => router.push('/user/account')}>
                <MdSettings />
                <Box ml={3}>Friends</Box>
              </MenuItem>
              <MenuItem onClick={() => router.push('/user/account')}>
                <MdSettings />
                <Box ml={3}>Messages</Box>
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup>
              <MenuItem
                mr={2}
                onClick={async () => {
                  await logout()
                  await client.resetStore()
                  await router.push('/')
                }}
              >
                <AiOutlineLogout />
                <Box ml={3}>Logout</Box>
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </HStack>
    )
  }
  return (
    <Stack spacing={4} mr={2} direction="row" align="center">
      <DynamicRegisterDrawer />
      <DynamicLoginDrawer />
    </Stack>
  )
}

function HeaderContent() {
  const { toggleColorMode: toggleMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <Flex w="100%" h="100%" px="4" align="center" justify="space-around">
      <LogoSection />
      <NavigationMenu />
      <HeaderIconsSection />
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

function Header() {
  const headerBG = useColorModeValue('white', '#202020')
  const headerShadow = useColorModeValue('md', 'dark-lg')
  const colorScheme = useColorModeValue('green', 'orange')
  const toast = useToast()
  const newUser = useNewUserNotification()

  useSafeLayoutEffect(() => {
    if (newUser) {
      toast({
        position: 'bottom-left',
        render: () => (
          <ThemedContainer p={4}>
            <Badge colorScheme={colorScheme} variant="solid" p={1}>
              {newUser}
            </Badge>{' '}
            <Text as="em" color="gray.50">
              Has just joined the community!
            </Text>
          </ThemedContainer>
        ),
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

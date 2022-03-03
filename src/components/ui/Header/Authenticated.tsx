import Logo from '@/components/common/Logo'
import NavigationMenu from '@/components/common/NavigationMenu'
import { useLogoutMutation } from '@/generated/graphql'
import { useLoggedInUser } from '@/hooks/useLoggedInUser'
import {
  Avatar,
  Box,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { AiOutlineLogout } from 'react-icons/ai'
import { FaMoon, FaSun, FaUserCircle } from 'react-icons/fa'
import { MdSettings } from 'react-icons/md'

const DynamicChatRoomDrawer = dynamic(
  () => import('@/components/common/Drawers/Chat')
)

const DynamicCreateCategoryDrawer = dynamic(
  () => import('@/components/common/Drawers/CreateSubreddit')
)

const DynamicCreatePostDrawer = dynamic(
  () => import('@/components/common/Drawers/CreatePost')
)

const DynamicAddFriendDrawer = dynamic(
  () => import('@/components/common/Drawers/AddFriendDrawer')
)

export function LogoSection() {
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
  const [loggedInUser] = useLoggedInUser()
  const bg = useColorModeValue('white', '#202020')

  const [logout, { client }] = useLogoutMutation()
  return (
    <HStack>
      <ButtonGroup spacing="4" mr="2">
        <DynamicChatRoomDrawer />
        <DynamicCreatePostDrawer />
        <DynamicCreateCategoryDrawer />
        <DynamicAddFriendDrawer />
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
              src={loggedInUser?.avatar || 'https://bit.ly/ryan-florence'}
            />
          }
          size="md"
        />

        <MenuList opacity="0.7" bg={bg}>
          <MenuGroup title={loggedInUser?.username} color="lightsteelblue">
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

export default function AuthenticatedHeader() {
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
        ml="3"
        aria-label={`Switch to ${text} mode`}
        variant="ghost"
        color="current"
        onClick={toggleMode}
        icon={<SwitchIcon />}
      />
    </Flex>
  )
}

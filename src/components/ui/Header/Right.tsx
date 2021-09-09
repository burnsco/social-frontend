import { useLogoutMutation, useMeQuery } from "@/generated/graphql"
import {
  Avatar,
  Box,
  ButtonGroup,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  useColorModeValue,
  VisuallyHidden
} from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { AiOutlineLogout } from "react-icons/ai"
import { FaUserCircle } from "react-icons/fa"
import { MdSettings } from "react-icons/md"
import AddFriendPopOver from "../../common/AddFriendPopOver"

const DynamicChatRoomDrawer = dynamic(
  () => import("@/components/common/Drawers/Chat"),
  { ssr: false }
)

const DynamicRegisterDrawer = dynamic(
  () => import("@/components/common/Drawers/Register"),
  { ssr: false }
)

const DynamicLoginDrawer = dynamic(
  () => import("@/components/common/Drawers/Login"),
  {
    ssr: false
  }
)

const DynamicCreateCategoryDrawer = dynamic(
  () => import("@/components/common/Drawers/CreateSubreddit"),
  { ssr: false }
)
const DynamicCreatePostDrawer = dynamic(
  () => import("@/components/common/Drawers/CreatePost"),
  { ssr: false }
)

const DynamicAddFriendDrawer = dynamic(
  () => import("@/components/common/Drawers/AddFriend"),
  { ssr: false }
)

export default function HeaderMenu() {
  const router = useRouter()
  const bg = useColorModeValue("white", "#202020")
  const { data, loading } = useMeQuery({ ssr: false })
  const [logout, { client }] = useLogoutMutation()

  if (loading) return <VisuallyHidden>Loading Header</VisuallyHidden>

  if (data && data?.me?.username && !loading) {
    return (
      <HStack spacing={2}>
        <ButtonGroup spacing="4">
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
                src={data?.me.avatar || "https://bit.ly/ryan-florence"}
              />
            }
            size="md"
          />

          <MenuList opacity="0.7" bg={bg}>
            <MenuGroup title={data.me.username} color="lightsteelblue">
              <MenuDivider />
              <MenuItem onClick={() => router.push("/user")}>
                <FaUserCircle />
                <Box ml={3}>Profile</Box>
              </MenuItem>
              <MenuItem onClick={() => router.push("/user/account")}>
                <MdSettings />
                <Box ml={3}>Account</Box>
              </MenuItem>
              <MenuItem onClick={() => router.push("/user/account")}>
                <MdSettings />
                <Box ml={3}>Friends</Box>
              </MenuItem>
              <MenuItem onClick={() => router.push("/user/account")}>
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
                  await router.push("/")
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
    <Stack spacing={4} mr={1} direction="row" align="center">
      <DynamicRegisterDrawer />
      <DynamicLoginDrawer />
    </Stack>
  )
}

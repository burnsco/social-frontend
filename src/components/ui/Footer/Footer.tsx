import MessageUser from "@/components/common/MessageUser"
import { OfflineCircle, OnlineCircle } from "@/components/common/OnlineOffline"
import MessageInput from "@/components/ui/Footer/MessageInput"
import { useMyFriendsLazyQuery, User } from "@/generated/graphql"
import {
  Avatar,
  Badge,
  Button,
  chakra,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useColorModeValue
} from "@chakra-ui/react"
import { useEffect } from "react"
import { FaUserFriends } from "react-icons/fa"
import { ImSpinner } from "react-icons/im"

// create apollo variables for each chat room (chat user session) ?
// create a subscription to a chat with each friend (much like chat)
// or just show them if they have a messag length of > 0

export default function Footer() {
  const bg = useColorModeValue("white", "#202020")

  const [fetchFriends, { data, loading, refetch }] = useMyFriendsLazyQuery({
    ssr: false
  })

  useEffect(() => fetchFriends(), [fetchFriends])

  const FriendsCount = () => {
    if (data && data.myFriends && data.myFriends.length > 0) {
      const onlineFriends = data.myFriends.map(
        (friend: Partial<User>) => friend.online
      ).length

      return (
        <Badge mr={2} colorScheme="green">
          {onlineFriends}
        </Badge>
      )
    }
    return null
  }

  const FriendsMenu = () => (
    <>
      {data && data.myFriends && refetch ? (
        <Menu>
          <MenuButton
            onClick={() => refetch()}
            as={Button}
            rightIcon={!loading ? <FaUserFriends /> : <ImSpinner />}
          >
            <FriendsCount />
            FRIENDS
          </MenuButton>
          <MenuList>
            {data &&
              data.myFriends &&
              data.myFriends.map((user: Partial<User>) => (
                <MenuItem key={`friend-${user.id}`}>
                  <Avatar
                    size="xs"
                    name="Ryan Florence"
                    src="https://bit.ly/ryan-florence"
                    mr={3}
                  />
                  {user.username} {user && <MessageUser {...user} />}
                  {user.online ? <OnlineCircle /> : <OfflineCircle />}
                </MenuItem>
              ))}
          </MenuList>
        </Menu>
      ) : (
        <Heading>No Friends</Heading>
      )}
    </>
  )

  const ChatMenu = () => (
    <>
      {data && data.myFriends && refetch ? (
        <Menu>
          <MenuButton
            onClick={() => refetch()}
            as={Button}
            rightIcon={!loading ? <FaUserFriends /> : <ImSpinner />}
          >
            <FriendsCount />
            FRIENDS
          </MenuButton>
          <MenuList>
            {data.myFriends.map((user: any) => (
              <MenuItem key={`friend-${user.id}`}>
                <Avatar
                  size="xs"
                  name="Ryan Florence"
                  src="https://bit.ly/ryan-florence"
                  mr={3}
                />
                {user.username} {user && <MessageUser {...user} />}
                {user.online ? <OnlineCircle /> : <OfflineCircle />}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      ) : (
        <Heading>No Friends</Heading>
      )}
    </>
  )

  const FooterContent = () => (
    <Flex w="100%" h="100%">
      {data &&
        data.myFriends &&
        data.myFriends.map((user: Partial<User>) => (
          <Menu key={`friends chat list-${user.username}`}>
            <MenuButton
              onClick={() => {
                if (refetch !== undefined) refetch()
              }}
              as={Button}
              rightIcon={!loading ? <FaUserFriends /> : <ImSpinner />}
            >
              {user.username}
            </MenuButton>
            {/* make a graphql query using each friend (userId) */}
            {/* same concept as Chat, but with users instead of category */}
            <MenuList minH="300px" minW="280px" display="flex" flexDir="column">
              {data &&
                data.myFriends &&
                data.myFriends.map((user: Partial<User>) => (
                  <MenuItem key={`friend-${user.id}`}>
                    <Avatar
                      size="xs"
                      name="Ryan Florence"
                      src="https://bit.ly/ryan-florence"
                      mr={3}
                    />
                    {user.username} {user && <MessageUser {...user} />}
                    {user.online ? <OnlineCircle /> : <OfflineCircle />}
                  </MenuItem>
                ))}
              <MenuItem>
                <MessageInput />
              </MenuItem>
            </MenuList>
          </Menu>
        ))}
      <Spacer />
      <FriendsMenu />
    </Flex>
  )

  return (
    <chakra.header
      pos="fixed"
      bottom="0"
      zIndex="1"
      bg={bg}
      left="0"
      right="0"
      width="full"
    >
      <chakra.div height="2.5rem" mx="auto" maxW="1200px" px={1}>
        <FooterContent />
      </chakra.div>
    </chakra.header>
  )
}

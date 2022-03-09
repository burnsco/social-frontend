import MessageUser from '@/components/common/MessageUser'
import { OfflineCircle, OnlineCircle } from '@/components/common/OnlineOffline'
import { useMyFriendsQuery } from '@/generated/graphql'
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
  useColorModeValue,
} from '@chakra-ui/react'
import { FaUserFriends } from 'react-icons/fa'
import { ImSpinner } from 'react-icons/im'

export default function Footer() {
  const bg = useColorModeValue('white', '#202020')

  const { data, loading, refetch } = useMyFriendsQuery({
    ssr: false,
  })

  const FriendsCount = () => {
    if (data && data.myFriends && data.myFriends.length > 0) {
      const onlineFriends = data.myFriends.map((friend) => friend.online).length

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
      {data?.myFriends ? (
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
            {data.myFriends.map((user) => (
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
      {data?.myFriends ? (
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
            {data.myFriends.map((user) => (
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
      <ChatMenu />
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

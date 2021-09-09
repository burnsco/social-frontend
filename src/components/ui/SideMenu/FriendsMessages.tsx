import MessageUser from "@/components/common/MessageUser"
import { useMyFriendsAndMessagesLazyQuery } from "@/generated/graphql"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Badge,
  Box,
  chakra,
  Input,
  List,
  ListItem
} from "@chakra-ui/react"
import React, { useEffect } from "react"
import { ImSpinner } from "react-icons/im"

const OnlineCircle = () => (
  <chakra.span
    h="10px"
    w="10px"
    ml={2}
    bgColor="green.400"
    borderRadius="50%"
    display="inline-block"
  />
)

const OfflineCircle = () => (
  <chakra.span
    h="10px"
    w="10px"
    ml={2}
    bgColor="red.400"
    borderRadius="50%"
    display="inline-block"
  />
)

export default function FriendsAndMessagesAccordion() {
  const [
    fetchFriendsAndMessages,
    { data, loading, refetch: refetchFriendsAndMessages }
  ] = useMyFriendsAndMessagesLazyQuery()

  useEffect(() => {
    fetchFriendsAndMessages()
  }, [fetchFriendsAndMessages])

  const FriendsCount = () => {
    if (data && data.me && data.me.friends.length > 0) {
      const onlineFriends = data.me.friends.map(friend => friend.online).length

      return (
        <Badge ml={1} colorScheme="green">
          {onlineFriends}
        </Badge>
      )
    }
    return null
  }

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            FRIENDS <FriendsCount />
          </Box>
          {!loading ? <AccordionIcon /> : <ImSpinner />}
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Accordion allowToggle>
          <List mt={2} spacing={3}>
            {data && data.me ? (
              <>
                {data.me.friends.map(user => (
                  <AccordionItem color="" key={`friends-list-${user.username}`}>
                    <AccordionButton
                      _expanded={{ bg: "lightgrey", borderRadius: 5 }}
                    >
                      <ListItem>
                        <Box flex="1" textAlign="left">
                          {user.username} {user && <MessageUser {...user} />}
                          {user.online ? <OnlineCircle /> : <OfflineCircle />}
                          <AccordionIcon ml={3} />
                        </Box>
                      </ListItem>
                    </AccordionButton>
                    <AccordionPanel pb={2}>
                      <List mt={2} spacing={3}>
                        {data && data.me && data.me.privateMessages ? (
                          <>
                            {data.me.privateMessages.map(message => {
                              if (
                                (message.sentBy.username ||
                                  message.sentTo.username) ===
                                data?.me?.username
                              )
                                return (
                                  <ListItem key={`messages-list-${message.id}`}>
                                    <Avatar
                                      size="xs"
                                      name="Ryan Florence"
                                      src="https://bit.ly/ryan-florence"
                                      mr={3}
                                    />
                                    {message.body}
                                  </ListItem>
                                )

                              return (
                                <ListItem key={`messages-list-${message.id}`}>
                                  {message.body}
                                  <Avatar
                                    size="xs"
                                    name="Ryan Florence"
                                    src="https://bit.ly/ryan-florence"
                                    ml={1}
                                  />
                                </ListItem>
                              )
                            })}
                          </>
                        ) : (
                          <ListItem>No Friends Yet</ListItem>
                        )}
                        <ListItem>
                          <Input placeholder="Type your message" />
                        </ListItem>
                      </List>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </>
            ) : (
              <ListItem>No Friends Yet</ListItem>
            )}
          </List>
        </Accordion>
      </AccordionPanel>
    </AccordionItem>
  )
}

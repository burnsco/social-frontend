import { NextChakraLink } from "@/components/common/index"
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  List,
  ListItem,
  Skeleton,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react"
import { useRef, useState } from "react"
import { ImArrowDown, ImArrowRight } from "react-icons/im"
import { useCategoriesQuery } from "../../../generated/graphql"

export default function NavigationDrawer() {
  const [input, setInput] = useState("")
  const bg = useColorModeValue("translucent", "translucent")
  const color = useColorModeValue("gray.700", "gray.300")
  const hoverColor = useColorModeValue("black", "white")
  const hoverBG = useColorModeValue("#ebedf0", "#3661ed")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const drawerContentBG = useColorModeValue("whitesmoke", "gray.900")
  const { loading, data } = useCategoriesQuery()

  const btnRef = useRef<HTMLButtonElement | null>(null)

  return (
    <Box border="2px solid orange">
      <Button
        colorScheme="blue"
        size="md"
        flexGrow={2}
        ref={btnRef}
        onClick={onOpen}
        leftIcon={isOpen ? <ImArrowRight /> : <ImArrowDown />}
      >
        NAVIGATION
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={drawerContentBG}>
          <DrawerCloseButton />
          <DrawerHeader>Search Subreddits</DrawerHeader>
          <DrawerBody>
            <Input
              mb={2}
              placeholder="Search subreddits"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <Skeleton isLoaded={!loading}>
              <List>
                {data && data.categories
                  ? data.categories
                      .filter(c =>
                        c.name.toLowerCase().includes(input.toLowerCase())
                      )
                      .map(cat => (
                        <ListItem p={1} key={`sideNav-${cat.name}-${cat.id}`}>
                          <NextChakraLink
                            p={1}
                            bg={bg}
                            fontWeight="400"
                            color={color}
                            _hover={{
                              color: hoverColor,
                              bg: hoverBG,
                              marginLeft: 1
                            }}
                            href="/r/[category]"
                            as={`/r/${cat.name}`}
                          >
                            {cat.name}
                          </NextChakraLink>
                        </ListItem>
                      ))
                  : null}
              </List>
            </Skeleton>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

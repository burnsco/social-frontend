import { useCategoriesLazyQuery } from "@/generated/graphql"
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { BsArrowDown, BsArrowLeft } from "react-icons/bs"
import { FaHome } from "react-icons/fa"

export default function NavigationMenu() {
  const router = useRouter()

  const [fetchCategories, { loading, data }] = useCategoriesLazyQuery()

  useEffect(() => fetchCategories(), [fetchCategories])

  const bg = useColorModeValue("white", "#202020")

  const renderPath = () => {
    if (router && router.pathname) {
      if (router.pathname === "/") {
        return "Home"
      } else if (!router.query.category) {
        return `${router.asPath}`
      } else {
        return `${router.query.category}`
      }
    }
    return "Home"
  }

  const NavigationDisplay = () => (
    <Flex flexGrow={2} mr={1}>
      <Menu closeOnSelect={true} matchWidth>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              mr={4}
              maxW="280px"
              fontSize="sm"
              textAlign="left"
              w="full"
              leftIcon={<FaHome />}
              rightIcon={isOpen ? <BsArrowDown /> : <BsArrowLeft />}
              variant="outline"
            >
              {renderPath()}
            </MenuButton>
            {data && data.categories && (
              <MenuList minWidth="240px" opacity="0.7" bg={bg}>
                {data.categories.map((item, i) => (
                  <MenuItem
                    value={item.name}
                    key={`subreddit-center-menu-${item.id}-${i}`}
                    onClick={() => router.push(`/r/${item.name}`)}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </MenuList>
            )}
          </>
        )}
      </Menu>
    </Flex>
  )

  if (!loading) {
    return <NavigationDisplay />
  }
  return null
}

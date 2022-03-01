import { Box, useColorModeValue } from '@chakra-ui/react'
import AuthorizedSideMenu from './Auth'

export default function SideMenuContainer() {
  const bg = useColorModeValue('white', '#202020')

  return (
    <>
      <Box borderRadius="sm" bg={bg} minW="200px" maxW="300px" boxShadow="xs">
        <AuthorizedSideMenu />
      </Box>
    </>
  )
}

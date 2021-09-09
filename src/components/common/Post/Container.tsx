import { Box, useColorModeValue } from "@chakra-ui/react"

const PostContainer: React.FC<{ children: React.ReactNode; bg: string }> = ({
  children,
  bg
}): JSX.Element => {
  const bc = useColorModeValue("gray.100", "#313131")
  const hoverbc = useColorModeValue("gray.200", "gray.600")
  return (
    <Box
      boxShadow="sm"
      bg={bg}
      borderWidth="1px"
      overflow="hidden"
      display="flex"
      borderColor={bc}
      minH="160px"
      width="100%"
      maxH="800px"
      _hover={{
        boxShadow: "md",
        borderWidth: "1px",
        borderColor: hoverbc
      }}
    >
      {children}
    </Box>
  )
}

export default PostContainer

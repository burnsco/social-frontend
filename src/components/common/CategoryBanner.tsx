import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Flex,
  useColorModeValue
} from "@chakra-ui/react"
import React from "react"

export default function CategoryBanner() {
  const Title = () => <Box>title</Box>
  const Path = () => <Box>path</Box>
  const Join = () => <Button>join</Button>

  const bc = useColorModeValue("gray.100", "#313131")

  return (
    <Flex
      mt="3.5rem"
      w="full"
      borderWidth="1px"
      justifyContent="space-around"
      overflow="hidden"
      borderColor={bc}
      h="4rem"
    >
      <Center
        p={2}
        overflow="hidden"
        display="flex"
        borderColor={bc}
        h="full"
        alignItems="flex-end"
      >
        <Avatar src="https://styles.redditmedia.com/t5_2q5yp2/styles/communityIcon_659qryrpm0i61.png?width=256&s=e3b60b0ba31c83c45877255ccae16dec5b601517" />
        <Title />
        <Path />
        <Join />
      </Center>
      <Center
        overflow="hidden"
        display="flex"
        borderColor={bc}
        h="full"
        alignItems="flex-end"
      >
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            6 beds &bull; 2 baths
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          react
        </Box>

        <Box>
          600
          <Box as="span" color="gray.600" fontSize="sm">
            / wk
          </Box>
        </Box>

        <Box d="flex" mt="2" alignItems="center">
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            6 reviews
          </Box>
        </Box>
      </Center>
    </Flex>
  )
}

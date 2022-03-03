import { Flex, FlexProps, useColorMode } from '@chakra-ui/react'

export const ThemedContainer = (props: FlexProps) => {
  const { colorMode } = useColorMode()

  const bgColor = {
    light: `blue.500`,
    dark: `blue.400`,
  }
  const bgShadow = { light: 'md', dark: 'dark-lg' }

  return (
    <Flex
      borderRadius="md"
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      color="white"
      bg={bgColor[colorMode]}
      boxShadow={bgShadow[colorMode]}
      {...props}
    />
  )
}

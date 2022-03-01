import { Flex, FlexProps, useColorMode } from '@chakra-ui/react'

export const ThemedContainer = (props: FlexProps) => {
  const { colorMode } = useColorMode()

  const bgColor = {
    light: `linear-gradient(to bottom right, #B0DB7D 40%, #99DBB4 100%)`,
    dark: `linear-gradient(to bottom right, #EF8D9C 40%,  #FFC39E 100%)`,
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

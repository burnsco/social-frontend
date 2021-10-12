import theme from "@/styles/theme"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"

interface ChakraProps {
  children: React.ReactNode
}

const Chakra = ({ children }: ChakraProps) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeScript initialColorMode="dark" />
      {children}
    </ChakraProvider>
  )
}

export default Chakra

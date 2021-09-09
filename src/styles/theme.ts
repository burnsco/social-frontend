import { extendTheme } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

const customTheme = extendTheme({
  useSystemColorMode: true,
  initialColorMode: "dark",
  styles: {
    global: props => ({
      html: {
        width: "100%",
        height: "100%",
        fontSize: { base: "xs", sm: "sm" },
        color: mode("gray.700", "whiteAlpha.900")(props),
        background: mode("white", "#1A1A1B")(props)
      },
      body: {
        width: "100%",
        overflow: "hidden",
        minHeight: "100vh",
        fontSize: { base: "sm", sm: "md" },
        color: mode("gray.700", "whiteAlpha.900")(props),
        background: mode("gray.200", "#1A1A1B")(props)
      }
    })
  }
})

export default customTheme

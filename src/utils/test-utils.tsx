import { ChakraProvider } from "@chakra-ui/react"
import theme from "@chakra-ui/theme"
import { render, RenderOptions } from "@testing-library/react"
import * as React from "react"
export * from "@testing-library/react"
// override render method
export { customRender as render }

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <ChakraProvider resetCSS theme={theme}>
    {children}
  </ChakraProvider>
)

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options })

export default customRender

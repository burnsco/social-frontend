import { Box } from "@chakra-ui/react"
interface VariantProps {
  variant: "small" | "regular"
  children: React.ReactNode
}

export const Wrapper: React.FC<VariantProps> = ({
  children,
  variant = "regular"
}) => {
  return (
    <Box
      mt={8}
      mx="auto"
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
    >
      {children}
    </Box>
  )
}

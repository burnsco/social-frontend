import { ChakraField } from "@/components/common/index"
import { TabPanel } from "@chakra-ui/react"
import { FC } from "react"

export const PannelWrapper: FC<{ children: React.ReactNode }> = ({
  children
}) => (
  <TabPanel>
    <ChakraField
      label=""
      id="title"
      name="title"
      placeholder="title"
      aria-placeholder="Post Title"
    />
    {children}
  </TabPanel>
)

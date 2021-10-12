import { ChakraField } from "@/components/common/index"
import { PannelWrapper } from "./PanelWrapper"

export const RegularPost = () => (
  <PannelWrapper>
    <ChakraField
      label=""
      id="text"
      placeholder="text"
      aria-placeholder="post Text"
      name="text"
    />
  </PannelWrapper>
)

export const LinkPost = () => (
  <PannelWrapper>
    <ChakraField
      label=""
      id="link"
      name="link"
      placeholder="link"
      aria-placeholder="Post Link"
    />
  </PannelWrapper>
)

export const MediaPost = () => (
  <PannelWrapper>
    <ChakraField
      label=""
      id="image"
      name="image"
      placeholder="image"
      aria-placeholder="Post Image"
    />
  </PannelWrapper>
)

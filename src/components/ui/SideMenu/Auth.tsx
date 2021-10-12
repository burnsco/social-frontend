import { Accordion } from "@chakra-ui/react"
import React from "react"
import SubredditsAccordion from "./Subreddits"

export default function AuthorizedSideMenu() {
  return (
    <Accordion allowToggle>
      <SubredditsAccordion />
    </Accordion>
  )
}

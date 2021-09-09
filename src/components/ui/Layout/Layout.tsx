import { Header } from "@/components/ui"
import { Box, Stack } from "@chakra-ui/react"
import Head from "next/head"
import PropTypes from "prop-types"
import Footer from "../Footer/Footer"
import SideMenuContainer from "../SideMenu/SideMenuContainer"

const Layout: React.FC<{ children: React.ReactNode; title: string }> = ({
  children,
  title
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="theme-color" content="#1A1A1B" />
        <meta
          name="description"
          content="A Reddit clone to learn typescript, graphql, testing and more."
        />
      </Head>

      <Header />
      <Box px={["0em", "1em", "3em", "4em"]} py="6em">
        <Stack isInline spacing={14}>
          <Box as="main" width="full">
            {children}
          </Box>
          <Box
            as="aside"
            minW="25%"
            maxW="350px"
            display={["none", "none", "block", "block"]}
          >
            <SideMenuContainer />
          </Box>
        </Stack>
      </Box>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  title: PropTypes.string.isRequired
}

export default Layout

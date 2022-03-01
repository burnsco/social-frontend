import { ChakraWrapper } from '@/components/common'
import { useApollo } from '@/lib/apolloClient'
import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <ChakraWrapper>
          <Component {...pageProps} />
        </ChakraWrapper>
      </ApolloProvider>
    </>
  )
}

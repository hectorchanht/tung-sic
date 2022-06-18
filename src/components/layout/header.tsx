import { Box } from '@chakra-ui/react'
import Head from 'next/head'
import Locale from '../locale-switcher'


export default () => (
  <div>
    <Head>
      <title>tung-sic</title>
      <meta name="description" content="tung sharing music 24/7" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Box as={'nav'}>
      <Locale />
    </Box>
  </div>
)
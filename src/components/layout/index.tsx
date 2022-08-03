import { Box, Container } from "@chakra-ui/react";
import Head from 'next/head';
import { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";


const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Container maxW={'888px'} display={'flex'} flexDirection={'column'} height={'100vh'}>
      <Head>
        {/* <!-- Primary Meta Tags --> */}
        <title>tung-sic | music sharing 24/7</title>
        <meta name="title" content="tung-sic | music sharing 24/7" />
        <meta name="description" content="🎸 tung sharing music 24/7 🎸" />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rushgun.vercel.app/" />
        <meta property="og:title" content="tung-sic | music sharing 24/7" />
        <meta property="og:description" content="🎸 tung sharing music 24/7 🎸" />
        <meta property="og:image" content="https://tung-sic.me/logo.png" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://rushgun.vercel.app/" />
        <meta property="twitter:title" content="tung-sic | music sharing 24/7" />
        <meta property="twitter:description" content="🎸 tung sharing music 24/7 🎸" />
        <meta property="twitter:image" content="https://tung-sic.me/logo.png" />

        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <Box as={'main'} flex={1}>
        {children}
      </Box>
      <Footer />
    </Container>
  )
}

export default Layout;
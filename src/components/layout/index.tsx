import { Box, Container } from "@chakra-ui/react";
import { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";
import Head from 'next/head';


const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Container maxW={'888px'} display={'flex'} flexDirection={'column'} height={'100vh'}>
      <Head>
        <title>tung-sic | music sharing 24/7</title>
        <meta name="description" content="🎸 tung sharing music 24/7 🎸" />
        <link rel="icon" href="/favicon.ico" />
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
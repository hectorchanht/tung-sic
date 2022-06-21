import { Box, Container } from "@chakra-ui/react";
import { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";


const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Container maxW={'980px'} display={'flex'} flexDirection={'column'} height={'100vh'}>
      <Header />
      <Box as={'main'} flex={1}>
        {children}
      </Box>
      <Footer />
    </Container>
  )
}

export default Layout;
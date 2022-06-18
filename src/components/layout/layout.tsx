import { Box, Container } from "@chakra-ui/react";
import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }) => {

  return (
    <Container display={'flex'} flexDirection={'column'} height={'100vh'}>
      <Header />
      <Box as={'main'} flex={1}>
        {children}
      </Box>
      <Footer />
    </Container>
  )
}

export default Layout;
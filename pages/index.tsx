import { Box, Container } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Faqs from '../src/components/faqs'
import Footer from '../src/components/layout/footer'
import Header from '../src/components/layout/header'
import { useLocale } from '../src/utils/hooks'


const Home: NextPage = () => {
  const loc = useLocale();
  return (
    <Container display={'flex'} flexDirection={'column'} height={'100vh'}>
      <Header />

      <Box as={'main'} flex={1}>
        <Box fontSize={'4em'}>
          {loc.get('welcome')}
        </Box>
        <Box as={'a'} justifyContent='center' href="https://chat.whatsapp.com/Ek2082QfodUAY00Qdcr2Di">
          {loc.get('join')}
        </Box>

        <h3>
          {loc.get('intro1')}
        </h3>

        <br />
        <br />
        <br />

        <Faqs />

      </Box>

      <Footer />
    </Container>
  )
}

export default Home

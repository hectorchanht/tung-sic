import { Box, Container } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Faqs from '../src/components/faq/faqs'
import Footer from '../src/components/layout/footer'
import Header from '../src/components/layout/header'
import { useLocale } from '../src/utils/hooks'


const Home: NextPage = () => {
  const loc = useLocale();
  return (
    <Container flexDirection={'column'}>
      <Header />

      <Box as={'main'} flex={1}>
        <Box fontSize={'4em'}>
          <a href="https://chat.whatsapp.com/Ek2082QfodUAY00Qdcr2Di">
            Welcome to tung-sic
          </a>
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

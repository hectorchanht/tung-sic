import { Box, Container } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Marquee from "react-fast-marquee"
import Faqs from '../src/components/faqs'
import Footer from '../src/components/layout/footer'
import Header from '../src/components/layout/header'
import { useLang, useLocale } from '../src/utils/hooks'


const Home: NextPage = () => {
  const loc = useLocale();
  const { isEn } = useLang();
  return (
    <Container display={'flex'} flexDirection={'column'} height={'100vh'}>
      <Header />

      <Box as={'main'} flex={1}>
        <Box fontSize={'3em'} textAlign='center'>
          {loc.get('welcome')}
        </Box>

        <Marquee pauseOnHover pauseOnClick direction='right' gradient={false}>
          <a href='https://chat.whatsapp.com/Ek2082QfodUAY00Qdcr2Di' target="_blank">
            ✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨{isEn && '✨✨✨'}
            <br />
            {loc.get('join')}
            <br />
            {loc.get('join')}
            <br />
            {loc.get('join')}
            <br />
            ✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨{isEn && '✨✨✨'}
          </a>
        </Marquee>

        <Box fontWeight={800} textAlign='center'>
          {loc.get('intro1')}
        </Box>

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

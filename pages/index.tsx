import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Locale from '../src/components/locale-switcher'
import Faqs from '../src/components/faq/faqs'
import { Container } from '@chakra-ui/react'
import { useLocale } from '../src/utils/hooks'

const Home: NextPage = () => {
  const loc = useLocale();
  return (
    <Container >
      <Head>
        <title>tung-sic</title>
        <meta name="description" content="tung sharing music 24/7" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main  >
      <Locale />

        <h1  >
          Welcome to <a href="https://chat.whatsapp.com/Ek2082QfodUAY00Qdcr2Di">tung-sic</a>
        </h1>
        

        <h3>
          <center>
            {loc.get('intro1') }
            {/* {getLocaleJson('intro2', isEn)} */}
            </center>
        </h3>

        <br/>
        <br/>
        <br/>

        <Faqs/>
        
      </main>

      <footer >
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by hector{' '}
            {/* <Image src="/logo.png" alt="Logo" layout='fill'  /> */}
        </a>
      </footer>
    </Container>
  )
}

export default Home

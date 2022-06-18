import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Marquee from "react-fast-marquee"
import Faqs from '../src/components/faqs'
import Layout from '../src/components/layout/layout'
import { useLang, useLocale } from '../src/utils/hooks'


const Home: NextPage = () => {
  const loc = useLocale();
  const { isEn } = useLang();
  return (
    <Layout>

      <Box fontSize={'3em'} textAlign='center'>
        {loc.get('welcome')}
      </Box>

      <Marquee pauseOnHover pauseOnClick direction='right' gradient={false}>
        <a href='https://chat.whatsapp.com/Ek2082QfodUAY00Qdcr2Di' target="_blank" rel="noreferrer" >
          {/* <Image width={420} height={230} src={`/${isEn ? 'en' : 'zh'}-join.svg`} alt={'join whatsapp group now!'} /> */}
          <Box textOverflow={'ellipsis'}>
            ✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨{isEn && '✨✨✨'}
            <br />
            {loc.get('join')}
            <br />
            {loc.get('join')}
            <br />
            {loc.get('join')}
            <br />
            ✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨{isEn && '✨✨✨'}
          </Box>
        </a>
      </Marquee>

      <Box fontWeight={800} textAlign='center'>
        {loc.get('intro1')}
      </Box>

      <br />
      <br />
      <br />

      <Faqs />

    </Layout>
  )
}

export default Home

import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Marquee from "react-fast-marquee"
// @ts-ignore  
import FAQ from '../src/components/faq'
import Layout from '../src/components/layout'
import { useLang, useLocale } from '../src/utils/hooks'


const Home: NextPage = () => {
  const loc = useLocale();
  const { isEn } = useLang();
  return (
    <Layout>

      <Box fontSize={'3em'} textAlign='center'>
        {loc.get('welcome')}
      </Box>

      <Marquee direction="left" pauseOnHover pauseOnClick gradient={false}>
        <a href='https://chat.whatsapp.com/Ek2082QfodUAY00Qdcr2Di' target="_blank" rel="noreferrer" >
          {/* <Image width={420} height={230} src={`/${isEn ? 'en' : 'zh'}-join.svg`} alt={'join whatsapp group now!'} /> */}
          <Box textOverflow={'ellipsis'} fontSize={30}>
            ✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨{isEn && '✨✨✨'}
            <br />
            {' '}{loc.get('join')}
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

      <FAQ />

    </Layout>
  )
}

export default Home

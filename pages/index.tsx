import { Box, Center } from '@chakra-ui/react'
import type { NextPage } from 'next'
import FAQ from '../src/components/faq'
import GradientBtn from '../src/components/gradientBtn'
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

      <Center>
        <br />
        <GradientBtn href={'https://chat.whatsapp.com/Ek2082QfodUAY00Qdcr2Di'}>
          <Box textOverflow={'ellipsis'} fontSize={30}>
            ✨✨✨✨✨✨✨✨✨✨✨✨✨{isEn && '✨✨✨'}
            <br />
            {' '}{loc.get('join')}
            <br />
            ✨✨✨✨✨✨✨✨✨✨✨✨✨{isEn && '✨✨✨'}
          </Box>
        </GradientBtn>
        <br />
      </Center>

      <Center>
        <GradientBtn cls={'btn2'} href={'https://www.youtube.com/playlist?list=PLAXM729RypVMDM4leAk_rycoNBGIk-SwY'}>
          Youtube Playlist
        </GradientBtn>
      </Center>

      <Box fontWeight={800} textAlign='center'>
        {loc.get('intro1')}
      </Box>

      <br />

      <FAQ />

    </Layout>
  )
}

export default Home;

// import Marquee from "react-fast-marquee";

// const M = ({ isEn, loc }: { isEn: boolean, loc: any }) => <Marquee direction="left" pauseOnHover pauseOnClick gradient={false}>
//   <a href='https://chat.whatsapp.com/Ek2082QfodUAY00Qdcr2Di' target="_blank" rel="noreferrer" >
//     {/* <Image width={420} height={230} src={`/${isEn ? 'en' : 'zh'}-join.svg`} alt={'join whatsapp group now!'} /> */}
//     <Box textOverflow={'ellipsis'} fontSize={30}>
//       ✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨{isEn && '✨✨✨'}
//       <br />
//       {' '}{loc.get('join')}
//       <br />
//       ✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨{isEn && '✨✨✨'}
//     </Box>
//   </a>
// </Marquee>;
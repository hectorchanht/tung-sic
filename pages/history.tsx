import { SimpleGrid } from '@chakra-ui/react';
import data from '../public/parsed-record.json';
import Layout from "../src/components/layout/layout";
import Video from '../src/components/video';



const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;


const HistoryPage = () => {
  console.log(` history.tsx --- data:`, data.slice(10))

  return <Layout>
    <SimpleGrid columns={2} spacing={2}>

      {data.map(({ datetime, isDj, message }) => {
        if (message.match(urlRegex))
          return <Video link={message} key={datetime} />
      })}
    </SimpleGrid>
    {/* <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM' /> */}
  </Layout>
}

export default HistoryPage;
import { FormControl, FormLabel, SimpleGrid, Switch } from '@chakra-ui/react';
import React from 'react';
import data from '../public/parsed-record.json';
import Layout from "../src/components/layout/layout";
import Pagination from '../src/components/pagination';
import Video from '../src/components/video';


const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

const HistoryPage = () => {
  const [{ hideFeedback, hideText }, setHide] = React.useState({ hideFeedback: false, hideText: false });
  const [{ pageIndex, pageSize }, setPage] = React.useState({ pageIndex: 0, pageSize: 10 });

  const filteredData = React.useMemo(() => data.slice(
    pageIndex * pageSize, ((pageIndex + 1) * pageSize)
  ), [pageIndex, pageSize]);

  return <Layout>
    <Pagination cb={(d: { pageIndex: number, pageSize: number }) => {
      setPage(d);
    }} />

    <FormControl display='flex' alignItems='center'>
      <FormLabel htmlFor='hide-feedbacks' mb='0'>
        hide feedbacks?
      </FormLabel>
      <Switch id='hide-feedbacks' isChecked={hideFeedback} onChange={() => setHide(d => ({...d, hideFeedback:!d.hideFeedback}))} />

      <FormLabel htmlFor='hide-text' mb='0'>
        hide text?
      </FormLabel>
      <Switch id='hide-text' isChecked={hideText} onChange={() => setHide(d => ({...d, hideText:!d.hideText}))}/>
    </FormControl>

    <SimpleGrid columns={2} spacing={2}>
      {filteredData.map(({ datetime, isDj, message }, i) => {
        if (message.length === 0) return;
        if (message.match(urlRegex)) {
          return <Video link={message} key={datetime + i} />
        } else {
          if (!isDj && hideFeedback || hideText) return ;
          if (message.includes('\n')) {
            return message.split('\n').map(d => <p key={d}>{d}</p>)
          } else {
            return <p>{message}</p>
          }
        }
      })}
    </SimpleGrid>
  </Layout>
}

export default HistoryPage;
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Flex, IconButton, SimpleGrid, Tooltip } from '@chakra-ui/react';
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

    <Flex justifyContent={'center'} m={4}>
      <Tooltip label="hide comment, only showing posts from DJ">
        <IconButton
          aria-label={'hide-comment'}
          onClick={() => setHide(d => ({ ...d, hideFeedback: !d.hideFeedback }))}
          icon={hideFeedback ? <ViewIcon /> : <ViewOffIcon />}
        />
      </Tooltip>
      <Tooltip label="hide text, only showing songs">
        <IconButton
          aria-label={'hide-text'}
          onClick={() => setHide(d => ({ ...d, hideText: !d.hideText }))}
          icon={hideText ? <ViewIcon /> : <ViewOffIcon />}
          ml={4}
        />
      </Tooltip>
    </Flex>

    <SimpleGrid columns={2} spacing={2}>
      {filteredData.map(({ datetime, isDj, message }, i) => {
        const k = datetime + message + i;
        if (message.length === 0) return;
        if (message.match(urlRegex)) {
          return <Video link={message} key={k} />
        } else {
          if (!isDj && hideFeedback || hideText) return;
          if (message.includes('\n')) {
            return message.split('\n').map(d => <p key={k}>{d}</p>)
          } else {
            return <p key={k}>{message}</p>
          }
        }
      })}
    </SimpleGrid>
  </Layout>
}

export default HistoryPage;
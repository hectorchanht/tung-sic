import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Flex, IconButton, SimpleGrid, Tooltip } from '@chakra-ui/react';
import React from 'react';
import data from '../public/parsed-record.json';
import Layout from "../src/components/layout";
// @ts-ignore  
import Paginator from '../src/components/paginator';
import Thumbnail from '../src/components/thumbnail';


export const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

const HistoryPage = () => {
  const [{ hideFeedback, hideText }, setHide] = React.useState({ hideFeedback: true, hideText: false });
  const [{ pageIndex, pageSize }, setPage] = React.useState({ pageIndex: 0, pageSize: 6 });

  const filteredData = React.useMemo(() => {
    let d = [...data];
    if (hideText) {
      d = d.filter(({ message }) => message.match(urlRegex));
    }
    else if (hideFeedback) {
      d = d.filter(({ isDj }) => isDj);
    }

    return d.slice(pageIndex * pageSize, ((pageIndex + 1) * pageSize))
  }, [pageIndex, pageSize, hideFeedback, hideText]);

  return <Layout>
    <Paginator hideFeedback={hideFeedback} hideText={hideText}
      cb={(d: { pageIndex: number, pageSize: number }) => setPage(d)} />

    <Flex justifyContent={'center'} m={4}>
      <Tooltip label="hide comment, only showing posts from DJ">
        <IconButton
          aria-label={'hide-comment'}
          disabled={hideText}
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
      {filteredData.map(({ datetime, isDj, message, id }) => {
        // todo: add show datetime for each day period or story
        // if (message.length === 0) return;  // null data is catch in parsing
        if (message.match(urlRegex)) {
          return <Thumbnail link={message} key={id} />
        } else {
          if (message.includes('\n')) {
            return message.split('\n').map((d, di) => <p key={d + di}>{d}</p>)
          } else {
            return <p key={id}>{message}</p>
          }
        }
      })}
    </SimpleGrid>
  </Layout>
}

export default HistoryPage;
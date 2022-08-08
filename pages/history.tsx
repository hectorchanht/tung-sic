import { AtSignIcon, CalendarIcon, InfoOutlineIcon, LinkIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Badge, Flex, Grid, GridItem, IconButton, Tooltip, useClipboard } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';
import data from '../public/parsed-record.json';
import Layout from "../src/components/layout";
import Paginator, { pageSizeOptions } from '../src/components/paginator';
import Thumbnail from '../src/components/thumbnail';
import styles from '../src/styles/global.module.css';


export const queryRegex = /[?&]([^=#]+)=([^&#]*)/g;
export const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
export const defaultQuery = {
  page: 0,
  size: pageSizeOptions[1],
  hideFb: 1,
  hideDj: 1,
  hideDt: 1
};

const HistoryPage = () => {
  const router = useRouter();

  const query = React.useMemo(() => {
    if (!(router.asPath && router.asPath.match(queryRegex))) {
      return (defaultQuery);
    }

    // @ts-ignore
    return router.asPath.match(queryRegex).reduce((a, b) => {
      const [k, v] = b.slice(1).split('=')
      return ({ ...a, [k]: v })
    }, defaultQuery) || (defaultQuery);
  }, [router.asPath]);

  const { hideFb, hideDj, hideDt } = query;


  const [{ hideFeedback, hideText, hideDate }, setHide] = React.useState(
    // @ts-ignore
    { hideFeedback: '0' !== hideFb, hideText: '0' !== hideDj, hideDate: '0' !== hideDt }
  );

  const [{ pageIndex, pageSize }, setPage] = React.useState({ pageIndex: 0, pageSize: 6 });
  const [previousId, setPreviousId] = React.useState('');

  const filteredData = React.useMemo(() => {
    let d = [...data];
    if (hideText) {
      d = d.filter(({ message }) => message.match(urlRegex));
    } else if (hideFeedback) {
      d = d.filter(({ isDj }) => isDj);
    }

    // if (previousId) {
    //   const previousIdIndex = d.findIndex(({ message }) => message.includes(previousId))
    //   setPreviousId('')
    //   return d.slice(previousIdIndex, previousIdIndex + pageSize)
    // }

    return d.slice(pageIndex * pageSize, ((pageIndex + 1) * pageSize))
  }, [pageIndex, pageSize, hideFeedback, hideText]);  // previousId is not needed

  const DatetimeBadge = ({ datetime }: { datetime: string }) => (
    <GridItem colSpan={2} justifySelf={'center'}>
      <Badge>
        {dayjs(datetime).format('DD/MM/YYYY HH:mm')}
      </Badge>
    </GridItem>
  );

  const clipText = typeof window !== "undefined" && `${window.location.href.split('/history')[0]}/history?page=${pageIndex + 1}&size=${pageSize}&hideFb=${hideFeedback ? 1 : 0}&hideDj=${hideText ? 1 : 0}&hideDt=${hideDate ? 1 : 0}` || ''
  const { onCopy } = useClipboard(clipText);

  return <Layout>
    <Paginator hideFeedback={hideFeedback} hideText={hideText}
      cb={(d: { pageIndex: number, pageSize: number }) => setPage(d)} />

    <Flex justifyContent={'center'} m={4}>
      <Tooltip label="hide comment, only showing posts from DJ">
        <IconButton
          aria-label={'hide-comment'}
          disabled={hideText}
          onClick={() => setHide(d => ({ ...d, hideFeedback: !d.hideFeedback }))}
          icon={hideFeedback ? <InfoOutlineIcon /> : <ViewOffIcon />}
        />
      </Tooltip>
      <Tooltip label="hide text, only showing songs">
        <IconButton
          aria-label={'hide-text'}
          onClick={() => setHide(d => ({ ...d, hideText: !d.hideText }))}
          icon={hideText ? <AtSignIcon /> : <ViewOffIcon />}
          ml={4}
        />
      </Tooltip>
      <Tooltip label="hide date, only one date per page">
        <IconButton
          aria-label={'hide-date'}
          onClick={() => setHide(d => ({ ...d, hideDate: !d.hideDate }))}
          icon={hideDate ? <CalendarIcon /> : <ViewOffIcon />}
          ml={4}
        />
      </Tooltip>
      <Tooltip label="share this page">
        <IconButton
          aria-label={'share this page'}
          onClick={() => {
            if (confirm(clipText)) {
              onCopy()
            }
          }}
          icon={<LinkIcon />}
          ml={4}
        />
      </Tooltip>
    </Flex>

    <Grid
      // templateRows='repeat(2, 1fr)'
      templateColumns='repeat(2, 1fr)'
      gap={"2px"}
    >
      {filteredData.map(({ datetime, isDj, message, id }, i) => {
        let r: any = [
          (i === 0) && <DatetimeBadge key={`datetime-${datetime}`} datetime={datetime} />
        ];
        if (i >= 1 && !hideDate) {
          if (dayjs(datetime).diff(dayjs(filteredData?.[i - 1]?.datetime), 'minute', true) >= 60) {
            r = [...r, <DatetimeBadge key={`datetime-${datetime}`} datetime={datetime} />]
          }
        }
        // todo: add show datetime for each day period or story

        // if (message.length === 0) return;  // null data is catch in parsing
        if (message.match(urlRegex) && message) {
          if (message.indexOf('youtube.com/playlist') === -1
            && message.indexOf('youtube.com/clip') === -1
            && ['youtu.be', 'youtube.com'].some(d => message.indexOf(d) !== -1)) {
            r = [
              ...r,
              <GridItem key={id}>
                <Thumbnail link={message} cb={(id = '') => setPreviousId(id)} />
              </GridItem>
            ]
          }
          else {
            r = [...r, <GridItem key={id} className={styles.textBox}>
              <a href={message.split(/\r?\n/)?.[0] || ''}>{message}</a>
            </GridItem>]
          }
        } else {
          if (message.includes('\n')) {
            r = [...r,
            <GridItem className={styles.textBox} key={id}>
              {message.split('\n').map((d, di) => <p key={d + di}>{d}</p>)}
            </GridItem>
            ]
          } else {
            r = [...r, <GridItem className={styles.textBox} key={id}>{message}</GridItem>]
          }
        }
        return r;
      })}
    </Grid>
  </Layout>
}

export default HistoryPage;

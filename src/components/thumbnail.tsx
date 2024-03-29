// https://gist.github.com/protrolium/8831763
import { Box, Code, Img, Text } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import React from 'react';

const getYtInfo = (id = '') => fetch(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=AIzaSyDWpJ6aa2txhUEKQ9k2bGra4NWRphBEobk&part=snippet`)
  .then(d => d.json());
// .then(d => {
//   return d;
// })
type CallbackFunction = (id: string) => void;

const Thumbnail = ({ link, cb, showInfo = false }: { link: string, cb?: CallbackFunction, showInfo?: boolean }) => {
  const [videoInfo, setVideoInfo] = React.useState({});
  /*
  todo: get all video info beforehand and store it in gunjs

https://developers.google.com/youtube/v3/docs/playlistItems/list?apix_params=%7B%22part%22%3A%5B%22snippet%2CcontentDetails%22%5D%2C%22maxResults%22%3A25%2C%22pageToken%22%3A%22EAAaBlBUOkNCaw%22%2C%22playlistId%22%3A%22PLAXM729RypVMDM4leAk_rycoNBGIk-SwY%22%7D
  */

  if (!(['youtu.be', 'youtube.com'].some(domain => link.includes(domain)))) return null;
  link = link.substring(link.indexOf('https://')).replace('https://youtu.be/', 'https://www.youtube.com/watch?v=');
  // remove text in front of "https://"

  // @ts-ignore
  const id = link.split('v=').pop().slice(0, 11);
  const getInfo = () => {
    cb && cb(id);
    isEmpty(videoInfo) && getYtInfo(id).then(setVideoInfo)
  };

  if (showInfo) {
    getInfo();
  }
  return (
    <Box>
      <a onMouseOver={getInfo} onTouchStart={getInfo} href={link} target="_blank" rel="noreferrer">
        <Img
          src={`https://img.youtube.com/vi/${id}/0.jpg`}
          alt={'youtube thumbnail'} />
      </a>
      {!isEmpty(videoInfo) && (
        <Box>
          <Box>
            {/* @ts-ignore */}
            {videoInfo?.items?.[0]?.snippet?.title}
          </Box>

          <Code>
            {/* @ts-ignore */}
            <a href={`https://www.youtube.com/channel/${videoInfo?.items?.[0]?.snippet?.channelId}`}>
              {/* @ts-ignore */}
              {videoInfo?.items?.[0]?.snippet?.channelTitle}
              <Text as='sup'>
                {/* @ts-ignore */}
                {' '}({videoInfo?.items?.[0]?.snippet?.publishedAt.slice(0, 10)})
              </Text>
            </a>
          </Code>
        </Box>)}
    </Box>
  )
};

export default Thumbnail;

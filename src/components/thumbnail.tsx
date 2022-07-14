// https://gist.github.com/protrolium/8831763
import { Badge, Box } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import React from 'react';

const getYtInfo = (id = '') => fetch(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${process.env.NEXT_PUBLIC_YOUTUBE_ID}&part=snippet`)
  .then(d => d.json());
// .then(d => {
//   return d;
// })
type CallbackFunction = (id: string) => void;

const Thumbnail = ({ link, cb }: { link: string, cb: CallbackFunction }) => {
  const [videoInfo, setVideoInfo] = React.useState({});
  /*
  todo: get all video info beforehand and store it in gunjs

https://developers.google.com/youtube/v3/docs/playlistItems/list?apix_params=%7B%22part%22%3A%5B%22snippet%2CcontentDetails%22%5D%2C%22maxResults%22%3A25%2C%22pageToken%22%3A%22EAAaBlBUOkNCaw%22%2C%22playlistId%22%3A%22PLAXM729RypVMDM4leAk_rycoNBGIk-SwY%22%7D
  */

  if (!(['youtu.be', 'youtube.com'].some(domain => link.includes(domain)))) return null;
  link = link.replace('https://youtu.be/', 'https://www.youtube.com/watch?v=');

  // @ts-ignore
  const id = link.split('v=').pop().slice(0, 11);
  const getInfo = () => {
    cb(id);
    isEmpty(videoInfo) && getYtInfo(id).then(setVideoInfo)
  };

  return (
    <Box>
      <a onMouseOver={getInfo} onTouchStart={getInfo} href={link} target="_blank" rel="noreferrer">
        <Image height={352} width={470} src={`https://img.youtube.com/vi/${id}/0.jpg`} alt={'youtube thumbnail'} />
      </a>
      {!isEmpty(videoInfo) && (
        <Box>
          <Box>
            {/* @ts-ignore */}
            {videoInfo?.items?.[0]?.snippet?.title}
          </Box>

          <Badge>
            {/* @ts-ignore */}
            <a href={`https://www.youtube.com/channel/${videoInfo?.items?.[0]?.snippet?.channelId}`}>
              {/* @ts-ignore */}
              @{videoInfo?.items?.[0]?.snippet?.channelTitle}
            </a>
          </Badge>

          <br/>

          <Badge>
            {/* @ts-ignore */}
            ({videoInfo?.items?.[0]?.snippet?.publishedAt.slice(0, 10)})
          </Badge>
        </Box>)}
    </Box>
  )
};

export default Thumbnail;

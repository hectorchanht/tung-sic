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

const Thumbnail = ({ link }: { link: string }) => {
  const [videoInfo, setVideoInfo] = React.useState({});

  if (!(['youtu.be', 'youtube.com'].some(domain => link.includes(domain)))) return null;
  link = link.replace('https://youtu.be/', 'https://www.youtube.com/watch?v=');

  // @ts-ignore
  const id = link.split('v=').pop().slice(0, 11);
  const getInfo = () => isEmpty(videoInfo) && getYtInfo(id).then(setVideoInfo);

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
            {' '}
            {/* @ts-ignore */}
            ({videoInfo?.items?.[0]?.snippet?.publishedAt.slice(0, 10)})
          </Badge>
        </Box>)}
    </Box>
  )
};

export default Thumbnail;
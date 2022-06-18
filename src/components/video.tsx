// https://gist.github.com/protrolium/8831763
import Image from 'next/image';


const Video = ({ link }: { link: string }) => {
  if (!(['youtu.be', 'youtube.com'].some(domain => link.includes(domain)))) return null;
  link = link.replace('https://youtu.be/', 'https://www.youtube.com/watch?v=');

  // @ts-ignore
  const id = link.split('v=').pop().slice(0, 11);

  return (
    <a href={link} target="_blank" rel="noreferrer">
      <Image height={352} width={470} src={`https://img.youtube.com/vi/${id}/0.jpg`} />
    </a>
  )
};

export default Video;

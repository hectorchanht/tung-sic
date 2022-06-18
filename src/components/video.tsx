// https://gist.github.com/protrolium/8831763

// import Image from 'next/image'


const Video = ({ link }: { link: string }) => {
  if (!(['youtu.be', 'youtube.com'].some(domain => link.includes(domain)))) return null;
  link = link.replace('https://youtu.be/', 'https://www.youtube.com/watch?v=');

  // @ts-ignore
  const id = link.split('v=').pop().slice(0, 11);

  return (
    <div>
      <a target="_blank" href={link}>
        {/* <Image layout='fill' src={`https://img.youtube.com/vi/${id}/0.jpg`}/> */}
        <img src={`https://img.youtube.com/vi/${id}/0.jpg`} />
      </a>
    </div>
  )
};

export default Video;

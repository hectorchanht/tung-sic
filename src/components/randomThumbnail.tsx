import { Button, Grid, GridItem } from "@chakra-ui/react";
import { sampleSize } from 'lodash';
import React from "react";
import data from '../../public/parsed-record.json';
import { useLocale } from '../../src/utils/hooks';
import Thumbnail from "./thumbnail";

const RandomThumbnail = () => {
  const loc = useLocale();
  const [d, setD] = React.useState([]);

  React.useEffect(() => {
    // @ts-ignore
    setD(sampleSize(data.filter(({ message }) => message && message.includes('youtu.be')), 6));
  }, []);

  return <Grid templateColumns='repeat(2, 1fr)' gap={"2px"} >
    {d.length && d.map(({ message, id }) => (
      <GridItem key={id}>
        <Thumbnail link={message} cb={null} />
      </GridItem>
    ))}
    <GridItem colSpan={2} justifySelf={'center'}>
      <Button as={'a'} href={'/history'} width={'856px'} bg={'black'} color={'white'} rounded={false}>
        {loc.get('more-songs')}
      </Button>
    </GridItem>
    <br />
  </Grid>

}

export default RandomThumbnail;
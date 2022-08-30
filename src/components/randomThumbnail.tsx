import { Button, Grid, GridItem, useColorMode } from "@chakra-ui/react";
import { sampleSize } from 'lodash';
import React from "react";
import data from '../../public/parsed-record.json';
import { useLocale } from '../../src/utils/hooks';
import Thumbnail from "./thumbnail";


const RandomThumbnail = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const loc = useLocale();
  const [d, setD] = React.useState<typeof data>([]);

  React.useEffect(() => {
    setD(sampleSize(data.filter(({ message }) => message && message.includes('youtu.be')), 6));
  }, []);

  return <Grid templateColumns='repeat(2, 1fr)' gap={"2px"} >
    {d.length && d.map(({ message, id }) => (
      <GridItem key={id}>
        <Thumbnail link={message} showInfo={true} />
      </GridItem>
    )) || null}
    <GridItem colSpan={2} justifySelf={'center'}>
      <Button as={'a'} href={'/history'} width={'min(90vw, 856px)'} bg={isDark ? 'white' : 'black'} color={isDark ? 'black' : 'white'} rounded={'none'}>
        {loc.get('more-songs')}
      </Button>
    </GridItem>
    <br />
  </Grid>

}

export default RandomThumbnail;
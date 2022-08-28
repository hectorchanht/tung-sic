import { Button, Grid, GridItem } from "@chakra-ui/react";
import { sampleSize } from 'lodash';
import Link from "next/link";
import data from '../../public/parsed-record.json';
import { useLocale } from '../../src/utils/hooks';
import Thumbnail from "./thumbnail";


const RandomThumbnail = () => {
  const loc = useLocale();

  return <Grid
    templateColumns='repeat(2, 1fr)'
    gap={"2px"}
  >
    {sampleSize(data.filter(({ message }) => message && message.includes('youtu.be')), 4)
      .map(({ message, id }) => <GridItem key={id}>
        <Thumbnail link={message} cb={null} />
      </GridItem>
      )}
    <br />
    <GridItem colSpan={2} justifySelf={'center'}>
      <Button>
        <Link href={'/history'}>
          {loc.get('more-songs')}
        </Link>
      </Button>
    </GridItem>
    <br />
  </Grid>

}

export default RandomThumbnail;
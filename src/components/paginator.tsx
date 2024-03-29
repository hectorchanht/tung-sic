import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Center, IconButton, Input, InputGroup, InputRightAddon, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Tooltip, Wrap, WrapItem } from '@chakra-ui/react';
// import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';
import { defaultQuery, queryRegex, urlRegex } from "../../pages/history";
import data from '../../public/parsed-record.json';


type CallbackFunction = ({ pageIndex, pageSize }: { pageIndex: number, pageSize: number }) => void;

export const pageSizeOptions = [2, 4, 6, 8, 10, 16, 32, 64, 128, 256, 512, 1024];

const Paginator = ({ cb, hideFeedback, hideText, }:
  { cb: CallbackFunction, hideFeedback: Boolean, hideText: Boolean }) => {
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

  let p = query.page;
  if (p > 1) { p -= 1 };

  const [pageIndex, setPageIndex] = React.useState(p || 0);
  const [pageSize, setPageSize] = React.useState(query.size);

  React.useEffect(() => {
    function handleKeyDown(e: any) {
      if (e.key === 'ArrowLeft' && pageIndex >= 0) {
        setPageIndex(d => d - 1)
      } else if (e.key === 'ArrowRight' && pageIndex <= maxPage) {
        setPageIndex(d => d + 1)
      }
    }
    document.addEventListener('keydown', handleKeyDown, { passive: false });

    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  const maxPage = React.useMemo(() => {
    if (hideText) {
      const itemCount = data.filter(({ message }) => message.match(urlRegex)).length;
      return Math.ceil(itemCount / pageSize)
    } else if (hideFeedback) {
      const itemCount = data.filter(({ isDj }) => isDj).length;
      return Math.ceil(itemCount / pageSize)
    }
    return Math.ceil(data.length / pageSize)
  }, [hideFeedback, hideText, pageSize]);

  React.useEffect(() => {
    cb && cb({ pageIndex, pageSize })
  }, [pageIndex, pageSize, cb]);

  React.useEffect(() => {
    if (pageIndex > maxPage) {
      setPageIndex(maxPage - 1)
    }
  }, [maxPage, pageIndex])

  // const debouncedSetPageIndex = debounce(setPageIndex, 300, { leading: true, maxWait: 420, trailing: true });

  return <>
    <Slider
      onChange={d => setPageIndex(d)}
      aria-label='page-slider' value={pageIndex} min={0} max={maxPage - 1}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>

    <Center>
      <Wrap>
        <WrapItem>
          {/* <Tooltip label="First Page">
            <IconButton
              aria-label={'first-page'}
              onClick={() => setPageIndex(0)}
              isDisabled={pageIndex <= 0}
              icon={<ArrowLeftIcon h={3} w={3} />}
              mr={4}
            />
          </Tooltip> */}
          <Tooltip label="Previous Page">
            <IconButton
              aria-label={'previous-page'}
              onClick={() => setPageIndex(d => d - 1)}
              isDisabled={pageIndex <= 0}
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Tooltip>
        </WrapItem>

        <WrapItem alignItems={'center'}>
          <InputGroup>
            <Input value={pageIndex + 1} w={16} min={1} max={maxPage}
              onChange={(value) => {
                const v = Number(value.target.value)
                if (v > maxPage) return;

                setPageIndex(!!v ? (v - 1) : 0)
              }} />
            <InputRightAddon >
              / {maxPage}
            </InputRightAddon>
          </InputGroup>
        </WrapItem>

        <WrapItem>
          <Select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {pageSizeOptions.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                #{pageSize}
              </option>
            ))}
          </Select>
        </WrapItem>

        <WrapItem>
          <Tooltip label="Next Page">
            <IconButton
              aria-label={'next-page'}
              onClick={() => setPageIndex(d => d + 1)}
              isDisabled={pageIndex >= maxPage - 1}
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
          {/* <Tooltip label="Last Page">
            <IconButton
              aria-label={'last-page'}
              onClick={() => setPageIndex(maxPage - 1)}
              isDisabled={pageIndex >= maxPage - 1}
              icon={<ArrowRightIcon h={3} w={3} />}
              ml={4}
            />
          </Tooltip> */}
        </WrapItem>
      </Wrap>
    </Center>
  </>
};

export default Paginator;

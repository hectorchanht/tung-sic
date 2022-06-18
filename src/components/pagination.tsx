import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Center, IconButton, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Text, Tooltip, Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';
import data from '../../public/parsed-record.json';


type CallbackFunction = ({ pageIndex, pageSize }: { pageIndex: number, pageSize: number }) => void;

const Pagination = ({ cb }: { cb: CallbackFunction }) => {
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(6);
  const maxPage = Math.ceil(data.length / pageSize);

  React.useEffect(() => {
    cb && cb({ pageIndex, pageSize })
  }, [pageIndex, pageSize]);

  return <Center>
    <Wrap>
      <WrapItem>
        <Tooltip label="First Page">
          <IconButton
            aria-label={'first-page'}
            onClick={() => setPageIndex(0)}
            isDisabled={pageIndex <= 0}
            icon={<ArrowLeftIcon h={3} w={3} />}
            mr={4}
          />
        </Tooltip>
        <Tooltip label="Previous Page">
          <IconButton
            aria-label={'previous-page'}
            onClick={() => setPageIndex(d => d - 1)}
            isDisabled={pageIndex <= 0}
            icon={<ChevronLeftIcon h={6} w={6} />}
          />
        </Tooltip>
      </WrapItem>

      <WrapItem alignItems="center">
        <Text flexShrink="0" mr={8}>
          {/* Page{" "} */}
          <Text fontWeight="bold" as="span">
            {pageIndex + 1}
          </Text>{" "}
          /{" "}
          <Text fontWeight="bold" as="span">
            {maxPage}
          </Text>
        </Text>
        <Text flexShrink="0">Go to page:</Text>{" "}
      </WrapItem>

      <WrapItem>
        <NumberInput
          ml={2}
          mr={8}
          w={28}
          min={1}
          max={maxPage}
          value={pageIndex + 1}
          onChange={(value) => setPageIndex(!!value ? Number(value) - 1 : 0)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </WrapItem>

      <WrapItem>
        <Select
          w={32}
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[6, 12, 24, 48, 96].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
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
        <Tooltip label="Last Page">
          <IconButton
            aria-label={'last-page'}
            onClick={() => setPageIndex(maxPage - 1)}
            isDisabled={pageIndex >= maxPage - 1}
            icon={<ArrowRightIcon h={3} w={3} />}
            ml={4}
          />
        </Tooltip>
      </WrapItem>
    </Wrap>
  </Center>
};

export default Pagination;

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, HStack, IconButton, Select, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface PaginationProps {
  page: number;
  perPage: number;
  setPerPage: Dispatch<SetStateAction<number>>;
  range: number;
  pageCount: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export const Pagination = ({
  page,
  perPage,
  setPerPage,
  range,
  pageCount,
  setPage,
}: PaginationProps) => {
  const calculateRange = () => {
    if (range > pageCount) range = pageCount;
    let start = page - Math.floor(range / 2);
    start = Math.max(start, 1);
    start = Math.min(start, pageCount - range + 1);
    const res = Array.from({ length: range }, (_el, i) => start + i);
    return res;
  };

  const renderPages = () => {
    const range = calculateRange();
    const pages = range.map((pageNumber) => (
      <Box
        onClick={() => {
          setPage(pageNumber);
        }}
        key={pageNumber}
        bgColor={pageNumber === page ? "gray.300" : "none"}
        as="button"
        w="1.5rem"
        borderRadius="50%"
      >
        {pageNumber}
      </Box>
    ));
    if (range[0] !== 1) pages.unshift(<span key="predot">...</span>);
    if (range[range.length - 1] !== pageCount)
      pages.push(<span key="postdot">...</span>);
    return [...pages];
  };

  return (
    <HStack justifyContent="flex-end" mt={2}>
      <IconButton
        onClick={() => {
          if (page > 1) setPage((prev) => prev - 1);
        }}
        icon={<ChevronLeftIcon />}
        aria-label="Previous page"
        size="xs"
        variant="unstyled"
        _focus={{ borderColor: "none" }}
      />
      <HStack spacing={0}>{renderPages()}</HStack>
      <IconButton
        onClick={() => {
          if (page < pageCount) setPage((prev) => prev + 1);
        }}
        icon={<ChevronRightIcon />}
        aria-label="Next page"
        size="xs"
        variant="unstyled"
        _focus={{ borderColor: "none" }}
      />
      <Text>Per page</Text>
      <Select
        size="xs"
        justifySelf="flex-end"
        w="4em"
        defaultValue={perPage}
        onChange={(e) => {
          setPerPage(parseInt(e.target.value));
        }}
      >
        {[10, 25, 50].map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>
    </HStack>
  );
};

import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "react-query";
import { HistoryApi } from "../services/api/History";
import { CSpinner } from "./utils/CSpinner";
import { NoDataFound } from "./utils/NoDataFound";
import { Pagination } from "./utils/Pagination";
import { SomethingWentWrong } from "./utils/SomethingWentWrong";
import { SortingArrow, SortOrder } from "./utils/SortingArrow";

export const Searches = () => {
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const query = useQuery(
    ["history", { page, perPage, sortBy, sortOrder }],
    () => HistoryApi.getHistory({ page, perPage, sortBy, sortOrder }),
    {
      select: (res) => res.data,
    }
  );

  if (query.isLoading) return <CSpinner />;
  if (!query.isSuccess) return <SomethingWentWrong />;
  if (Array.isArray(query.data.data) && query.data.data.length === 0)
    return <NoDataFound />;

  const handleSort = (col: string) => {
    if (col === sortBy) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortOrder("asc");
      setSortBy(col);
    }
  };

  const renderTbody = () => {
    const searches = query.data.data;
    return searches.map((search) => (
      <Tr key={search.id}>
        <Td isNumeric>{search.id}</Td>
        <Td>{search.word}</Td>
        <Td>{search.createdAt}</Td>
        <Td>{JSON.stringify(search.success)}</Td>
      </Tr>
    ));
  };

  return (
    <TableContainer w="100%" p={4} borderWidth="1px" borderColor="gray.300">
      <Table>
        <Thead cursor="pointer">
          <Tr>
            <Th
              onClick={() => {
                handleSort("id");
              }}
              isNumeric
            >
              Id {sortBy === "id" && <SortingArrow sortOrder={sortOrder} />}
            </Th>
            <Th
              onClick={() => {
                handleSort("word");
              }}
            >
              Word {sortBy === "word" && <SortingArrow sortOrder={sortOrder} />}
            </Th>
            <Th
              onClick={() => {
                handleSort("createdAt");
              }}
            >
              Created At{" "}
              {sortBy === "createdAt" && <SortingArrow sortOrder={sortOrder} />}
            </Th>
            <Th>Success</Th>
          </Tr>
        </Thead>
        <Tbody>{renderTbody()}</Tbody>
      </Table>
      <Pagination
        page={page}
        perPage={perPage}
        setPerPage={setPerPage}
        range={5}
        pageCount={query.data.meta.pageCount}
        setPage={setPage}
      />
    </TableContainer>
  );
};

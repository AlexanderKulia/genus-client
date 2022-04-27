import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { HistoryApi } from "../services/api/History";
import { CSpinner } from "./utils/CSpinner";
import { SomethingWentWrong } from "./utils/SomethingWentWrong";

interface TopSearchesProps {
  n: number;
}

export const TopSearches = ({ n }: TopSearchesProps) => {
  const query = useQuery(
    "topSearches",
    () => HistoryApi.getTopSearches({ n }),
    {
      select: (res) => res.data,
    }
  );

  if (query.isLoading) return <CSpinner />;
  if (!query.isSuccess) return <SomethingWentWrong />;

  return (
    <TableContainer w="100%" p={4} borderWidth="1px" borderColor="gray.300">
      <Table>
        <Thead>
          <Tr>
            <Th>Word</Th>
            <Th isNumeric>Count</Th>
          </Tr>
        </Thead>
        <Tbody>
          {query.data.map((item) => (
            <Tr key={item.word}>
              <Td>{item.word}</Td>
              <Td isNumeric>{item.count}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

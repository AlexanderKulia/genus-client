import { Box, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useQuery } from "react-query";
import { SearchApi } from "../services/api/Search";
import { CSpinner } from "./utils/CSpinner";

interface DisplayProps {
  word: string;
}

export const Display = ({ word }: DisplayProps) => {
  const { data, isSuccess, isLoading } = useQuery(
    ["word", word],
    () => SearchApi.findWord(word),
    { select: (res) => res.data, cacheTime: 0 }
  );

  if (isLoading)
    return (
      <Box h="90px" mb={10}>
        <CSpinner />
      </Box>
    );
  if (!isSuccess)
    return <Text fontSize="6xl">Not found. Try a different word</Text>;

  const appendGenera = () => {
    return (
      (data.m ? "der" : "") +
      (data.m && (data.f || data.n) ? ", " : "") +
      (data.f ? "die" : "") +
      (data.f && data.n ? ", " : "") +
      (data.n ? "das" : "") +
      " " +
      data.text
    );
  };

  return (
    <Box mb={10}>
      <NextLink href={`${data.wikiUrl}#German`} passHref>
        <Link
          _hover={{
            textDecoration: "none",
          }}
          fontSize="6xl"
          isExternal
        >
          {appendGenera()}
        </Link>
      </NextLink>
    </Box>
  );
};

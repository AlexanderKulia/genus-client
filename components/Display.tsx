import { Box, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { FunctionComponent } from "react";
import { Word } from "../services/api/Search";

interface DisplayProps {
  word: Word | undefined;
  success: boolean;
}

const Display: FunctionComponent<DisplayProps> = ({ word, success }) => {
  if (!word || !success)
    return (
      <Text fontSize="6xl" mb={40}>
        Not found. Try a different word
      </Text>
    );

  const appendGenders = () => {
    return (
      (word.m ? "der" : "") +
      (word.m && (word.f || word.n) ? ", " : "") +
      (word.f ? "die" : "") +
      (word.f && word.n ? ", " : "") +
      (word.n ? "das" : "") +
      " " +
      word.text
    );
  };

  return (
    <Box mb={40}>
      <NextLink href={`${word.wikiUrl}#German`} passHref>
        <Link
          _hover={{
            textDecoration: "none",
          }}
          fontSize="6xl"
          isExternal
        >
          {appendGenders()}
        </Link>
      </NextLink>
    </Box>
  );
};

export default Display;

import { Button, Checkbox, Flex } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const Practice = () => {
  const [failedOnly, setFailedOnly] = useState<boolean>(false);
  const router = useRouter();

  return (
    <Flex
      h="100%"
      justifyContent="center"
      alignItems="center"
      direction="column"
      gap={4}
    >
      <Button
        onClick={() => router.push(`/practice/new?failedOnly=${failedOnly}`)}
      >
        Start
      </Button>
      <Checkbox
        isChecked={failedOnly}
        onChange={() => {
          setFailedOnly((prev) => !prev);
        }}
      >
        Use only failed guesses
      </Checkbox>
    </Flex>
  );
};

export default Practice;

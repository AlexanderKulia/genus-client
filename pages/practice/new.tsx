import {
  Box,
  Center,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import PracticeResults from "../../components/PracticeResults";
import { CSpinner } from "../../components/utils/CSpinner";
import { SomethingWentWrong } from "../../components/utils/SomethingWentWrong";
import { GermanArticle } from "../../services/api";
import { PracticeApi } from "../../services/api/Practice";

interface FormData {
  [key: string]: GermanArticle;
}

const New: NextPage = () => {
  const router = useRouter();
  const { failedOnly } = router.query;
  const { handleSubmit, register, getValues } = useForm<FormData>();
  const wordsQuery = useQuery(
    "practice",
    () =>
      PracticeApi.getWords(
        10,
        typeof failedOnly === "string" ? failedOnly : "false"
      ),
    {
      select: (res) => res.data,
    }
  );
  const resultsQuery = useQuery(
    "results",
    () => PracticeApi.getResults(getValues()),
    {
      enabled: false,
      select: (res) => res.data,
      cacheTime: 0,
    }
  );

  const [activeIdx, setActiveIdx] = useState<number>(0);

  if (wordsQuery.isLoading) return <CSpinner />;
  if (!wordsQuery.isSuccess) return <SomethingWentWrong />;

  const onSubmit = handleSubmit(() => {
    resultsQuery.refetch();
  });

  const renderResults = () => {
    if (resultsQuery.isLoading) return <CSpinner />;
    if (resultsQuery.isSuccess)
      return <PracticeResults results={resultsQuery.data} />;
  };

  return (
    <Flex
      h="100%"
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <form onSubmit={onSubmit}>
        {wordsQuery.data.map((word) => (
          <Flex
            key={word.id}
            display={
              resultsQuery.isFetched
                ? "none"
                : wordsQuery.data[activeIdx].id === word.id
                ? "flex"
                : "none"
            }
            alignItems="center"
            direction="column"
          >
            <Text fontSize="6xl" mb={4}>
              {word.text}
            </Text>
            <RadioGroup
              onChange={() => {
                setTimeout(() => {
                  if (activeIdx < wordsQuery.data.length - 1) {
                    setActiveIdx((prev) => prev + 1);
                  } else {
                    onSubmit();
                  }
                }, 100);
              }}
            >
              <Stack direction="row">
                <Radio {...register(word.id.toString())} value="der">
                  der
                </Radio>
                <Radio {...register(word.id.toString())} value="die">
                  die
                </Radio>
                <Radio {...register(word.id.toString())} value="das">
                  das
                </Radio>
              </Stack>
            </RadioGroup>
          </Flex>
        ))}
      </form>
      {renderResults()}
    </Flex>
  );
};

export default New;

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Display from "../components/Display";
import { SearchApi, Word } from "../services/api/Search";

interface FormData {
  word: string;
}

const Home: NextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const [word, setWord] = useState<Word>();
  const [success, setSuccess] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false);
  const mutation = useMutation((word: string) => SearchApi.findWord(word), {
    onSuccess: (data) => {
      setWord(data.data);
      setSuccess(true);
    },
    onError: () => {
      setSuccess(false);
    },
    onSettled: () => {
      setTouched(true);
    },
  });

  const onSubmit = handleSubmit(({ word }) => {
    mutation.mutate(word);
  });

  return (
    <Flex
      h="100%"
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      {touched && <Display word={word} success={success} />}
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={!!errors.word}>
          <FormLabel htmlFor="word">Word</FormLabel>
          <Input
            id="word"
            placeholder="Word"
            {...register("word", {
              required: "This field is required",
            })}
          />
          <FormErrorMessage>
            {errors.word && errors.word.message}
          </FormErrorMessage>
        </FormControl>
        <Button mt={4} isLoading={isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </Flex>
  );
};

export default Home;

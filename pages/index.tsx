import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Display } from "../components/Display";

interface FormData {
  word: string;
}

const Home: NextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    resetField,
  } = useForm<FormData>();
  const [word, setWord] = useState<string>();
  const onSubmit = handleSubmit(({ word }) => {
    setWord(word);
    resetField("word");
  });

  return (
    <Flex
      h="100%"
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      {word && <Display word={word} />}
      <form onSubmit={onSubmit} style={{ width: "30%" }}>
        <VStack>
          <FormControl isInvalid={!!errors.word}>
            <Input
              id="word"
              placeholder="Enter word"
              {...register("word", {
                required: "This field is required",
              })}
              size="lg"
            />
            <FormErrorMessage>
              {errors.word && errors.word.message}
            </FormErrorMessage>
          </FormControl>
          <Button mt={4} isLoading={isSubmitting} type="submit" size="lg">
            Submit
          </Button>
        </VStack>
      </form>
    </Flex>
  );
};

export default Home;

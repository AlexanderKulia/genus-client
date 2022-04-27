import { Center, Text, VStack } from "@chakra-ui/react";
import { Searches } from "../components/Searches";
import { TopSearches } from "../components/TopSearches";

const History = () => {
  return (
    <Center>
      <VStack w="50%" spacing={5} mt={5}>
        <Text alignSelf="flex-start" fontSize="xl">
          Top 10 searched words
        </Text>
        <TopSearches n={10} />
        <Text alignSelf="flex-start" fontSize="xl">
          Your searches
        </Text>
        <Searches />
      </VStack>
    </Center>
  );
};

export default History;

import { Grid, GridItem } from "@chakra-ui/react";
import { Fragment } from "react";
import { PracticeResults } from "../services/api/Practice";

interface PraticeResultsProps {
  results: PracticeResults;
}

const PracticeResults = ({ results }: PraticeResultsProps) => {
  return (
    <Grid templateColumns={"repeat(4,1fr)"} gap={6}>
      <GridItem>Word</GridItem>
      <GridItem>Your guess</GridItem>
      <GridItem>Correct genera</GridItem>
      <GridItem>Success</GridItem>
      {Object.entries(results).map(([wordIdString, details]) => {
        return (
          <Fragment key={wordIdString}>
            <GridItem>{details.word}</GridItem>
            <GridItem>{details.guess}</GridItem>
            <GridItem>{details.genera.join(", ")}</GridItem>
            <GridItem color={details.success ? "green" : "red"}>
              {JSON.stringify(details.success)}
            </GridItem>
          </Fragment>
        );
      })}
    </Grid>
  );
};

export default PracticeResults;

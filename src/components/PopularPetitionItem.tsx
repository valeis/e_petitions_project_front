import { Link } from "react-router-dom";
import { CircularProgress, CircularProgressLabel, HStack, Heading } from "@chakra-ui/react";

import { Petition } from "types";

interface PopularPetitionItemProps {
  petition: Petition;
}

export const PopularPetitionItem = ({ petition }: PopularPetitionItemProps) => {
  const { petition_id, title, current_votes, vote_goal } = petition;

  const progress = Math.floor((current_votes / vote_goal) * 100);

  return (
    <Link to={`/petitions/${petition_id}`}>
      <HStack spacing={4} role="group" w="full" justifyContent="space-between">
        <Heading size="sm" transition="all 0.2s" _groupHover={{ color: "primary.500" }}>
          {title}
        </Heading>
        <CircularProgress value={progress} color="blue.500" size="50px" thickness="5px">
          <CircularProgressLabel>{progress}%</CircularProgressLabel>
        </CircularProgress>
      </HStack>
    </Link>
  );
};

import { Link } from "react-router-dom";
import { CircularProgress, CircularProgressLabel, HStack, Heading } from "@chakra-ui/react";

import { Petition } from "types";

interface PopularPetitionItemProps {
  petition: Petition;
}

export const PopularPetitionItem = ({ petition }: PopularPetitionItemProps) => {
  const { id, name, nrSign, nrsignneeded } = petition;

  const progress = Math.floor((nrSign / nrsignneeded) * 100);

  return (
    <Link to={`/petitions/${id}`}>
      <HStack spacing={4} role="group" w="full" justifyContent="space-between">
        <Heading size="sm" transition="all 0.2s" _groupHover={{ color: "primary.500" }}>
          {name}
        </Heading>
        <CircularProgress value={progress} color="blue.500" size="50px" thickness="5px">
          <CircularProgressLabel>{progress}%</CircularProgressLabel>
        </CircularProgress>
      </HStack>
    </Link>
  );
};

import { VStack } from "@chakra-ui/react";
import { IPetition } from "types";
import { PopularPetitionItem } from "./PopularPetitionItem";

interface PopularPetitionListProps {
  petitions: IPetition[];
}

export const PopularPetitionsList = ({ petitions }: PopularPetitionListProps) => {
  return (
    <VStack spacing={4} alignItems="stretch" w="full">
      {petitions.map((petition) => (
        <PopularPetitionItem petition={petition} key={petition.petition_id} />
      ))}
    </VStack>
  );
};

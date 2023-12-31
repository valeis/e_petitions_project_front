import { Box, Flex, VStack, Container } from "@chakra-ui/react";

import { IPetition } from "types";
import { PetitionCard } from "./PetitionCard";
import { Loader } from "./Loader";
import { Pagination } from "./Pagination";
import PetitionsCarousel from "./PetitionCarousel";

interface PetitionsListProps {
  petitions: IPetition[];
  isLoading?: boolean;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export const PetitionsList = ({
  petitions,
  isLoading,
  page,
  totalPages,
  setPage,
}: PetitionsListProps) => {
  console.log(">>> petitions mata",petitions)
  return (
    <VStack spacing={4} alignItems="stretch" w="full" mb={8}>
      {isLoading ? (
        <Flex w="full" justifyContent="center" pt={8}>
          <Loader />
        </Flex>
      ) : petitions? (
        <>
         <Container maxWidth={"90%"} alignItems="center"  display="flex" >
          <PetitionsCarousel petitions={petitions} />
         </Container>
        </>
      ) : (
        <Box w="full" textAlign="center" color="gray.500" fontSize="lg" py={8}>
          Nu există petiții
        </Box>
      )}
    </VStack>
  );
};

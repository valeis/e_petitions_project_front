import { Box, HStack, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { IPetition, PetitionStatus } from "types";
import { petitions } from "api";
import { PetitionsList, PopularPetitionsList } from "components";
import { petitions as popularPetitionsData } from "data/petitions.json";
import { useUser } from "hooks";

const statutes = Object.values(PetitionStatus).map((statut) => ({
  label: statut,
  value: statut,
  color: "blue",
}));

export const PetitionsSection = () => {
  const { user } = useUser();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 5;

  const pages = 10;

  const { data, isFetching, isLoading, isSuccess } = useQuery({
    queryKey: [
      "petitions",
      {
        page,
        limit,
      },
    ],
    queryFn: async () => {
      return await petitions.getList({ page, limit });
    },
  });

  const updateSearchParams = (key: string, value: string | number | boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value.toString());
    setSearchParams(params.toString());
  };

  const setPage = (page: number) => {
    updateSearchParams("page", page);
  };

  return (
    <HStack>
      <VStack>
        {data && isSuccess ? (
          <PetitionsList
            isLoading={isFetching || isLoading}
            petitions={data as IPetition[]}
            page={parseInt(`${page}`)}
            setPage={setPage}
            totalPages={pages}
          />
        ) : (
          <Box w="full" textAlign="center" color="gray.500" fontSize="lg" py={8}>
            Nu există petiții
          </Box>
        )}
      </VStack>
    </HStack>
  );
};

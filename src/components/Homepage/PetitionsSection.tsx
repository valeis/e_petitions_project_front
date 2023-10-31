import {
  HStack,
  VStack,
  Heading,
  Select,
  Button,
  Tab,
  TabList,
  Tabs,
  Checkbox, Container,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { IPetition, PetitionStatus } from "types";
import { petitions } from "api";
import { PetitionsList, PopularPetitionsList } from "components";
import { petitions as popularPetitionsData } from "data/petitions.json";
import { useUser } from "hooks";
import { stat } from "fs";

const statutes = Object.values(PetitionStatus).map((statut) => ({
  label: statut,
  value: statut,
  color: "blue",
}));

export const PetitionsSection = () => {
  const { user } = useUser();

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "newest";
  //TODO: change hardcoded page and limit
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 5;
  const search = searchParams.get("search") || "";
  // const statut = searchParams.get("statut") || PetitionStatus.ALL;

  const pages = 10;

  const { data, isFetching, isLoading, isSuccess } = useQuery({
    queryKey: [
      "petitions",
      {
        sortBy,
        page,
        limit,
        search,
      },
    ],
    queryFn: () => petitions.getList({page, limit}),
  });

  const updateSearchParams = (key: string, value: string | number | boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value.toString());
    setSearchParams(params.toString());
  };

  const setPage = (page: number) => {
    updateSearchParams("page", page);
  };

  // console.log(data);

  const publicPet = data?.filter((pet: IPetition) => pet.status.status.match("PUBLIC"));


  // console.log(publicPet);

  return (
    <HStack >
      <VStack >
        {isSuccess && (
          <PetitionsList
            isLoading={isFetching || isLoading}

            petitions={publicPet as IPetition[]}
            page={parseInt(`${page}`)}
            setPage={setPage}
            totalPages={pages}
          />
        )}
      </VStack>
    </HStack>
  );
};

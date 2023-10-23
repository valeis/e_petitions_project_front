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

  const category = searchParams.get("category") || "all";
  const sortBy = searchParams.get("sortBy") || "newest";
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 5;
  const search = searchParams.get("search") || "";
  const statut = searchParams.get("statut") || PetitionStatus.ALL;

  const pages = 10;

  const { data: categories, isSuccess: isCategoriesSuccess } = useQuery({
    queryKey: ["categories"],
    queryFn: petitions.getCategories,
  });

  const { data, isFetching, isLoading, isSuccess } = useQuery({
    queryKey: [
      "petitions",
      {
        category,
        sortBy,
        page,
        limit,
        search,
      },
    ],
    queryFn: () => petitions.getList({page, limit}),
    select: (data) => {

      const filteredByCategory =
        category !== "all"
          ?data?.filter((petition: IPetition) => petition.category === category)
          : data;
      const filteredBySearch = search
        ? filteredByCategory?.filter((petition: IPetition) =>
            petition.title.toLowerCase().includes(search.toLowerCase()),
          )
        : filteredByCategory;
      const filteredBystatut =
        statut !== PetitionStatus.ALL
          ? filteredBySearch?.filter(
              (petition: IPetition) => petition.status.status === statut.replace("+", " "),
            )
          : filteredBySearch;
      const sorted =
        sortBy === "newest"
          ? filteredBystatut?.sort((a: any, b: any) => {
              const dateA = new Date(a.created_at);
              const dateB = new Date(b.created_at);
              return dateB.getTime() - dateA.getTime();
            })
          : filteredBystatut?.sort((a: any, b: any) => b.current_votes - a.current_votes);

      return sorted;
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

  const setCategory = (category: string) => {
    updateSearchParams("category", category);
  };

  const setSortBy = (sortBy: string) => {
    updateSearchParams("sortBy", sortBy);
  };

  const setStatut = (statut: string) => {
    updateSearchParams("statut", statut);
  };


  return (

    <HStack >
      <VStack >
        {isSuccess && (
          <PetitionsList
            isLoading={isFetching || isLoading}
            petitions={data as unknown as IPetition[]}
            page={parseInt(`${page}`)}
            setPage={setPage}
            totalPages={pages}
          />
        )}
      </VStack>
    </HStack>

  );
};

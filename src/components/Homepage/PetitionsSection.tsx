import {
  HStack,
  VStack,
  Heading,
  Select,
  Button,
  Tab,
  TabList,
  Tabs,
  Checkbox,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { Petition, PetitionStatus } from "types";
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
          ?data?.filter((petition: Petition) => petition.category === category)
          : data;
      const filteredBySearch = search
        ? filteredByCategory?.filter((petition: Petition) =>
            petition.title.toLowerCase().includes(search.toLowerCase()),
          )
        : filteredByCategory;
      const filteredBystatut =
        statut !== PetitionStatus.ALL
          ? filteredBySearch?.filter(
              (petition: Petition) => petition.status === statut.replace("+", " "),
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
    <HStack
      as="section"
      w="full"
      h="max-content"
      justifyContent="space-between"
      alignItems="stretch"
      py={20}
    >
      <VStack spacing={6} flex="2" borderRight="1px" borderColor="gray.200" pr={10}>
        <Heading size="xl" mb={4} alignSelf="center">
          {search ? `Rezultatele căutării pentru "${search}"` : "Petiții"}
        </Heading>
        <VStack spacing={4} w="full" alignItems="start">
          <HStack w="full" justifyContent="space-between" alignItems="center">
            <Select
              w="xs"
              rounded="full"
              defaultValue={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {isCategoriesSuccess &&
                categories?.length &&
                categories.map((category: any) => (
                  <option value={category.value} key={category.value}>
                    {category.label}
                  </option>
                ))}
            </Select>

            <HStack h="40px" spacing={4}>
              <Button
                variant={sortBy === "newest" ? "outline" : "ghost"}
                colorScheme="blue"
                onClick={() => setSortBy("newest")}
                rounded="full"
              >
                Cele mai noi
              </Button>
              <Button
                variant={sortBy === "popular" ? "outline" : "ghost"}
                colorScheme="blue"
                onClick={() => setSortBy("popular")}
                rounded="full"
              >
                Cele mai populare
              </Button>
            </HStack>
          </HStack>
        </VStack>

        <Tabs w="full">
          <TabList>
            {statutes.map((statut) => (
              <Tab key={statut.value} onClick={() => setStatut(statut.value)}>
                {statut.label}
              </Tab>
            ))}
          </TabList>
        </Tabs>

        {isSuccess && (
          <PetitionsList
            isLoading={isFetching || isLoading}
            petitions={data as unknown as Petition[]}
            page={parseInt(page)}
            setPage={setPage}
            totalPages={pages}
          />
        )}
      </VStack>

      <VStack spacing={6} flex="1" pl={7}>
        <Heading size="xl" mb={4}>
          Trending
        </Heading>
        <PopularPetitionsList
          petitions={popularPetitionsData.slice(0, 5) as unknown as Petition[]}
        />
      </VStack>
    </HStack>
  );
};

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
  // color: "blue",
}));

export const PetitionsSection = () => {
  const { user } = useUser();

  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "all";
  const sortBy = searchParams.get("sortBy") || "newest";
  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";
  const statut = searchParams.get("statut") || PetitionStatus.ALL;
  const availableByLocation = searchParams.get("availableByLocation") || "false";

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
        search,
      },
    ],
    queryFn: () => petitions.getList({ category, sortBy, page, search }),
    select: (data) => {
      const availableByLocationData =
        availableByLocation === "true" && user?.locatie
          ? data?.filter(
              (petition: Petition) =>
                petition?.locatie === user?.locatie || petition?.toWho !== "Primar",
            )
          : data;
      console.log(data, availableByLocation);
      const filteredByCategory =
        category !== "all"
          ? availableByLocationData?.filter((petition: Petition) => petition.category === category)
          : availableByLocationData;
      const filteredBySearch = search
        ? filteredByCategory?.filter((petition: Petition) =>
            petition.name.toLowerCase().includes(search.toLowerCase()),
          )
        : filteredByCategory;
      const filteredBystatut =
        statut !== PetitionStatus.ALL
          ? filteredBySearch?.filter(
              (petition: Petition) => petition.statut === statut.replace("+", " "),
            )
          : filteredBySearch;
      const sorted =
        sortBy === "newest"
          ? filteredBystatut?.sort((a: any, b: any) => {
              const dateA = new Date(a.date);
              const dateB = new Date(b.date);
              return dateB.getTime() - dateA.getTime();
            })
          : filteredBystatut?.sort((a: any, b: any) => b.nrSign - a.nrSign);

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

  const setstatut = (statut: string) => {
    updateSearchParams("statut", statut);
  };

  const setAvailableByLocation = (availableByLocation: boolean) => {
    updateSearchParams("availableByLocation", availableByLocation);
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
          <Checkbox
            isChecked={availableByLocation === "true"}
            onChange={(e) => setAvailableByLocation(e.target.checked)}
          >
            Doar petiții din regiunea mea
          </Checkbox>
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
              <Tab key={statut.value} onClick={() => setstatut(statut.value)}>
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

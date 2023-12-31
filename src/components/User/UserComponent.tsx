// src/UserComponent.tsx
import React, {useState} from 'react';
import {Button, Container, HStack, VStack} from "@chakra-ui/react";
import {PetitionsList} from "../PetitionsList";
import {IPetition} from "../../types";
import {useSearchParams} from "react-router-dom";

interface UserComponentProps {
  loading: boolean;

  petitions: IPetition[];
  votedPetitions: IPetition[];
}


export const UserComponent: React.FC<UserComponentProps> = ({  loading, petitions, votedPetitions }) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [variant, setVariant] = useState("solid");
  const updateSearchParams = (key: string, value: string | number | boolean) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key, value.toString());
        setSearchParams(params.toString());
    };

    const setPage = (page: number) => {
        updateSearchParams("page", page);
    };
    console.log("fjfdakfdjaf" ,petitions);
  return (
    

              <VStack mt={5}>
                  <Container maxWidth={"90%"} mb={5} >
                    <HStack spacing={4}>
                      <Button
                          colorScheme="messenger"
                          onClick={() => setVariant("solid")}
                          variant={variant === "solid" ? "solid" : "ghost"}
                          size="md"
                          borderRadius={"full"}
                          fontSize={15}
                          fontWeight="normal"
                      >
                          Petițiile tale
                      </Button>
                      <Button
                        colorScheme="messenger"
                        onClick={() => setVariant("ghost")}
                        variant={variant === "ghost" ? "solid" : "ghost"}
                        size="md"
                        borderRadius={"full"}
                        fontSize={15}
                        fontWeight="normal"
                      >
                        Drafturile tale
                      </Button>
                      <Button
                          colorScheme="messenger"
                          onClick={() => setVariant("outline")}
                          variant={variant === "outline" ? "solid" : "ghost"}
                          size="md"
                          borderRadius={"full"}
                          fontSize={15}
                          fontWeight="normal"
                      >
                          Petiții votate de tine
                      </Button>
                    </HStack>
                  </Container>
                      <PetitionsList
                          isLoading={loading}
                          petitions={variant === "solid"
                            ? (petitions)
                            : variant === "ghost"
                              ? (petitions)
                              : (votedPetitions)
                          }
                          page={parseInt(`${2}`)}
                          totalPages={1}
                          setPage={setPage}/>
              </VStack>

     
  );
};


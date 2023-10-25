// src/UserComponent.tsx
import React, {useState} from 'react';
import {Button, Container, VStack} from "@chakra-ui/react";
import {PetitionsList} from "../PetitionsList";
import {IPetition} from "../../types";
import {useSearchParams} from "react-router-dom";

interface UserComponentProps {
  loading: boolean;

  petitions:IPetition[];

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
    console.log(petitions.user_petitions);
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (

              <VStack mt={5}>
                  <Container maxWidth={"90%"} mb={5} >
                      <Button
                          colorScheme="messenger"
                          onClick={() => setVariant("solid")}
                          variant={variant === "solid" ? "solid" : "ghost"}
                          size="lg"
                          borderRadius={"full"}
                          fontSize={13}
                          fontWeight="normal"
                          mr = {13}
                      >
                          Your Petitions
                      </Button>
                      <Button
                        colorScheme="messenger"
                        onClick={() => setVariant("draft")}
                        variant={variant === "draft" ? "solid" : "ghost"}
                        size="lg"
                        borderRadius={"full"}
                        fontSize={13}
                        fontWeight="normal"
                        mr = {13}
                      >
                        Your Draft Petitions
                      </Button>
                      <Button
                          colorScheme="messenger"
                          onClick={() => setVariant("outline")}
                          variant={variant === "outline" ? "solid" : "ghost"}
                          size="lg"
                          borderRadius={"full"}
                          fontSize={13}
                          fontWeight="normal"
                      >
                          Your Voted Petitions
                      </Button>
                  </Container>
                      <PetitionsList
                          isLoading={loading}
                          petitions={variant === "solid"
                            ? (petitions.user_petitions as unknown as IPetition[]).filter(petition => petition.status.status !=="DRAFT")
                            : variant === "draft"
                              ? (petitions.user_petitions as unknown as IPetition[]).filter(petition => petition.status.status === "DRAFT")
                              : (votedPetitions.user_voted_petitions as unknown as IPetition[])
                          }
                          page={parseInt(`${2}`)}
                          totalPages={1}
                          setPage={setPage}/>

              </VStack>

      )}
    </div>
  );
};


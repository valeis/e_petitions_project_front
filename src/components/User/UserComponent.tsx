// src/UserComponent.tsx
import React, {useState} from 'react';
import {Button, Container, Heading, HStack, VStack, Box} from "@chakra-ui/react";
import {PetitionsList} from "../PetitionsList";
import {IPetition} from "../../types";
import {useSearchParams} from "react-router-dom";

interface UserComponentProps {
  user: any[];
  loading: boolean;
  petitions:{
    user_petitions:{
        petition_id: number;
        title: string;
        category: string;
        description: string;
        image: string;
        status: Status;
        user_id: number
        created_at: string;
        vote_goal: number;
        current_votes: number;
        semnat?: string;
        exp_date: string;
    }
  }
  votedPetitions: {
    user_voted_petitions:{
        petition_id: number;
        title: string;
        category: string;
        description: string;
        image: string;
        status: Status;
        user_id: number
        created_at: string;
        vote_goal: number;
        current_votes: number;
        semnat?: string;
        exp_date: string;
    }
  }
}

interface Status{
    id: number;
    status: string;
}

export const UserComponent: React.FC<UserComponentProps> = ({ user, loading, petitions, votedPetitions }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [showVoted, setShowVoted] = useState(false);
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
                            ? (petitions.user_petitions as unknown as IPetition[])
                            : (votedPetitions.user_voted_petitions as unknown as IPetition[])}
                        page={parseInt(`${2}`)}
                        totalPages={1}
                        setPage={setPage}
                      />
              </VStack>

      )}
    </div>
  );
};

export default UserComponent;

import {Box, Heading, Stack, VStack, Text, useBreakpointValue, Center, Container, Flex} from "@chakra-ui/react";
import React from "react";

interface UserBannerProps {
  user: {
    "email ":string;
  }
  loading: boolean;
  petitions:{
    user_petitions:{
      petition_id: number;
      title: string;
      category: string;
      description: string;
      image: string;
      status: {
        id: number;
        status: string;
      };
      'user-id': number;
      vote_goal: number;
      current_votes: number;
      exp_date: string;
      updated_at: string;
      created_at: string;
    }
  }
  votedPetitions: {  user_voted_petitions:
          {
          petition_id: number;
          title: string;
          category: string;
          description: string;
          image: string;
          status: {
              id: number;
              status: string;
          };
          'user-id': number;
          vote_goal: number;
          current_votes: number;
          exp_date: string;
          updated_at: string;
          created_at: string;
      }
  }
}


export const UserBanner: React.FC<UserBannerProps> = ({ user, petitions, votedPetitions }) => {

  return (
<Container maxWidth={"90%"}>
      <Heading textAlign="left" mt={2}>Pagina Utilizatorului</Heading>
      <Box bgImage="url('src/data/images/yellow.png')" p={4} borderRadius="lg" mt={2}>
        <VStack align="left" spacing={4}>
          <Text color={"white"}
            fontSize={{ base: "14px", md: "16px" }}
          ><b>Email:</b> {user["email"]}
          </Text>
            {petitions.user_petitions && (
                <Text color={"white"} fontSize={{ base: "14px", md: "16px" }}>
                    <b>Nr. of posted petitions:</b> {Object.keys(petitions.user_petitions).length}
                </Text>
            )}
            {votedPetitions.user_voted_petitions && (
                <Text  color={"white"} fontSize={{ base: "14px", md: "16px" }}>
                    <b>Nr. of voted petitions:</b> {Object.keys(votedPetitions.user_voted_petitions).length}
                </Text>
            )}
        </VStack>
      </Box>
</Container>
  );
};

export default UserBanner;

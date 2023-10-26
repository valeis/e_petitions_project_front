import {Box, Heading, Stack, VStack, Text, useBreakpointValue, Center, Container, Flex} from "@chakra-ui/react";
import React from "react";
import {IPetition} from "../../types";

interface UserBannerProps {
  user: {
    "email ":string;
  }
  loading: boolean;
  petitions:IPetition[];

  votedPetitions: IPetition[];
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

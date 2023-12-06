import {Box, Heading, Stack, VStack, Text, useBreakpointValue, Center, Container, Flex} from "@chakra-ui/react";
import React from "react";
import {IPetition} from "../../types";

interface UserBannerProps {
 user: any;
  petitions:{
    user_petitions:IPetition[];
  }

  votedPetitions:{
    user_voted_petitions:IPetition[];
  }
}


export const UserBanner: React.FC<UserBannerProps> = ({ user, petitions, votedPetitions }) => {
  console.log(">>> email",user)
  return (
<Container maxWidth={"90%"}>

      <Heading textAlign="left" my={7}>Pagina Utilizatorului</Heading>
      <Box bgImage="url('../src/data/images/yellow.png')"  bgSize="cover"
           bgPosition="center"
           bgRepeat="no-repeat" p={4} borderRadius="lg" mt={2}>
        <VStack align="left" spacing={4}>
          <Text color={"white"} fontSize={{ base: "14px", md: "16px" }}><b>Adresă email: </b>{user}
          </Text>
            {petitions.user_petitions && (
                <Text color={"white"} fontSize={{ base: "14px", md: "16px" }}>
                    <b>Nr. of posted petitions:</b> {petitions.user_petitions.length}
                </Text>
            )}
            {votedPetitions.user_voted_petitions  && (
                <Text  color={"white"} fontSize={{ base: "14px", md: "16px" }}>
                    <b>Nr. of voted petitions:</b> {votedPetitions.user_voted_petitions.length}
              </Text>
            )}
        </VStack>
      </Box>
</Container>
  );
};

export default UserBanner;

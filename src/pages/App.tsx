import { Container, Box, Button } from "@chakra-ui/react";
import { PetitionsSection, Layout } from "components";
import Banners from "components/Homepage/Banners";
import { Link } from "react-router-dom";

export const App = () => {
  return (
     <Layout>
      <Container maxW="10xl">
        <Banners />
        <PetitionsSection />

        <Box position="relative" display="flex" justifyContent="flex-end" alignItems="flex-end" bottom="10px" right="40px" color={"#4478ff"}>
        <Link to="/petition/create">
          <Button position="fixed" bottom="8" right="8" colorScheme="messenger" size="lg"  bgColor="messenger" borderRadius={"full"} fontSize={15} fontWeight="normal">
            Creați o petiție
          </Button>
        </Link>
      </Box>

      </Container>
    </Layout>
  );
};

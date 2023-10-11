import { Container } from "@chakra-ui/react";
import { PetitionsSection, Layout } from "components";

export const App = () => {
  return (
    <Layout>
      {/* <HomeHero /> */}
      <Container maxW="7xl">
        <PetitionsSection />
      </Container>
    </Layout>
  );
};

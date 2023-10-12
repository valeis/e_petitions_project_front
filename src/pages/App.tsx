import { Container } from "@chakra-ui/react";
import { PetitionsSection, Layout } from "components";

export const App = () => {
  return (
    <Layout>
      {/* <HomeHero /> */}
      <Container maxW="8xl">
        <PetitionsSection />
      </Container>
    </Layout>
  );
};

import { AddIcon } from "@chakra-ui/icons";
import { Container, Box, Button, useDisclosure } from "@chakra-ui/react";
import { PetitionsSection, Layout } from "components";
import { LoginModal } from "components/Auth/LoginModal";
import Banners from "components/Homepage/Banners";
import { on } from "events";
import { Link, useNavigate } from "react-router-dom";

export const App = () => {

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Layout>
      <Container maxW="10xl">
        <Banners />
        <PetitionsSection />
        <Box
          position="relative"
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          bottom="10px"
          right="40px"
          color={"#4478ff"}
        >
          <Button
            onClick={() => {
              if (localStorage.getItem("userId") === null) {
                onOpen();
              } else {
                navigate('/petition/create');
              }
            }}
            display="flex"
            gap="10px"
            alignItems="center"
            position="fixed"
            bottom="8"
            right="8"
            colorScheme="messenger"
            size="lg"
            bgColor="messenger"
            borderRadius={"full"}
            fontSize={15}
            fontWeight="normal"
            boxShadow="lg"
          >
            <AddIcon />
            Creați o petiție
          </Button>
        </Box>
        <LoginModal isOpen={isOpen} onClose={onClose} />
      </Container>
    </Layout>
  );
};

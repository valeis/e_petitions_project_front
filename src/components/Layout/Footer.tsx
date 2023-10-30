import {
  Stack,
  Text,
  Link,
  Grid,
  useColorModeValue,
  Image,
  GridItem,
  Flex,
  HStack,
  VStack,
  Container
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import logo from "../../public/utm-logo.svg";
import appLogo from "../../public/E-Petiții.svg";

const getCurrentYear = () => {
  return new Date().getFullYear();
};

export const Footer = () => {
  const currentYear = getCurrentYear();

  return (
    <Stack borderTopWidth={1} borderStyle={"solid"} py={5}>
      <Container maxWidth="90%">
        <HStack justifyContent="center" spacing={10}>
          <VStack>
            <Image src={logo} boxSize="70px" />
            <Image src={appLogo} width="70px" height="auto" />
          </VStack>
          <VStack spacing={5} alignSelf="center">
            <Flex justifyContent="center" gap="50px">
              <Link href={"https://utm.md/"} fontSize={"sm"}>
                Pagina principală
              </Link>
              <Link href={"https://utm.md/politica-de-confidentialitate/"} fontSize={"sm"}>
                Politică de confidențialitate
              </Link>
              <Link
                href={
                "https://utm.md/contacte-utm/"
                }
                fontSize={"sm"}
              >
                Contacte
              </Link>
              <Link href={"#"} fontSize={"sm"}>
                Admin
              </Link>
              <RouterLink to="/developers" style={{ fontSize: 14 }}>
                <Text _hover={{ textDecoration: "underline" }}>Developers</Text>
              </RouterLink>
            </Flex>
            <Text fontSize="sm">
              © {currentYear} Team 02 | Toate drepturile rezervate
            </Text>
          </VStack>
        </HStack>
      </Container>
    </Stack>
  );
};

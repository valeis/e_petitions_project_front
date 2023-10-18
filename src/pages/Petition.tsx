import {ChevronRightIcon} from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Flex,
  HStack,
  Heading,
  Stack,
  VStack,
  Text,
  Tag,
  Box,
  IconButton,
  Button,
} from "@chakra-ui/react";
import {useQuery} from "@tanstack/react-query";
import {petitions} from "api";
import {Layout, Loader, PetitionProgressCard} from "components";
import {FaFacebook, FaTwitter, FaEnvelope, FaLink} from "react-icons/fa";
import {useParams} from "react-router-dom";

import {IPetition} from "../types";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {useUser} from "hooks";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
export const Petition = () => {
  const params = useParams();
  const {user} = useUser();
  const id = params.petitionId;
  // @ts-ignore
  const href = import.meta.env.BASE_URL;



  const {data: data, isLoading, isSuccess} = useQuery({
    queryKey: ['petition', id],
    queryFn: async () => {
      const petitionData = await petitions.getById(id as string);

      return petitionData;
    },
  });

  const petition = data as IPetition;
  const hasInitiatedPetition = petition?.user_id == user?.userId;

  const generatePDF = async () => {
    const documentDefinition = {
      content: [
        {
          columns: [
            { width: "*", text: "" },
            {
              width: "auto",
              text: `${petition?.created_at}`,
              fontSize: 10,
              alignment: "right",
            },
          ],
          columnGap: 10,
          marginTop: 10,
        },
        {
          text: petition?.title,
          fontSize: 16,
          bold: true,
          marginTop: 20,
          alignment: "center",
        },
        { text: petition?.description, fontSize: 12, marginTop: 24 },
        {
          text: [{ text: "Inițiat de: ", bold: true }, petition?.user_id],
          fontSize: 12,
          marginTop: 24,
        },
        {
          text: [{ text: "Numărul de semnături: ", bold: true }, petition?.current_votes],
          fontSize: 12,
          marginTop: 8,
        },
      ],
      footer: {
        columns: [
          {
            width: "*",
            text: "",
          },
        ],
      },
    };

    // @ts-ignore
    const pdfDocument = pdfMake.createPdf(documentDefinition);
    pdfDocument.download(`Petitie-#${id}.pdf`);
  };

  return (
    <Layout>
      {isLoading ? (
        <Flex w={"full"} h="100vh" justifyContent="center" mt={20} color="white">
          <Loader/>
        </Flex>
      ) : isSuccess ? (
        <>
          <Flex w={"full"} h="200px" bg="primary.600" color="white">
            <VStack w={"full"} justify={"center"} px={8}>
              <Stack w="full" maxW={"8xl"} align={"flex-start"} justifyContent="start" spacing={6}>
                <Breadcrumb spacing="8px" separator={<ChevronRightIcon/>}>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={href}>Acasa</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href="#">Petiția #{id}</BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
                <Heading as="h1" size="2xl" my={4}>
                  Petiția #{id}
                </Heading>
              </Stack>
            </VStack>
          </Flex>
          <Container maxW="8xl" px={0} pb="100px">
            <HStack spacing={24} my={8} alignItems="start" position="relative">
              <VStack w="full" align={"flex-start"} justifyContent="start">
                <Heading as="h2" size="2xl" my={4}>
                  {petition?.title}
                </Heading>

                <Heading as="h3" size="sm" pt={4} pb={2} fontFamily="serif" fontWeight={400}>
                  <span style={{fontWeight: "bold"}}>Inițiator:</span> {petition?.user_id}
                </Heading>

                <Heading as="h3" size="sm" fontFamily="serif" pb={2} fontWeight={400}>
                  <span style={{fontWeight: "bold"}}>Data depunerii:</span>{" "}
                  {petition?.created_at}
                </Heading>
                {petition?.exp_date && (
                  <Heading as="h3" size="sm" fontFamily="serif" fontWeight={400}>
                    <span style={{fontWeight: "bold"}}>Data limită:</span>{" "}
                    {petition.exp_date}
                  </Heading>
                )}

                <Text fontSize="lg" pt={8} pb={2} whiteSpace="pre-line">
                  {petition.description}
                </Text>

                <HStack pt={4} pb={2}>
                  <Heading as="h3" size="sm" fontFamily="serif" fontWeight={400}>
                    <span style={{fontWeight: "bold"}}>Categorie:</span>{" "}
                  </Heading>
                  <Tag>{petition.category}</Tag>
                </HStack>
              </VStack>
              <Box w="280px" position="sticky" top={4}>
                <PetitionProgressCard petition={petition} />
                {hasInitiatedPetition && (
                  <Button w="full" colorScheme="red" mt={8} onClick={generatePDF}>
                    Salvează ca PDF
                  </Button>
                )}
                <VStack w="full" align={"flex-start"} justifyContent="start" spacing={4} pt={12}>
                  <Heading as="h3" size="sm" fontFamily="serif" fontWeight={400}>
                    Distribuie petiția
                  </Heading>
                  <HStack spacing={4}>
                    <IconButton
                      aria-label="Share on Facebook"
                      icon={<FaFacebook/>}
                      rounded="full"
                    />
                    <IconButton aria-label="Share on Twitter" icon={<FaTwitter/>} rounded="full"/>
                    <IconButton aria-label="Share on Email" icon={<FaEnvelope/>} rounded="full"/>
                    <IconButton aria-label="Copy link" icon={<FaLink/>} rounded="full"/>
                  </HStack>
                </VStack>
              </Box>
            </HStack>
          </Container>
        </>
      ) : (
        <Text>Something went wrong</Text>
      )}
    </Layout>
  );
};

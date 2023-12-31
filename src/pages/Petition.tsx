import {
  Container,
  Flex,
  HStack,
  Heading,
  VStack,
  Text,
  Tag,
  Box,
  IconButton,
  Button,
} from "@chakra-ui/react";
import {useQuery} from "@tanstack/react-query";
import {petitions} from "api";
import {users} from "api";
import {Layout, Loader, PetitionProgressCard} from "components";
import {FaFacebook, FaTwitter, FaEnvelope, FaLink} from "react-icons/fa";
import {useParams} from "react-router-dom";

import {IPetition} from "../types";
import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
import {useUser} from "hooks";

// pdfMake.vfs = pdfFonts.pdfMake.vfs;
export const Petition = () => {
  const params = useParams();
  const {user} = useUser();
  const id = params.petitionId;
  //const href = import.meta.env.BASE_URL;



  const {data: data, isLoading, isSuccess} = useQuery({
    queryKey: ['petitions', id],
    queryFn: async () => {
      return await petitions.getById(id as string);
    },
    
  });
  const petition = data as IPetition;

  const user_id = petition?.user_id || 0;
  const { data: userData, error: userError, isLoading: userLoading } = useQuery([
    'userData', petition?.user_id, localStorage.getItem("accesToken")], () => users.getUserById(user_id as string, localStorage.getItem("accesToken") as string));

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

    //const pdfDocument = pdfMake.createPdf(documentDefinition);
    //pdfDocument.download(`Petitie-#${id}.pdf`);
  };

  return (
    <Layout>
      {isLoading ? (
        <Flex w={"full"} h="100vh" justifyContent="center" mt={20} color="white">
          <Loader/>
        </Flex>
      ) : isSuccess ? (
        <>
          <Container maxW={{ sm: "6xl", "2xl": "90%" }} px={0}>
            <HStack spacing={24} my={8} alignItems="start" position="relative">
              <VStack w="full" align={"flex-start"} justifyContent="start">
                <Heading as="h2" size="2xl" my={3}>
                  {petition?.title}
                </Heading>

                <Text fontSize="md" pt={4} pb={2} fontWeight={400}>
                  <span style={{fontWeight: "bold"}}>Inițiator:</span> {petition?.user_id}
                </Text>
                <Text fontSize="md" pb={2} fontWeight={400}>
                  <span style={{fontWeight: "bold"}}>Data depunerii:</span>{" "}
                  {petition?.created_at}
                </Text>

                {petition?.exp_date && (
                  <Text fontSize="md" fontWeight={400}>
                    <span style={{fontWeight: "bold"}}>Data limită:</span>{" "}
                    {petition.exp_date}
                  </Text>
                )}

                <HStack py={2.5}>
                  <Tag rounded="full" px={5} py={1.5} size="md" colorScheme="messenger">{petition.category}</Tag>
                </HStack>

                <Text fontSize="md" pt={1} whiteSpace="pre-line">
                  {petition.description}
                </Text>
              </VStack>
              <Box w="280px" position="sticky" top={4}>
                <PetitionProgressCard petition={petition} />
                {hasInitiatedPetition && (
                  <Button w="full" colorScheme="red" mt={8} onClick={generatePDF}>
                    Salvează ca PDF
                  </Button>
                )}
                <VStack w="full" align={"flex-start"} justifyContent="start" spacing={4} pt={12}>
                  <Text fontSize="lg" fontWeight={400}>
                    Distribuie petiția
                  </Text>
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

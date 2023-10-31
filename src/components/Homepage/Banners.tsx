import { Box, Heading, Stack, VStack, Text, useBreakpointValue } from "@chakra-ui/react";

const Banners = () => {
  const boxWidth = useBreakpointValue({ base: "90%", md: "60%", xl: "60%", sm: "90%" });
  const boxWidthLeft = useBreakpointValue({ base: "110%", md: "74%", xl: "74%", sm: "90%" });
  const boxHeight = useBreakpointValue({ base: "30vh", md: "40vh", xl: "40vh", sm: "50vh" });

  return (
      <Stack
          as="section"
          w="full"
          h="max-content"
          justifyContent="space-between"
          alignItems="stretch"
          py={70}
          spacing={6}
          direction={{ base: "column", md: "row" }}
          pt={"4vh"}
          pb={"vh"}
          color="white"
      >
        <Box
            borderWidth="1px"
            bgImage="url('src/data/images/4.png')"
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            w={boxWidthLeft}
            h={boxHeight}
            mb={5}
            ml={{ base: "5%", md: "5%" }}
            borderRadius="lg"
            boxShadow="none"
        >
          <VStack
              h="15vh"
              w={{ md: "28vw", sm: "100vw" }}
              ml="4vw"
              mt={{ md: "10%", sm: "2%" }}
              justifyContent="center"
              alignItems="flex-start"
              p={4}
          >
            <Heading fontSize={{ base: "24px", md: "32px" }}>
              Faceți-vă vocea auzită la UTM!
            </Heading>
            <Text
                fontSize={{ base: "14px", md: "16px" }}
                w={{ md: "20vw", sm: "100vh" }}
                // ml={{ md: "1vh", sm: "100vh" }}
                // mt={{ md: "9vh", sm: "100vh" }}
            >
              Fiecare student are puterea de a influența viitorul Universității Tehnice a Moldovei.
            </Text>
          </VStack>
        </Box>
        <Box
            borderWidth="1px"
            bgImage="url('src/data/images/pink.png')"
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            w={boxWidth}
            h={boxHeight}
            borderRadius="lg"
            boxShadow="none"
            mr="5%"
        >
          <VStack
              h="15vh"
              w={{ md: "28vw", sm: "100vw" }}
              ml="4vw"
              mt={{ md: "12%", sm: "0%" }}
              justifyContent="center"
              alignItems="flex-start"
              p={4}
          >
            <Heading fontSize={{ base: "24px", md: "32px" }}>
              Schimbarea începe cu petiția ta!
            </Heading>
            <Text
                fontSize={{ base: "14px", md: "16px" }}
                w={{ md: "20vw", sm: "100vh" }}
                // ml={{ md: "12vw", sm: "100vh" }}
                // mt={{ md: "3vh", sm: "100vh" }}
            >
              Ia atitudine și creează schimbarea dorită! Petiții puternice pentru studenți, de studenți.
            </Text>
          </VStack>
        </Box>
      </Stack>
  );
};

export default Banners;

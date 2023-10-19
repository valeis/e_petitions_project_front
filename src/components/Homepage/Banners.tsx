import { Box, Heading, Stack, VStack, Text, useBreakpointValue } from "@chakra-ui/react";

const Banners = () => {
  const boxWidth = useBreakpointValue({ base: "90%", md: "60%", xl: "60%", sm: "90%" });
  const boxWidthLeft = useBreakpointValue({ base: "120%", md: "74%", xl: "74%", sm: "90%" });
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
        boxShadow="lg"
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
            Chinese Tech ETFs Rebound on Positive Noises from Beijing
          </Heading>
          <Text
            fontSize={{ base: "14px", md: "16px" }}
            w={{ md: "20vw", sm: "100vh" }}
            ml={{ md: "12vw", sm: "100vh" }}
            mt={{ md: "3vh", sm: "100vh" }}
          >
            With Beijing’s support to help stabilize markets, ETF’s tracking and shit and shit and
            shit...
          </Text>
        </VStack>
      </Box>
      <Box
        borderWidth="1px"
        bgImage="url('src/data/images/Untitled-1.png')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        w={boxWidth}
        h={boxHeight}
        borderRadius="lg"
        boxShadow="lg"
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
            Chinese Tech ETFs Rebound on Positive Noises from Beijing
          </Heading>
          <Text
            fontSize={{ base: "14px", md: "16px" }}
            w={{ md: "20vw", sm: "100vh" }}
            ml={{ md: "12vw", sm: "100vh" }}
            mt={{ md: "3vh", sm: "100vh" }}
          >
            With Beijing’s support to help stabilize markets, ETF’s tracking and shit and shit and
            shit...
          </Text>
        </VStack>
      </Box>
    </Stack>
  );
};

export default Banners;

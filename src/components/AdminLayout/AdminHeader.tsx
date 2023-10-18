// AdminHeader.tsx
import {Box, Flex, Spacer, Text, Link, Container, Grid, HStack, Image, Button} from '@chakra-ui/react';
import headerLogo from "../../public/E-Petiții.svg";
import adminLogo from "../../public/Admin.svg";
import {Link as ChakraLink} from "@chakra-ui/react";


const AdminHeader = ( ) => {
    return (
        < >
            <Box w="full" borderBottomWidth="1px" position="fixed" width="100%"  bg="white" zIndex="999" >
                <Container maxW={{ sm: "6xl", "2xl": "8xl" }} px={0}>
                    <Grid templateColumns="repeat(16, 1fr)" gap={4} w="full">
                        <Box
                            gridColumn="span 16"
                            sx={{ display: "center" }}
                            width="auto"
                            padding="6"
                        >
                            <Flex alignItems="center" gap={55}>
                                <Link >
                                    <HStack role="group" spacing={4}>
                                        <Image src={headerLogo} width="96px" height="27" mr="0.5rem" />
                                    </HStack>
                                </Link>
                                <ChakraLink href="https://utm.md/" fontSize="sm" display="flex" gap={55} alignItems="center">
                                    Site-ul oficial al Universității Tehnice al Moldovei
                                </ChakraLink>
                            </Flex>
                            <Flex marginLeft="auto" alignItems="center" paddingRight="1rem">

                                <Link href={"/admin"}>
                                <HStack role="group" spacing={4}>
                                    <Image src={adminLogo} width="96px" height="27" mr="0.5rem" />
                                </HStack>
                                </Link>

                            </Flex>
                        </Box>
                    </Grid>


                </Container>
            </Box>
            <Box paddingBottom="80px"></Box>
        </>
    );
};

export default AdminHeader;

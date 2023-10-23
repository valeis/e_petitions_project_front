import { ChevronLeftIcon, Search2Icon } from "@chakra-ui/icons";
import { useQuery } from "@tanstack/react-query";
import { Modal, ModalOverlay, ModalContent, ModalHeader, InputGroup, InputRightElement, ModalBody, Box, Input, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {petitions} from "api";

interface SearchModalProps {
    isSearchOpen: boolean;
    onSearchClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isSearchOpen, onSearchClose }) => {
    const[searchParams, setSearchParams] = useSearchParams();
    const[searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
   

    const handleSubmit = (term: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("search", term);
        setSearchParams(params.toString());
    }

    useEffect(() => {
        setSearchTerm(searchParams.get("search") || "");
    }, [searchParams])


    return (
        <Modal isOpen={isSearchOpen} onClose={onSearchClose} size="2xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader paddingX="56px" paddingTop="30px">
                <Box
                  display="flex"
                  alignItems="center"
                  gap="10px"
                  width="full"
                >
                  <Box as="button" onClick={onSearchClose} textColor="gray.500">
                    <ChevronLeftIcon width="30px" height="30px" />
                  </Box>
                  <form 
                    style={{ width: '100%' }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit(searchTerm);
                    }}
                  >
                    <InputGroup>
                      <Input
                        variant="unstyled" 
                        placeholder="Search by name, category..."
                        _placeholder={{fontFamily: "Inter", fontSize: "14px", color: "gray.500"}}
                        value={searchTerm}
                      />
                      <InputRightElement width="auto" height="auto">
                        <Box as="button" textColor="gray.500" type="submit">
                          <Search2Icon />
                        </Box>
                      </InputRightElement>
                    </InputGroup>
                  </form>
                </Box>
              </ModalHeader>
              <ModalBody maxHeight="500px" paddingX="56px" marginBottom="30px" overflow="auto">
                {/* <Box width="100%" height="1px" marginBottom="15px" backgroundColor="gray.200"/> */}
                <Stack divider={<StackDivider />} spacing='4'>
                  {

                  }
                  <Box>
                    <Heading size='md'>
                      Summary
                    </Heading>
                    <Text pt='2' fontSize='md' color="gray.500">
                      Making a greater future for our kids is a good shit because killing kids for money is good yk...
                    </Text>
                  </Box>
                </Stack>
              </ModalBody>
            </ModalContent>
          </Modal>
    )
}
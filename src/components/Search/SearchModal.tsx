import { ChevronLeftIcon, Search2Icon } from "@chakra-ui/icons";
import { Modal, ModalOverlay, ModalContent, ModalHeader, InputGroup, InputRightElement, ModalBody, Box, Text, Input, Heading, Stack, StackDivider } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {petitions} from "api";

interface SearchModalProps {
    isSearchOpen: boolean;
    onSearchClose: () => void;
}

interface SearchResults{
  petitions:{
    petition_id:string;
    title:string;
    description:string;
  }
}

export const SearchModal: React.FC<SearchModalProps> = ({ isSearchOpen, onSearchClose }) => {

  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);


  const handleSearch = async () => {
    try {
      const result = await petitions.search({ title: inputValue });
      console.log("inputValue", inputValue);
      setSearchResults(result);
    } catch (error) {
      console.error('Error performing search:', error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [inputValue]);


console.log(inputValue);
  const SP = (searchResults || []) as Array<{
    petition_id: string;
    title: string;
    description: string;
  }>;
console.log("sp", SP)
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
                  >
                    <InputGroup>
                      <Input
                        variant="unstyled" 
                        placeholder="Caută petiția după titlu, categorie..."
                        _placeholder={{fontFamily: "Inter", fontSize: "14px", color: "gray.500"}}
                        value={inputValue}
                       onChange={(e) => setInputValue(e.target.value)}
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
                {SP && SP.length > 0 ? (
                  <Stack divider={<StackDivider />} spacing='4'>
                    {SP.map((petition, petition_id) => (
                      <Link key={petition_id} to={`/petition/${petition.petition_id}`} onClick={onSearchClose}>
                        <Box>
                          <Heading size='sm' transition="all 0.2s" _hover={{ color: "grey" }}>{petition.title}</Heading>
                        </Box>
                      </Link>
                    ))}
                  </Stack>
                ) : (
                  <Box textAlign="center">
                    <Text>No petitions found.</Text>
                  </Box>
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
    )
}

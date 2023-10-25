import { ChevronLeftIcon, Search2Icon } from "@chakra-ui/icons";
import { useQuery } from "@tanstack/react-query";
import { Modal, ModalOverlay, ModalContent, ModalHeader, InputGroup, InputRightElement, ModalBody, Box, Input, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {petitions} from "api";
import { IPetition } from "types";

interface SearchModalProps {
    isSearchOpen: boolean;
    onSearchClose: () => void;
}

interface SearchResults{
  petitions:{
    petition_id:number;
    title:string;
    description:string;
  }
}

export const SearchModal: React.FC<SearchModalProps> = ({ isSearchOpen, onSearchClose }) => {
    
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);

  // Define an async function to handle the search
  const handleSearch = async () => {
    try {
      const result = await petitions.search({ title: inputValue }); 
      setSearchResults(result);
    } catch (error) {
      console.error('Error performing search:', error);
    }
  };

  // Use the useEffect hook to listen for changes in inputValue and trigger the search
  useEffect(() => {
    handleSearch();
  }, [inputValue]); 



  const SP = (searchResults?.petitions || []) as Array<{
    petition_id: number;
    title: string;
    description: string;
  }>;

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
                        placeholder="Search by name, category..."
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
                {/* <Box width="100%" height="1px" marginBottom="15px" backgroundColor="gray.200"/> */}
                <Stack divider={<StackDivider />} spacing='4'>
                  {
                    SP.map((petition, petition_id: number) => (
                      <Box key={petition_id}>
                        <Heading size='sm'>{petition.title}</Heading>
                        {/* <Text pt='2' fontSize='md' color="gray.500">
                          {petition.description.length > 85 ? `${petition.description.substring(0, 85)}...` : petition.description}
                        </Text> */}
                      </Box>
                    ))
                  }
                </Stack>
              </ModalBody>
            </ModalContent>
          </Modal>
    )
}
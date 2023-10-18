import { ChevronLeftIcon, Search2Icon } from "@chakra-ui/icons";
import { Modal, ModalOverlay, ModalContent, ModalHeader, InputGroup, InputRightElement, ModalBody, Box, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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
              <ModalHeader>
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
                        onChange={(e) => setSearchTerm(e.target.value)}
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
              <ModalBody>
                <Box width="100%" height="1px" backgroundColor="gray.200"/>
                modal body
              </ModalBody>
            </ModalContent>
          </Modal>
    )
}
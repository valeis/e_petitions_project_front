import { Heading, Box, Text } from "@chakra-ui/react"
import React from "react"

interface SearchProps {
    data: any[],
}

const SearchPetition: React.FC<SearchProps> = ({data}) => {
    return (
        <Box>
            <Heading size='md'>
                Summary
            </Heading>
            <Text pt='2' fontSize='md' color="gray.500">
                Making a greater future for our kids is a good shit because killing kids for money is good yk...
            </Text>
        </Box>
    )
}

export default SearchPetition;
import { CardBody, Heading, Card, Text, VStack, HStack, Divider,Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IPetition } from "types";
import {useQuery} from "@tanstack/react-query";
import {users} from "../api";

interface PetitionCardProps {
  petition: IPetition;
}

export const PetitionCard = ({ petition }: PetitionCardProps) => {
  const { petition_id, user_id, title, description, created_at, exp_date, category, updated_at } = petition;

  const { data: userData, error: userError, isLoading: userLoading } = useQuery([
    'userData', petition?.user_id], () => users.getUserById(user_id));

  const deadlineTime = new Date(updated_at);

  const timeDiff = deadlineTime.getTime() - new Date().getTime();
  let remainingTime;
  if (timeDiff > 0) {
    if (timeDiff < 24 * 60 * 60 * 1000) {
      // less than 1 day
      remainingTime = Math.floor(timeDiff / (1000 * 60 * 60)) + " ore";
    } else {
      remainingTime = Math.floor(timeDiff / (1000 * 3600 * 24)) + " zile";
    }
  } else {
    remainingTime = "Expired";
  }
  const dateSplit = created_at.substring(0, created_at.indexOf(' '));

  return (

    <Link to={`/petition/${petition_id}`}>
      <Divider mb={2} borderWidth="1px" />

      <Card
        direction={{ base: "column", sm: "row" }}
        justify="start"
        overflow="hidden"
        p={"none"}
        transition="all 0.2s"
        cursor="pointer"
        role="group"
        _hover={{ boxShadow: "sm" }}
        w="27vw"
        mr={4}
        borderRightWidth="9px"
        borderRight="1px solid"
        borderColor={"blackAlpha.200"}
        borderRadius ="none"
        boxShadow={"none"}
      >
        <CardBody flexDir="row" display="flex" alignItems="center">
          <VStack spacing={2} alignItems="start" flex="2" mr={1}>
            <HStack justifyContent="space-between" alignItems="baseline"  w="25vw" >
              <Text fontSize={15} color="grey">
                {dateSplit}
              </Text>
              <Text fontSize={15} color="grey">
                #{category}
              </Text>
            </HStack>
            <Heading fontSize={19 } transition="all 0.2s" _groupHover={{ color: "grey" }}>
              {title}
            </Heading>
            <HStack alignItems="baseline">
              <Text fontSize={15}>{userData?.email}</Text>
            </HStack>
            <Text fontSize="md" color="grey">
              {description.length > 85 ? `${description.substring(0, 85)}...` : description}
            </Text>

            <HStack alignItems="baseline">
              <Box
                backgroundColor="gray.200"
                textColor="gray.500"
                rounded="full"
                px="15px"
                py="5px"
                marginRight="5px"
                display="flex"
                alignItems="center"
                gap="7px"
                fontSize={13}
              >
              Timp rămas: {remainingTime}
              </Box>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
      <Divider mt={3} borderWidth="1px" />
    </Link>

  );
};

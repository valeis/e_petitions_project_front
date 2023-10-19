import { CardBody, Heading, Card, Text, VStack, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IPetition } from "types";

interface PetitionCardProps {
  petition: IPetition;
}

export const PetitionCard = ({ petition }: PetitionCardProps) => {
  const { petition_id, user_id, title, description, created_at, current_votes, vote_goal, exp_date, category, status } = petition;

  const deadlineTime = new Date(exp_date);

  const daysLeft = Math.floor((deadlineTime.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
  
  const dateSplit = created_at.substring(0, created_at.indexOf(' '));

  return (
    <Link to={`/petition/${petition_id}`}>
      <Card
        direction={{ base: "column", sm: "row" }}
        justify="start"
        overflow="hidden"
        p={2}
        transition="all 0.2s"
        cursor="pointer"
        role="group"
        _hover={{ boxShadow: "sm" }}
        w="30vw"
        mr={4}
        borderRight="2px solid #808080"
        boxShadow={"none"}
      >
        <CardBody flexDir="row" display="flex" alignItems="center">
          <VStack spacing={2} alignItems="start" flex="2" mr={1}>
            <HStack justifyContent="space-between" alignItems="baseline"  w="25vw" >
              <Heading fontSize={18}>
                {dateSplit} 
              </Heading>
              <Heading fontSize={18}>
                #{category}
              </Heading>
            </HStack>
            <Heading fontSize={22} transition="all 0.2s" _groupHover={{ color: "primary.500" }}>
              {title}
            </Heading>
            <HStack alignItems="baseline">
              <Text fontFamily="serif">Author {user_id}</Text> //todo: get author name
            </HStack>
            <Text fontSize="md" color="grey">
              {description.length > 85 ? `${description.substring(0, 85)}...` : description}
            </Text>

            <HStack alignItems="baseline">
              <Text fontSize={15}>Days Left {daysLeft < 1 ? "60" : daysLeft}</Text>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </Link>
  );
};

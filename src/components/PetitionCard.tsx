import { CardBody, Heading, Card, Text, VStack, Progress, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IPetition, PetitionStatus } from "types";

interface PetitionCardProps {
  petition: IPetition;
}

export const PetitionCard = ({ petition }: PetitionCardProps) => {
  const { petition_id, user_id, title, created_at, current_votes, vote_goal, exp_date, category, status } = petition;

  const deadlineTime = new Date(exp_date);

  const daysLeft = Math.floor((deadlineTime.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
  const progress = Math.floor((current_votes / vote_goal) * 100);

  const dateSplit = created_at ? created_at?.split("T")[0] : "";
  const progressColor =
    status.status === PetitionStatus.APPROVED
      ? "green"
      : status.status === PetitionStatus.REJECTED
      ? "red"
      : status.status === PetitionStatus.REVIEW || status.status === PetitionStatus.PENDING
      ? "blue"
      : "yellow";

  return (
    <Link to={`/petition/${petition_id}`}>
      <Card
        direction={{ base: "column", sm: "row" }}
        justify="start"
        overflow="hidden"
        variant="outline"
        p={4}
        transition="all 0.2s"
        cursor="pointer"
        role="group"
        _hover={{ boxShadow: "sm" }}
        w="full"
      >
        <CardBody flexDir="row" display="flex" alignItems="center">
          <VStack spacing={6} alignItems="start" flex="2" mr={12}>
            <HStack alignItems="baseline" fontFamily="serif">
              <Text>
                {dateSplit} | #{category}
              </Text>
            </HStack>
            <Heading size="lg" transition="all 0.2s" _groupHover={{ color: "primary.500" }}>
              {title}
            </Heading>
            <HStack alignItems="baseline">
              <Text fontFamily="serif">Inițiat de {user_id}</Text>
            </HStack>
          </VStack>

          <VStack w="full" flex="0.6" alignItems="start" spacing={6}>
            <VStack w="full" alignItems="start">
              <HStack alignItems="baseline" justify="start" spacing={2}>
                <Heading size="lg">{current_votes}</Heading>
                <Text fontSize="md" fontFamily="serif">
                  semnături
                </Text>
              </HStack>
              <Progress value={progress} colorScheme={progressColor} rounded="md" w="full" h={2} />
            </VStack>
            <HStack alignItems="baseline" fontFamily="serif">
              {/* <FaCalendar color="#0BC5EA" /> */}
              <Text>{daysLeft < 1 ? "60" : daysLeft} zile rămase</Text>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </Link>
  );
};

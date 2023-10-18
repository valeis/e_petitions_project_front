import {
  Card,
  CardBody,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";
import { UserContext } from "context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { IPetition, PetitionStatus } from "types";

interface PetitionProgressCardProps {
  petition: IPetition;
}

export const PetitionProgressCard = ({ petition }: PetitionProgressCardProps) => {
  const { user } = useContext(UserContext);
  const { petition_id, current_votes, vote_goal, exp_date, semnat, user_id, status } = petition;

  const progressColor =
    status.status === PetitionStatus.APPROVED
      ? "green.500"
      : status.status === PetitionStatus.REJECTED
      ? "red.500"
      : status.status === PetitionStatus.REVIEW || status.status === PetitionStatus.PENDING
      ? "blue.500"
      : "yellow.500";

  const percentage = (current_votes * 100) / vote_goal;
  const deadlineTime = new Date(exp_date);
  const daysLeft = Math.floor((deadlineTime.getTime() - new Date().getTime()) / (1000 * 3600 * 24));

  let signButton;

  const commonButtonProps = {
    width: "200px",
    marginLeft: "auto",
    marginRight: "auto",
    rounded: "full",
    colorScheme: "blue",
  };

  if (user === null) {//unregistred user
    signButton = (
      <Button {...commonButtonProps} colorScheme="red" variant="link" fontWeight={500}>
        <Link to={`/mpass?petitionId=${petition_id}`}>
          Autorizați-vă pentru <br /> a semna petiția
        </Link>
      </Button>
    );
  } else if (user_id != user?.userId) {//random user
    const signedByUser = semnat && semnat.split(",").includes(``);


    const nowAllowedButtonProps = {
      ...commonButtonProps,
      variant: "link",
      fontWeight: 500,
      colorScheme: "red",
      whiteSpace: "pre-line",
      pointerEvents: "none",
    };

    signButton = (
      <Button
        {...commonButtonProps}
        isDisabled={!!signedByUser}
        {...(!nowAllowedButtonProps)}
      >
        <Link to={`/msign?petitionId=${petition_id}`}>
          {signedByUser ? "Ați semnat petiția" : "Semnați petiția"}
        </Link>
      </Button>
    );
  } else {//if user is the creator of the petition
    signButton = (
      <Button {...commonButtonProps}>
        <Link to={`/manage?petitionId=${petition_id}`}>Administrați petiţia</Link>
      </Button>
    );
  }

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      justify="start"
      overflow="hidden"
      variant="outline"
      p={4}
      transition="all 0.2s"
      role="group"
      _hover={{ boxShadow: "sm" }}
      w="280px"
    >
      <CardBody flexDir="column" display="flex" alignItems="center">
        <VStack spacing="5">
          <Heading size="md">Semnături</Heading>
          <CircularProgress value={percentage} size="200px" color={progressColor} thickness="5px">
            <CircularProgressLabel>
              <VStack>
                <Heading size="lg">{petition.current_votes}</Heading>
                <Text fontSize="sm" fontFamily="serif">
                  din {petition.vote_goal}
                  <br />
                  necesare
                </Text>
              </VStack>
            </CircularProgressLabel>
          </CircularProgress>
          <VStack>
            <Text fontSize="md" fontFamily="serif" fontWeight="bold">
              {petition.status.status}
            </Text>
            <Text fontSize="sm" fontFamily="serif" mt={2}>
              {daysLeft < 1 ? "60" : daysLeft} zile rămase
            </Text>
          </VStack>
          <>{signButton}</>
        </VStack>
      </CardBody>
    </Card>
  );
};

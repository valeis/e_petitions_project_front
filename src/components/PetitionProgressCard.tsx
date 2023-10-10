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
import { Petition, PetitionStatus } from "types";

interface PetitionProgressCardProps {
  petition: Petition;
}

export const PetitionProgressCard = ({ petition }: PetitionProgressCardProps) => {
  const { user } = useContext(UserContext);
  const { id, statut, nrSign, nrsignneeded, deadLine, initiator, semnat, locatie } = petition;

  const progressColor =
    statut === PetitionStatus.APPROVED
      ? "green.500"
      : statut === PetitionStatus.REJECTED
      ? "red.500"
      : statut === PetitionStatus.REVIEW || statut === PetitionStatus.PENDING
      ? "blue.500"
      : "yellow.500";

  const percentage = (nrSign * 100) / nrsignneeded;
  const deadlineTime = new Date(deadLine);
  const daysLeft = Math.floor((deadlineTime.getTime() - new Date().getTime()) / (1000 * 3600 * 24));

  let signButton;

  const commonButtonProps = {
    width: "200px",
    marginLeft: "auto",
    marginRight: "auto",
    rounded: "full",
    colorScheme: "blue",
  };

  if (user === null) {
    signButton = (
      <Button {...commonButtonProps} colorScheme="red" variant="link" fontWeight={500}>
        <Link to={`/mpass?petitionId=${id}`}>
          Autorizați-vă pentru <br /> a semna petiția
        </Link>
      </Button>
    );
  } else if (initiator !== `${user?.name} ${user?.surname}`) {
    const signedByUser = semnat && semnat.split(",").includes(`${user.name} ${user.surname}`);
    const isAllowedFromRegion =
      (!!petition?.locatie && user.location === petition?.locatie) || petition.toWho !== "Primar";

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
        {...(!isAllowedFromRegion && nowAllowedButtonProps)}
      >
        <Link to={`/msign?petitionId=${id}`}>
          {signedByUser
            ? "Ați semnat petiția"
            : isAllowedFromRegion
            ? "Semnați petiția"
            : "Petiție indisponibilă \nîn regiunea dvs."}
        </Link>
      </Button>
    );
  } else {
    signButton = (
      <Button {...commonButtonProps}>
        <Link to={`/manage?petitionId=${id}`}>Administrați petiţia</Link>
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
                <Heading size="lg">{petition.nrSign}</Heading>
                <Text fontSize="sm" fontFamily="serif">
                  din {petition.nrsignneeded}
                  <br />
                  necesare
                </Text>
              </VStack>
            </CircularProgressLabel>
          </CircularProgress>
          <VStack>
            <Text fontSize="md" fontFamily="serif" fontWeight="bold">
              {petition.statut}
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

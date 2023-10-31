import {
  Card,
  CardBody,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  VStack,
  Text,
  Button,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { petitions } from "api";
import { UserContext } from "context";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IPetition, PetitionStatus } from "types";
import { LoginModal } from "./Auth/LoginModal";
import { OtpModal } from "./Auth/OtpModal";

interface PetitionProgressCardProps {
  petition: IPetition;
}

export const PetitionProgressCard = ({ petition }: PetitionProgressCardProps) => {
  const { user } = useContext(UserContext);
  const { petition_id, current_votes, vote_goal, exp_date, semnat, user_id, status, updated_at } = petition;
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOtpOpen, onOpen: onOtpOpen, onClose: onOtpClose } = useDisclosure();

  const navigate = useNavigate();

  const sign = useMutation({
    mutationFn: () =>
      petitions.sign({
        petition_id,
      }),
    onSuccess: async () => {
      // Update the current_votes in the petition object
      petition.current_votes += 1;
      // Display a success toast
      toast({
        title: "Petition Signed",
        description: "You have successfully signed the petition.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      // Handle any error that occurs during the mutation
      toast({
        title: "Error",
        description: "Allready signed the petition.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const progressColor =
    status.status === PetitionStatus.APPROVED
      ? "green.500"
      : status.status === PetitionStatus.REJECTED
      ? "red.500"
      : status.status === PetitionStatus.REVIEW || status.status === PetitionStatus.PENDING
      ? "blue.500"
      : "yellow.500";

  const percentage = (current_votes * 100) / vote_goal;
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

  let signButton;

  const commonButtonProps = {
    width: "200px",
    marginLeft: "auto",
    marginRight: "auto",
    rounded: "full",
    colorScheme: "blue",
  };

  if (user === null) {
    //unregistred user
    signButton = (
      <>
        <Button
          {...commonButtonProps}
          variant="link"
          fontWeight={500}
          onClick={onOpen}
        >
          Autorizați-vă pentru <br /> a semna petiția
        </Button>
        <div>sau</div>
        <Button
          {...commonButtonProps}
          variant="link"
          fontWeight={500}
          onClick={onOtpOpen}
        >
         Semnați cu email
        </Button>

      </>
    );
  } else if (user_id != user?.userId) {
    //random user
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
        /* {...(!nowAllowedButtonProps)} */
        onClick={() => sign.mutate()}
      >
        {signedByUser ? "Ați semnat petiția" : "Semnați petiția"}
      </Button>
    );
  } else {
    //if user is the creator of the petition
    signButton = (

      <Button {...commonButtonProps} colorScheme="messenger">
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
          <Text fontSize="2xl" fontWeight="400">Semnături</Text>
          <CircularProgress value={percentage} size="200px" color={progressColor} thickness="5px">
            <CircularProgressLabel>
              <VStack>
                <Heading size="lg">{petition.current_votes}</Heading>
                <Text fontSize="sm">
                  din {petition.vote_goal}
                  <br />
                  necesare
                </Text>
              </VStack>
            </CircularProgressLabel>
          </CircularProgress>
          <VStack>
            <Text fontSize="xl" fontWeight="bold">
              {petition.status.status}
            </Text>
            <Text fontSize="md" mt={2}>
              {remainingTime}
            </Text>
          </VStack>
          <>{signButton}</>
        </VStack>
      </CardBody>
      <LoginModal isOpen={isOpen} onClose={onClose} />
      <OtpModal isOpen={isOtpOpen} onClose={onOtpClose} />
    </Card>
  );
};

import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Flex, Icon, chakra, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({ page, setPage, totalPages }) => {
  const PagButton = ({ active, children }: { active?: boolean; children: React.ReactNode }) => {
    const activeStyle = {
      bg: "primary.500",
      _dark: {
        bg: "primary.600",
      },
      color: "white",
    };

    return (
      <chakra.button
        mx={1}
        px={4}
        py={2}
        rounded="md"
        bg="white"
        _dark={{
          bg: "gray.800",
        }}
        color="gray.700"
        opacity={active ? undefined : 0.6}
        _hover={!active ? activeStyle : undefined}
        // cursor={active ? undefined : "not-allowed"}
        {...(active && activeStyle)}
        onClick={() => !isNaN(Number(children)) && setPage(Number(children))}
      >
        {children}
      </chakra.button>
    );
  };

  const MButton: React.FC<{ left?: boolean }> = ({ left }) => {
    const DoubleArrow = left ? ArrowLeftIcon : ArrowRightIcon;
    if (left && page === 1) {
      return null;
    }
    const [hovered, setHovered] = React.useState(false);
    const hoverColor = useColorModeValue("brand.800", "brand.700");
    const unHoverColor = useColorModeValue("gray.100", "gray.200");

    return (
      <chakra.a
        w={8}
        py={2}
        color="gray.700"
        _dark={{
          color: "gray.200",
        }}
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        cursor="pointer"
        textAlign="center"
        onClick={() => setPage(page + (left ? -1 : 1))}
      >
        {hovered ? (
          <Icon as={DoubleArrow} boxSize={3} cursor="pointer" color={hoverColor} />
        ) : (
          <Icon as={DoubleArrow} color={unHoverColor} boxSize={4} opacity={0.5} />
        )}
      </chakra.a>
    );
  };

  return (
    <Flex
      _dark={{
        bg: "#3e3e3e",
      }}
      // p={50}
      py={6}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Flex>
        <MButton left />
        <PagButton active={page === 1}>{1}</PagButton>
        {page > 3 && <PagButton>...</PagButton>}
        {page > 2 && <PagButton>{page - 1}</PagButton>}
        {page !== 1 && page !== totalPages && <PagButton active>{page}</PagButton>}
        {page < totalPages - 1 && <PagButton>{page + 1}</PagButton>}
        {page < totalPages - 2 && <PagButton>...</PagButton>}
        <PagButton active={page === totalPages}>{totalPages}</PagButton>
        <MButton />
      </Flex>
    </Flex>
  );
};

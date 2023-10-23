import React from 'react';
import { Flex } from '@chakra-ui/react';
import {Layout} from "../index";

export const UnauthorizedMessage: React.FC = () => {
  return (
    <Layout>
    <Flex justify="center" align="center" h="100vh">
      User not authorized
    </Flex>
    </Layout>
  );
};

export default UnauthorizedMessage;

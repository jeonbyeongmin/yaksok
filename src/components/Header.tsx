import { Flex, Text } from '@chakra-ui/react';

import Link from 'next/link';
import React from 'react';

function Header() {
  return (
    <Flex
      h={16}
      px={10}
      align="center"
      justify="space-between"
      userSelect="none"
    >
      <Link href="/">
        <Text color="primary">FROM</Text>
      </Link>
    </Flex>
  );
}

export default Header;

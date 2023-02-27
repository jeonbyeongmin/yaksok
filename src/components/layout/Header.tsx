import { darkTheme, styled } from '@/styles/stitches.config';

import { Flex } from '@/components/primitive/Flex';
import Link from 'next/link';
import { Logo } from '@/components/assets/Logo';

function Header() {
  return (
    <HeaderWrapper>
      <HeaderInner justify="between">
        <Link href="/">
          <Logo />
        </Link>
      </HeaderInner>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  w: '$full',
  h: '$30',
  px: '$10',
  userSelect: 'none',
  bgColor: 'rgba(255, 255, 255, 0.4)',
  backdropFilter: 'blur(5px)',
  position: 'fixed',

  [`.${darkTheme} &`]: {
    backgroundColor: 'rgba(27, 32, 43, 0.5);',
  },
});

const HeaderInner = styled(Flex, {
  minW: '$500',
});

export default Header;

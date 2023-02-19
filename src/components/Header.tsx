import { Flex } from '@/components/primitive/Flex';
import Link from 'next/link';
import { Logo } from '@/components/assets/Logo';
import { styled } from '@/styles/stitches.config';

function Header() {
  return (
    <HeaderWrapper align="center" justify="center">
      <HeaderInner justify="between">
        <Link href="/">
          <Logo />
        </Link>
      </HeaderInner>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled(Flex, {
  w: 'full',
  px: '$10',
  userSelect: 'none',
  bg: 'linear-gradient(90.7deg, #FFFFFF 8.81%, rgba(255, 255, 255, 0) 109.85%)',
});

const HeaderInner = styled(Flex, {
  w: 'full',
  minW: '$500',
});

export default Header;

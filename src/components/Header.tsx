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
  w: '$full',
  h: '$30',
  px: '$10',
  userSelect: 'none',
  bgColor: 'rgba(255, 255, 255, 0.5)',
  backdropFilter: 'blur(5px)',
  position: 'fixed',
});

const HeaderInner = styled(Flex, {
  minW: '$500',
});

export default Header;

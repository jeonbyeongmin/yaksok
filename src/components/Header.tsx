import { Flex } from '@/components/primitive/Flex';
import Link from 'next/link';
import { Logo } from '@/components/assets/Logo';
import { styled } from '@/styles/stitches.config';

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
  bgColor: 'rgba(255, 255, 255, 0.5)',
  backdropFilter: 'blur(5px)',
  position: 'fixed',
});

const HeaderInner = styled(Flex, {
  minW: '$500',
});

export default Header;

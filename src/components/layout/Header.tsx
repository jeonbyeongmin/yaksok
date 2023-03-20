import { MoonIcon, SunIcon } from '@/components/icons';
import { darkTheme, styled } from '@/styles/stitches.config';
import { useEffect, useState } from 'react';

import { Flex } from '@/components/primitive/Flex';
import Image from 'next/image';
import Link from 'next/link';
import Switch from '@/components/primitive/Switch';
import { useTheme } from 'next-themes';

function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isOn, setIsOn] = useState<boolean>(false);

  const onSwitch = () => {
    setIsOn((prev) => !prev);
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    setIsOn(resolvedTheme !== 'light');
  }, [resolvedTheme]);

  return (
    <HeaderWrapper>
      <HeaderInner justify="between" align="center">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={100} height={30} />
        </Link>
        <Switch
          onSwitch={onSwitch}
          checked={isOn}
          icon={isOn ? <MoonIcon size={16} /> : <SunIcon size={16} />}
        />
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
  zIndex: 1,

  [`.${darkTheme} &`]: {
    backgroundColor: 'rgba(27, 32, 43, 0.5);',
  },
});

const HeaderInner = styled(Flex, {
  w: '$500',
});

export default Header;

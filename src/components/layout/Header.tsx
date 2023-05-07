import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Flex, Icon, Switch } from '@/components/primitive';
import { darkTheme, styled } from '@/styles/stitches.config';

export function Header() {
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
      <HeaderInner justify='between' align='center'>
        <Link href='/'>
          <Image src='/logo.svg' alt='logo' width={100} height={30} />
        </Link>
        <Switch
          onSwitch={onSwitch}
          checked={isOn}
          icon={
            isOn ? (
              <Icon name='moon' size={16} />
            ) : (
              <Icon name='sun' size={16} />
            )
          }
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

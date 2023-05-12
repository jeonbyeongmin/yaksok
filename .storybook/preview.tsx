// .storybook/preview.tsx

import '@/styles/globals.css';

import { ThemeProvider, useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

import { Preview } from '@storybook/react';

import { Flex, Icon, Switch } from '../src/components/primitive';
import { darkTheme, styled } from '../src/styles/stitches.config';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableColorScheme={false}
        value={{
          light: 'light',
          dark: 'dark-theme',
        }}
      >
        <StoryWrapper direction='column' gap={10}>
          <SwitchWithHook />
          <Story />
        </StoryWrapper>
      </ThemeProvider>
    ),
  ],
};

const StoryWrapper = styled(Flex, {
  w: '$full',
  h: '$full',
  p: '$10',

  [`.${darkTheme} &`]: {
    backgroundColor: '#1E1F21',
    color: '#ffffff',
  },
});

const SwitchWithHook = () => {
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
    <Switch
      onSwitch={onSwitch}
      checked={isOn}
      icon={isOn ? <Icon name='moon' size={16} /> : <Icon name='sun' size={16} />}
    />
  );
};

export default preview;

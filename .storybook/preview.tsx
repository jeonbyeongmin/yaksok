// .storybook/preview.tsx

import '@/styles/globals.css';

import { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from 'next-themes';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableColorScheme={false}
        value={{
          light: 'light',
          dark: 'dark-theme',
        }}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;

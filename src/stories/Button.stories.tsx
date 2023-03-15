// Button.stories.ts|tsx

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from '@/components/primitive/Button';
import React from 'react';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const Primary: ComponentStory<typeof Button> = () => {
  return <Button>Button</Button>;
};

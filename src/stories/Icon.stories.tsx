import { Flex, Icon } from '@/components/primitive';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Icon> = {
  title: 'Primitive / Icon',
  component: Icon,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const WithIconType: Story = {
  argTypes: {
    name: {
      table: { disable: true },
    },
  },
  render: (args) => {
    return (
      <Flex gap={5}>
        <Icon {...args} name='calendar' />
        <Icon {...args} name='caret-down' />
        <Icon {...args} name='caret-right' />
        <Icon {...args} name='caret-up' />
        <Icon {...args} name='moon' />
        <Icon {...args} name='person' />
        <Icon {...args} name='refresh' />
        <Icon {...args} name='share' />
        <Icon {...args} name='sun' />
      </Flex>
    );
  },
};

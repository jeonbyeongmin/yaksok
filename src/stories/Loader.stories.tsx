import type { Meta, StoryObj } from '@storybook/react';

import { Flex } from '@/components/primitive/Flex';
import { Loader } from '@/components/primitive/Loader';

const meta: Meta<typeof Loader> = {
  title: 'Primitive / Loader',
  component: Loader,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const WithColor: Story = {
  argTypes: {
    color: {
      table: { disable: true },
    },
  },
  render: (args) => {
    return (
      <Flex gap={5}>
        <Loader {...args} color="primary" />
        <Loader {...args} color="gray" />
        <Flex css={{ bgColor: '$primary300' }}>
          <Loader {...args} color="white" />
        </Flex>
      </Flex>
    );
  },
};

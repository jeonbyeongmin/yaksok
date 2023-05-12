import { Badge, Flex } from '@/components/primitive';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Badge> = {
  title: 'Primitive / Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    css: { table: { disable: true } },
    content: { table: { disable: true } },
    colorScheme: { options: ['gray', 'primary'], control: { type: 'radio' } },
    size: { options: ['xs', 'sm', 'md'], control: { type: 'radio' } },
    radius: {
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'pill'],
      control: { type: 'select' },
    },
    active: { type: 'boolean' },
    clickable: { type: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const WithColorScheme: Story = {
  argTypes: {
    colorScheme: {
      table: { disable: true },
    },
  },
  render: (args) => {
    return (
      <Flex gap={5}>
        <Badge {...args} colorScheme="gray" content="gray" />
        <Badge {...args} colorScheme="primary" content="primary" />
      </Flex>
    );
  },
};

export const WithSize: Story = {
  argTypes: {
    size: {
      table: { disable: true },
    },
  },
  render: (args) => {
    return (
      <Flex gap={5} align="start">
        <Badge {...args} size="xs" content="xs" />
        <Badge {...args} size="sm" content="sm" />
        <Badge {...args} size="md" content="md" />
      </Flex>
    );
  },
};

export const WithRadius: Story = {
  argTypes: {
    radius: {
      table: { disable: true },
    },
  },
  render: (args) => {
    return (
      <Flex gap={5} align="start">
        <Badge {...args} radius="xs" content="xs" />
        <Badge {...args} radius="sm" content="sm" />
        <Badge {...args} radius="md" content="md" />
        <Badge {...args} radius="lg" content="lg" />
        <Badge {...args} radius="xl" content="xl" />
        <Badge {...args} radius="2xl" content="2xl" />
        <Badge {...args} radius="3xl" content="3xl" />
        <Badge {...args} radius="pill" content="pill" />
      </Flex>
    );
  },
};

export const WithActive: Story = {
  argTypes: {
    active: {
      table: { disable: true },
    },
  },
  render: (args) => {
    return (
      <Flex gap={5} align="start">
        <Badge {...args} active={false} content="false" />
        <Badge {...args} active={true} content="true" />
      </Flex>
    );
  },
};

export const WithClickable: Story = {
  argTypes: {
    clickable: {
      table: { disable: true },
    },
  },
  render: (args) => {
    return (
      <Flex gap={5} align="start">
        <Badge {...args} clickable={false} content="false" />
        <Badge {...args} clickable={true} content="true" />
      </Flex>
    );
  },
};

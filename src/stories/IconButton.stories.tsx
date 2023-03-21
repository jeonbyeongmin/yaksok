import { Flex, IconButton } from '@/components/primitive';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof IconButton> = {
  title: 'Primitive / IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    css: { table: { disable: true } },
    visible: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const WithIconType: Story = {
  argTypes: {
    name: {
      table: { disable: true },
    },
  },
  render: (args) => {
    return (
      <Flex gap={5}>
        <IconButton {...args} name="calendar" />
        <IconButton {...args} name="caret-down" />
        <IconButton {...args} name="caret-right" />
        <IconButton {...args} name="caret-up" />
        <IconButton {...args} name="moon" />
        <IconButton {...args} name="person" />
        <IconButton {...args} name="refresh" />
        <IconButton {...args} name="share" />
        <IconButton {...args} name="sun" />
      </Flex>
    );
  },
};

export const WithVariant: Story = {
  argTypes: {
    variant: {
      table: { disable: true },
    },
  },
  render: (args) => {
    return (
      <Flex gap={5}>
        <IconButton {...args} variant="solid" />
        <IconButton {...args} variant="outline" />
        <IconButton {...args} variant="ghost" />
        <IconButton {...args} variant="embossing" />
      </Flex>
    );
  },
};

export const WithColorScheme: Story = {
  argTypes: {
    colorScheme: {
      table: { disable: true },
    },
  },
  render: (args) => {
    return (
      <Flex gap={5}>
        <IconButton {...args} colorScheme="gray" />
        <IconButton {...args} colorScheme="primary" />
      </Flex>
    );
  },
};

export const WithShadow: Story = {
  argTypes: {
    shadow: {
      table: { disable: true },
    },
  },
  render: (args) => {
    return (
      <Flex gap={5}>
        <IconButton {...args} />
        <IconButton {...args} shadow />
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
      <Flex gap={5}>
        <IconButton {...args} radius="xs" />
        <IconButton {...args} radius="sm" />
        <IconButton {...args} radius="md" />
        <IconButton {...args} radius="lg" />
        <IconButton {...args} radius="xl" />
        <IconButton {...args} radius="2xl" />
        <IconButton {...args} radius="3xl" />
        <IconButton {...args} radius="pill" />
      </Flex>
    );
  },
};

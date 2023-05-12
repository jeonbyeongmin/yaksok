import { Button, Flex, Text } from '@/components/primitive';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Primitive / Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    css: { table: { disable: true } },
    leftElement: { table: { disable: true } },
    rightElement: { table: { disable: true } },
    loading: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const WithVariant: Story = {
  argTypes: {
    variant: {
      table: { disable: true },
    },
  },
  render: (args) => {
    return (
      <Flex gap={5}>
        <Button {...args} variant='solid'>
          <Text content='solid' size={args.size} />
        </Button>
        <Button {...args} variant='outline'>
          <Text content='outline' size={args.size} />
        </Button>
        <Button {...args} variant='ghost'>
          <Text content='ghost' size={args.size} />
        </Button>
        <Button {...args} variant='link'>
          <Text content='link' size={args.size} />
        </Button>
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
        <Button {...args} colorScheme='gray'>
          <Text content='gray' size={args.size} />
        </Button>
        <Button {...args} colorScheme='primary'>
          <Text content='primary' size={args.size} />
        </Button>
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
      <Flex gap={5}>
        <Button {...args} size='xs'>
          <Text content='xs' size='xs' />
        </Button>
        <Button {...args} size='sm'>
          <Text content='sm' size='sm' />
        </Button>
        <Button {...args} size='md'>
          <Text content='md' size='md' />
        </Button>
        <Button {...args} size='lg'>
          <Text content='lg' size='lg' />
        </Button>
        <Button {...args} size='xl'>
          <Text content='xl' size='xl' />
        </Button>
        <Button {...args} size='2xl'>
          <Text content='2xl' size='2xl' />
        </Button>
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
        <Button {...args} radius='xs'>
          <Text content='xs' size={args.size} />
        </Button>
        <Button {...args} radius='sm'>
          <Text content='sm' size={args.size} />
        </Button>
        <Button {...args} radius='md'>
          <Text content='md' size={args.size} />
        </Button>
        <Button {...args} radius='lg'>
          <Text content='lg' size={args.size} />
        </Button>
        <Button {...args} radius='xl'>
          <Text content='xl' size={args.size} />
        </Button>
        <Button {...args} radius='2xl'>
          <Text content='2xl' size={args.size} />
        </Button>
        <Button {...args} radius='3xl'>
          <Text content='3xl' size={args.size} />
        </Button>
        <Button {...args} radius='pill'>
          <Text content='pill' size={args.size} />
        </Button>
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
        <Button {...args}>
          <Text content='noral' size={args.size} />
        </Button>
        <Button {...args} shadow>
          <Text content='shadow' size={args.size} />
        </Button>
      </Flex>
    );
  },
};

export const WithLoading: Story = {
  argTypes: {
    isLoading: {
      table: { disable: true },
    },
  },
  render: (args) => {
    return (
      <Flex gap={5}>
        <Button {...args}>
          <Text content='normal' size={args.size} />
        </Button>
        <Button {...args} isLoading>
          <Text content='loading' size={args.size} />
        </Button>
      </Flex>
    );
  },
};

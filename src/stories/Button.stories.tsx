import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/primitive/Button';
import { Flex } from '@/components/primitive/Flex';

const meta: Meta<typeof Button> = {
  title: 'Components / Primitive / Button',
  component: Button,
  argTypes: {
    css: { table: { disable: true } },
    leftElement: { table: { disable: true } },
    rightElement: { table: { disable: true } },
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
        <Button {...args} variant="primary">
          primary
        </Button>
        <Button {...args} variant="outline">
          outline
        </Button>
        <Button {...args} variant="gray">
          gray
        </Button>
        <Button {...args} variant="ghost">
          ghost
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
        <Button {...args} size="xs">
          xs
        </Button>
        <Button {...args} size="sm">
          sm
        </Button>
        <Button {...args} size="md">
          md
        </Button>
        <Button {...args} size="lg">
          lg
        </Button>
        <Button {...args} size="xl">
          xl
        </Button>
        <Button {...args} size="2xl">
          2xl
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
      <Flex direction="column" gap={5}>
        <Flex gap={5}>
          <Button {...args} radius="xs">
            xs
          </Button>
          <Button {...args} radius="sm">
            sm
          </Button>
          <Button {...args} radius="md">
            md
          </Button>
          <Button {...args} radius="lg">
            lg
          </Button>
        </Flex>
        <Flex gap={5}>
          <Button {...args} radius="xl">
            xl
          </Button>
          <Button {...args} radius="2xl">
            2xl
          </Button>
          <Button {...args} radius="3xl">
            3xl
          </Button>
          <Button {...args} radius="pill">
            pill
          </Button>
        </Flex>
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
        <Button {...args}>normal</Button>
        <Button {...args} shadow>
          shadow
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
        <Button {...args}>normal</Button>
        <Button {...args} isLoading>
          loading
        </Button>
      </Flex>
    );
  },
};

import { Flex, Input, Text } from '@/components/primitive';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Input> = {
  title: 'Primitive / Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    css: { table: { disable: true } },
    leftElement: { table: { disable: true } },
    rightElement: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const WithVariant: Story = {
  argTypes: {
    variant: {
      table: { disable: true },
    },
  },
  render: (args) => {
    return (
      <Flex gap={10} direction="column">
        <Flex gap={2} direction="column">
          <Text content="Blurred" weight="bold" />
          <Input {...args} placeholder="placeholder" variant="blurred" />
        </Flex>
        <Flex gap={2} direction="column">
          <Text content="Outline" weight="bold" />
          <Input {...args} placeholder="placeholder" variant="outline" />
        </Flex>
      </Flex>
    );
  },
};

export const WithSize: Story = {
  argTypes: {
    variant: {
      table: { disable: true },
    },
  },
  render: (args) => {
    return (
      <Flex gap={10} direction="column">
        <Flex gap={2} direction="column">
          <Text content="SM" weight="bold" />
          <Input {...args} placeholder="placeholder" size="sm" />
        </Flex>
        <Flex gap={2} direction="column">
          <Text content="MD" weight="bold" />
          <Input {...args} placeholder="placeholder" size="md" />
        </Flex>
        <Flex gap={2} direction="column">
          <Text content="LG" weight="bold" />
          <Input {...args} placeholder="placeholder" size="lg" />
        </Flex>
        <Flex gap={2} direction="column">
          <Text content="XL" weight="bold" />
          <Input {...args} placeholder="placeholder" size="xl" />
        </Flex>
      </Flex>
    );
  },
};

export const WithRadius: Story = {
  argTypes: {
    variant: {
      table: { disable: true },
    },
  },
  render: (args) => {
    return (
      <Flex gap={10} direction="column">
        <Flex gap={2} direction="column">
          <Text content="XS" weight="bold" />
          <Input {...args} placeholder="placeholder" radius="xs" />
        </Flex>
        <Flex gap={2} direction="column">
          <Text content="SM" weight="bold" />
          <Input {...args} placeholder="placeholder" radius="sm" />
        </Flex>
        <Flex gap={2} direction="column">
          <Text content="MD" weight="bold" />
          <Input {...args} placeholder="placeholder" radius="md" />
        </Flex>
        <Flex gap={2} direction="column">
          <Text content="LG" weight="bold" />
          <Input {...args} placeholder="placeholder" radius="lg" />
        </Flex>
        <Flex gap={2} direction="column">
          <Text content="XL" weight="bold" />
          <Input {...args} placeholder="placeholder" radius="xl" />
        </Flex>
        <Flex gap={2} direction="column">
          <Text content="2XL" weight="bold" />
          <Input {...args} placeholder="placeholder" radius="2xl" />
        </Flex>
        <Flex gap={2} direction="column">
          <Text content="3XL" weight="bold" />
          <Input {...args} placeholder="placeholder" radius="3xl" />
        </Flex>
        <Flex gap={2} direction="column">
          <Text content="PILL" weight="bold" />
          <Input {...args} placeholder="placeholder" radius="pill" />
        </Flex>
      </Flex>
    );
  },
};

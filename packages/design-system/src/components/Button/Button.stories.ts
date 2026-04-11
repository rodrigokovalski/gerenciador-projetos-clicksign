import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Button from "./Button.vue";

type ButtonStoryArgs = {
  variant?: "primary" | "outlined";
  children?: string;
  disabled?: boolean;
};

const meta: Meta<ButtonStoryArgs> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "outlined"],
    },
    children: {
      control: "text",
      description: "Conteúdo do slot default",
    },
    disabled: {
      control: "boolean",
    },
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args };
    },
    template:
      "<Button :variant=\"args.variant\" :disabled=\"args.disabled\">{{ args.children }}</Button>",
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    variant: "primary",
  },
};

export const Outlined: Story = {
  args: {
    children: "Secundário",
    variant: "outlined",
  },
};

export const Disabled: Story = {
  args: {
    children: "Button",
    variant: "primary",
    disabled: true,
  },
};

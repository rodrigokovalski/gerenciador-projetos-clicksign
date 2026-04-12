import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Input from "../Input/Input.vue";
import Label from "./Label.vue";

type LabelStoryArgs = {
  htmlFor?: string;
  children?: string;
};

const meta: Meta<LabelStoryArgs> = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Texto do rótulo",
    },
    htmlFor: {
      control: "text",
    },
  },
  render: args => ({
    components: { Label, Input },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px; max-width: 320px;">
        <Label :html-for="args.htmlFor">{{ args.children }}</Label>
        <Input :id="args.htmlFor" placeholder="Exemplo" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Nome do projeto",
    htmlFor: "story-label-field",
  },
};

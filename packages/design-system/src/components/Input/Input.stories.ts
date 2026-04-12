import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";

import Input from "./Input.vue";

type InputStoryArgs = {
  modelValue?: string;
  type?: "text" | "date";
  placeholder?: string;
  disabled?: boolean;
};

const meta: Meta<InputStoryArgs> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "date"],
    },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
  render: args => ({
    components: { Input },
    setup() {
      const modelValue = ref(args.modelValue ?? "");
      return { args, modelValue };
    },
    template:
      "<div style=\"max-width: 320px;\"><Input v-model=\"modelValue\" :type=\"args.type\" :placeholder=\"args.placeholder\" :disabled=\"args.disabled\" /></div>",
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    modelValue: "",
    type: "text",
    placeholder: "Digite aqui",
    disabled: false,
  },
};

export const Date: Story = {
  args: {
    modelValue: "",
    type: "date",
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    modelValue: "Somente leitura",
    type: "text",
    disabled: true,
  },
};

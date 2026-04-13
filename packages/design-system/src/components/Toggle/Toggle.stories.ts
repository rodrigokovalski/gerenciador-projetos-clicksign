import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";

import Toggle from "./Toggle.vue";

type ToggleStoryArgs = {
  modelValue?: boolean;
  label?: string;
  disabled?: boolean;
};

const meta: Meta<ToggleStoryArgs> = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Texto à **direita** do interruptor",
    },
    disabled: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Interruptor acessível (`checkbox` + `role=\"switch\"`) com **v-model** booleano. A prop opcional **`label`** aparece à direita do trilho.",
      },
    },
  },
  render: args => ({
    components: { Toggle },
    setup() {
      const modelValue = ref(args.modelValue ?? false);
      return { args, modelValue };
    },
    template: `
      <div style="padding: 16px">
        <Toggle
          v-model="modelValue"
          :label="args.label"
          :disabled="args.disabled"
        />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: false,
    label: "Notificações por e-mail",
    disabled: false,
  },
};

export const Ligado: Story = {
  args: {
    modelValue: true,
    label: "Visível para a equipe",
    disabled: false,
  },
};

export const SemLabel: Story = {
  name: "Sem label",
  args: {
    modelValue: false,
    label: undefined,
    disabled: false,
  },
};

export const Desabilitado: Story = {
  args: {
    modelValue: true,
    label: "Opção fixa",
    disabled: true,
  },
};

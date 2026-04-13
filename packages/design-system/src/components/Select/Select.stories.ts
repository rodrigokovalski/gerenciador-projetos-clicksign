import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";

import Select from "./Select.vue";

type SelectStoryArgs = {
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
};

const meta: Meta<SelectStoryArgs> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Texto da primeira opção vazia (desabilitada)",
    },
    disabled: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "`<select>` nativo com **v-model** (`modelValue` / `update:modelValue`). Passe as opções no **slot default** com elementos `<option>`. Opcionalmente use **`placeholder`** para uma primeira linha vazia.",
      },
    },
  },
  render: args => ({
    components: { Select },
    setup() {
      const modelValue = ref(args.modelValue ?? "");
      return { args, modelValue };
    },
    template: `
      <div style="max-width: 320px">
        <Select
          v-model="modelValue"
          :placeholder="args.placeholder"
          :disabled="args.disabled"
        >
          <option value="draft">Rascunho</option>
          <option value="active">Ativo</option>
          <option value="archived">Arquivado</option>
        </Select>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: "active",
    disabled: false,
  },
};

export const ComPlaceholder: Story = {
  name: "Com placeholder",
  args: {
    modelValue: "",
    placeholder: "Selecione o status",
    disabled: false,
  },
};

export const Desabilitado: Story = {
  args: {
    modelValue: "draft",
    disabled: true,
  },
};

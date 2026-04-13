import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";

import Search from "./Search.vue";

type SearchStoryArgs = {
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  ariaLabel?: string;
};

const meta: Meta<SearchStoryArgs> = {
  title: "Components/Search",
  component: Search,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    ariaLabel: { control: "text" },
  },
  render: args => ({
    components: { Search },
    setup() {
      const modelValue = ref(args.modelValue ?? "");
      return { args, modelValue };
    },
    template:
      "<div style=\"max-width: 320px;\"><Search v-model=\"modelValue\" :placeholder=\"args.placeholder\" :disabled=\"args.disabled\" :aria-label=\"args.ariaLabel\" /></div>",
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: "",
    placeholder: "Buscar…",
    disabled: false,
    ariaLabel: "Buscar",
  },
};

export const Disabled: Story = {
  args: {
    modelValue: "Somente leitura",
    placeholder: "Buscar…",
    disabled: true,
    ariaLabel: "Buscar",
  },
};

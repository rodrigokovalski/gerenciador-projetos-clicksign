import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { PlusCircleIcon } from "@clicksign/icons";

const meta: Meta = {
  title: "Tokens/Icons",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Ícones são SVG estático",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { PlusCircleIcon },
    template: `
      <div style="display: flex; align-items: center; gap: 12px;">
        <PlusCircleIcon width="24" height="24" style="color: var(--ds-neutral-900)" />
      </div>
    `,
  }),
};

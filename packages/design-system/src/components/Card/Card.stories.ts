import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Card from "./Card.vue";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Container com fundo branco, borda e cantos arredondados. O conteúdo vai no **slot default**.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<template>
                <Card>
                  <slot />
                </Card>
              </template>`,
      },
    },
  },
  render: () => ({
    components: { Card },
    template: `
      <div style="padding: 24px; background: #f5f5f5; min-height: 120px">
        <Card>
          <div style="width: 80px; height: 180px"></div>
        </Card>
      </div>
    `,
  }),
};

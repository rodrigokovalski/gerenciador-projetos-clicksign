import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Header from "./Header.vue";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Barra superior fixa. O conteúdo interno vai no **slot default** (por exemplo logo, navegação ou título).",
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
                  <Header>
                    <slot />
                  </Header>
                </template>`,
      },
    },
  },
  render: () => ({
    components: { Header },
    template: `
      <div style="min-height: 80px">
        <Header>
        </Header>
      </div>
    `,
  }),
};

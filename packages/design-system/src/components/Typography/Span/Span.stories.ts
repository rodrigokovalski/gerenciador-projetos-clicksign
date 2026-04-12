import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Span from "./Span.vue";

const meta: Meta<typeof Span> = {
  title: "Components/Typography/Span",
  component: Span,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Texto em linha. Cor padrão `#717171`; use **color** para sobrescrever.",
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
                <Span>texto</Span>
              </template>`,
      },
    },
  },
  render: () => ({
    components: { Span },
    template: `
        <p style="margin: 0; font-size: 16px">
          Texto ao redor <Span>trecho em span</Span> continua.
        </p>
    `,
  }),
};

export const CustomColor: Story = {
  parameters: {
    docs: {
      source: {
        code: `<template>
                <Span color="#695CCD">texto</Span>
              </template>`,
      },
    },
  },
  render: () => ({
    components: { Span },
    template: `
        <p style="margin: 0; font-size: 16px">
          Texto ao redor <Span color="#695CCD">destaque</Span> continua.
        </p>
    `,
  }),
};

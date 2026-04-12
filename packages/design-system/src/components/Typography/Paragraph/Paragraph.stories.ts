import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Paragraph from "./Paragraph.vue";

const meta: Meta<typeof Paragraph> = {
  title: "Components/Typography/Paragraph",
  component: Paragraph,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Parágrafo com tamanhos **sm**, **md** e **lg**, peso **normal** ou **bold**.",
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
  <Paragraph>Paragrafo</Paragraph>
</template>`,
      },
    },
  },
  render: () => ({
    components: { Paragraph },
    template: `
        <Paragraph size="md" weight="normal">
          Paragrafo
        </Paragraph>
    `,
  }),
};

export const Small: Story = {
  parameters: {
    docs: {
      source: {
        code: `<template>
  <Paragraph size="sm">Paragrafo</Paragraph>
</template>`,
      },
    },
  },
  render: () => ({
    components: { Paragraph },
    template: `
        <Paragraph size="sm" weight="normal">
          Parágrafo pequeno (sm).
        </Paragraph>
    `,
  }),
};

export const Large: Story = {
  parameters: {
    docs: {
      source: {
        code: `<template>
                  <Paragraph size="lg">Paragrafo</Paragraph>
              </template>`,
      },
    },
  },
  render: () => ({
    components: { Paragraph },
    template: `
        <Paragraph size="lg" weight="normal">
          Parágrafo grande (lg).
        </Paragraph>
    `,
  }),
};

export const Bold: Story = {
  parameters: {
    docs: {
      source: {
        code: `<template>
                <Paragraph weight="bold">Paragrafo</Paragraph>
              </template>`,
      },
    },
  },
  render: () => ({
    components: { Paragraph },
    template: `
        <Paragraph size="md" weight="bold">
          Parágrafo negrito (bold).
        </Paragraph>
    `,
  }),
};

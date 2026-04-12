import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Title from "./Title.vue";

const meta: Meta<typeof Title> = {
  title: "Components/Typography/Title",
  component: Title,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Título semântico. Use a prop **as** com `h1`, `h2`, `h3` ou `h4`.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TitleOne: Story = {
  parameters: {
    docs: {
      source: {
        code: `<template>
                <Title as="h1">Titulo</Title>
              </template>`,
      },
    },
  },
  render: () => ({
    components: { Title },
    template: `
        <Title as="h1">
          Título nível 1
        </Title>
    `,
  }),
};

export const TitleTwo: Story = {
  parameters: {
    docs: {
      source: {
        code: `<template>
                <Title as="h2">Titulo</Title>
              </template>`,
      },
    },
  },
  render: () => ({
    components: { Title },
    template: `
        <Title as="h2">
          Título nível 2
        </Title>
    `,
  }),
};

export const TitleThree: Story = {
  parameters: {
    docs: {
      source: {
        code: `<template>
                  <Title as="h3">Titulo</Title>
                </template>`,
      },
    },
  },
  render: () => ({
    components: { Title },
    template: `
        <Title as="h3">
          Título nível 3
        </Title>
    `,
  }),
};

export const TitleFour: Story = {
  parameters: {
    docs: {
      source: {
        code: `<template>
                <Title as="h4">Titulo</Title>
              </template>`,
      },
    },
  },
  render: () => ({
    components: { Title },
    template: `
        <Title as="h4">
          Título nível 4
        </Title>
    `,
  }),
};

export const CustomColor: Story = {
  parameters: {
    docs: {
      source: {
        code: `<template>
                <Title color="#695CCD">Titulo</Title>
              </template>`,
      },
    },
  },
  render: () => ({
    components: { Title },
    template: `
        <Title as="h2" color="#695CCD">
          Título com cor customizada
        </Title>
    `,
  }),
};

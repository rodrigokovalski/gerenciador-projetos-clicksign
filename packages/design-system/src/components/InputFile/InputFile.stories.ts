import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";

import InputFile from "./InputFile.vue";

type InputFileStoryArgs = {
  buttonText?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
};

const meta: Meta<InputFileStoryArgs> = {
  title: "Components/InputFile",
  component: InputFile,
  tags: ["autodocs"],
  argTypes: {
    buttonText: { control: "text" },
    accept: { control: "text" },
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  render: args => ({
    components: { InputFile },
    setup() {
      const files = ref<File[]>([]);
      return { args, files };
    },
    template: `
      <div>
        <InputFile
          v-model="files"
          :button-text="args.buttonText"
          :accept="args.accept"
          :multiple="args.multiple"
          :disabled="args.disabled"
          input-id="story-file-input"
        >
          <template #description>
            PDF ou imagem até 10 MB.
          </template>
        </InputFile>
        <p v-if="files.length" style="margin-top: 12px; font-size: 14px; color: #717171;">
          {{ files.length }} arquivo(s) selecionado(s)
        </p>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    buttonText: "Selecionar arquivo",
    disabled: false,
  },
};

export const AcceptImages: Story = {
  args: {
    buttonText: "Enviar imagem",
    accept: "image/*",
    multiple: false,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    buttonText: "Selecionar arquivo",
    disabled: true,
  },
};

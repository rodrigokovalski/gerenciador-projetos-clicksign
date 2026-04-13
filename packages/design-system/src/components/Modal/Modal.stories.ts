import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";

import Button from "../Button/Button.vue";
import Modal from "./Modal.vue";

type ModalStoryArgs = {
  modelValue?: boolean;
  title?: string;
  closable?: boolean;
};

const meta: Meta<ModalStoryArgs> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    closable: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Modal nativo com **`<dialog>`** e **`showModal()`**: foco preso, fechamento com Esc (se `closable`) e clique no backdrop. Controle com **`v-model`** (`modelValue`). Slots **`#header`** (opcional, substitui `title`), **default** (corpo) e **`#footer`** (ações). Para fechar só pelo rodapé, use **`<form method=\"dialog\"><button type=\"submit\">…</button></form>`** (o `Button` do DS usa `type=\"button\"` e não envia o formulário).",
      },
    },
  },
  render: args => ({
    components: { Modal, Button },
    setup() {
      const open = ref(args.modelValue ?? false);
      return { args, open };
    },
    template: `
      <div style="padding: 24px">
        <Button @click="open = true">Abrir modal</Button>
        <Modal v-model="open" :title="args.title" :closable="args.closable">
          <p style="margin: 0 0 12px">Este é o corpo do modal. O backdrop escurece o restante da página.</p>
          <template #footer>
            <form method="dialog" style="display: contents">
              <button
                type="submit"
                style="
                  cursor: pointer;
                  margin-right: 8px;
                  padding: 14px 32px;
                  border-radius: var(--ds-radius-lg);
                  border: 1px solid var(--ds-primary-700);
                  background: var(--ds-neutral-0);
                  color: var(--ds-primary-700);
                  font: inherit;
                "
              >
                Cancelar
              </button>
            </form>
            <Button @click="open = false">Salvar</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: false,
    title: "Título do modal",
    closable: true,
  },
};

export const HeaderCustomizado: Story = {
  name: "Header customizado",
  parameters: {
    docs: {
      source: {
        code: `<Modal v-model="open">
  <template #header>
    <p style="margin: 0; font-weight: 600">Qualquer markup no header</p>
  </template>
  <p>Corpo…</p>
</Modal>`,
      },
    },
  },
  render: () => ({
    components: { Modal, Button },
    setup() {
      const open = ref(false);
      return { open };
    },
    template: `
      <div style="padding: 24px">
        <Button @click="open = true">Abrir</Button>
        <Modal v-model="open" :closable="true">
          <template #header>
            <p style="margin: 0; font: 600 16px/1.4 system-ui">Etapa 2 de 3</p>
          </template>
          <p style="margin: 0">Slot <code>#header</code> substitui a prop <code>title</code>.</p>
          <template #footer>
            <form method="dialog" style="display: contents">
              <button
                type="submit"
                style="
                  cursor: pointer;
                  padding: 14px 32px;
                  border-radius: var(--ds-radius-lg);
                  border: 1px solid var(--ds-primary-700);
                  background: var(--ds-neutral-0);
                  color: var(--ds-primary-700);
                  font: inherit;
                "
              >
                Voltar
              </button>
            </form>
          </template>
        </Modal>
      </div>
    `,
  }),
};

export const SemFecharRapido: Story = {
  name: "Sem fechar (Esc / ×)",
  args: {
    modelValue: false,
    title: "Leia e confirme",
    closable: false,
  },
  render: args => ({
    components: { Modal, Button },
    setup() {
      const open = ref(false);
      return { args, open };
    },
    template: `
      <div style="padding: 24px">
        <Button @click="open = true">Abrir (só fecha pelo rodapé)</Button>
        <Modal v-model="open" :title="args.title" :closable="false">
          <p style="margin: 0 0 12px">Com <code>closable: false</code>, Esc não fecha o diálogo.</p>
          <template #footer>
            <form method="dialog" style="display: contents">
              <button
                type="submit"
                style="
                  cursor: pointer;
                  padding: 14px 32px;
                  border-radius: var(--ds-radius-lg);
                  border: none;
                  background: var(--ds-primary-700);
                  color: var(--ds-neutral-0);
                  font: inherit;
                "
              >
                Li e aceito
              </button>
            </form>
          </template>
        </Modal>
      </div>
    `,
  }),
};

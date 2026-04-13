import type { Meta, StoryObj } from "@storybook/vue3-vite";

import {
  EditIcon,
  EllipsisHorizontalIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@clicksign/icons";

import DropDownItem from "../DropDownItem/DropDownItem.vue";
import Dropdown from "./Dropdown.vue";

type DropdownStoryArgs = {
  headerText?: string;
  menuItem1?: string;
  menuItem2?: string;
};

const meta: Meta<DropdownStoryArgs> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  argTypes: {
    headerText: {
      control: "text",
      description:
        "Conteúdo do slot **header** (texto; veja *Header com HTML* e *Header com ícone* para outros exemplos)",
    },
    menuItem1: {
      control: "text",
      description: "Rótulo do primeiro **DropDownItem** no painel",
    },
    menuItem2: {
      control: "text",
      description: "Rótulo do segundo **DropDownItem** no painel",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Dropdown com **slot `#header`** (gatilho) e **slot default** (painel). No painel, combine **`DropDownItem`** para ações com botão nativo e ícone opcional.",
      },
    },
  },
  render: args => ({
    components: { Dropdown, DropDownItem },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 48px; background: #f5f5f5; min-height: 200px">
        <Dropdown>
          <template #header>
            <span style="font: 500 14px/1.4 system-ui">{{ args.headerText }}</span>
          </template>
          <div style="display: flex; flex-direction: column; gap: 2px; min-width: 200px">
            <DropDownItem :label="args.menuItem1" />
            <DropDownItem :label="args.menuItem2" />
          </div>
        </Dropdown>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headerText: "Abrir menu",
    menuItem1: "Primeira ação",
    menuItem2: "Segunda ação",
  },
};

export const HeaderComHtml: Story = {
  name: "Header com HTML",
  parameters: {
    docs: {
      source: {
        code: `import { EditIcon, PlusCircleIcon, TrashIcon } from "@clicksign/icons";
import { Dropdown, DropDownItem } from "@clicksign/design-system";

<Dropdown>
  <template #header>
    <strong>Título</strong>
    <span style="opacity: 0.7"> — subtítulo</span>
  </template>
  <div style="display: flex; flex-direction: column; gap: 2px; min-width: 200px">
    <DropDownItem label="Editar">
      <template #icon><EditIcon width="18" height="18" /></template>
    </DropDownItem>
    <DropDownItem label="Duplicar">
      <template #icon><PlusCircleIcon width="18" height="18" /></template>
    </DropDownItem>
    <DropDownItem label="Excluir">
      <template #icon><TrashIcon width="18" height="18" /></template>
    </DropDownItem>
  </div>
</Dropdown>`,
      },
    },
  },
  render: () => ({
    components: {
      Dropdown,
      DropDownItem,
      EditIcon,
      PlusCircleIcon,
      TrashIcon,
    },
    template: `
      <div style="padding: 48px; background: #f5f5f5; min-height: 220px">
        <Dropdown>
          <template #header>
            <strong style="font: 600 15px system-ui">Projeto</strong>
            <span style="margin-left: 6px; font: 14px system-ui; color: #666">ações</span>
          </template>
          <div style="display: flex; flex-direction: column; gap: 2px; min-width: 200px">
            <DropDownItem label="Editar">
              <template #icon>
                <EditIcon width="18" height="18" />
              </template>
            </DropDownItem>
            <DropDownItem label="Duplicar">
              <template #icon>
                <PlusCircleIcon width="18" height="18" />
              </template>
            </DropDownItem>
            <DropDownItem label="Excluir">
              <template #icon>
                <TrashIcon width="18" height="18" />
              </template>
            </DropDownItem>
          </div>
        </Dropdown>
      </div>
    `,
  }),
};

export const HeaderComIcone: Story = {
  name: "Header com ícone",
  parameters: {
    docs: {
      source: {
        code: `import { EditIcon, EllipsisHorizontalIcon, TrashIcon } from "@clicksign/icons";
import { Dropdown, DropDownItem } from "@clicksign/design-system";

<Dropdown>
  <template #header>
    <span
      style="
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 8px;
        border-radius: var(--ds-radius-sm);
        border: 1px solid var(--ds-neutral-200);
        background: var(--ds-neutral-0);
      "
      aria-label="Mais opções"
    >
      <EllipsisHorizontalIcon
        width="20"
        height="20"
        style="color: var(--ds-neutral-700)"
      />
    </span>
  </template>
  <div style="display: flex; flex-direction: column; gap: 2px; min-width: 200px">
    <DropDownItem label="Editar">
      <template #icon><EditIcon width="18" height="18" /></template>
    </DropDownItem>
    <DropDownItem label="Excluir">
      <template #icon><TrashIcon width="18" height="18" /></template>
    </DropDownItem>
  </div>
</Dropdown>`,
      },
    },
  },
  render: () => ({
    components: {
      Dropdown,
      DropDownItem,
      EllipsisHorizontalIcon,
      EditIcon,
      TrashIcon,
    },
    template: `
      <div style="padding: 48px; background: #f5f5f5; min-height: 200px">
        <Dropdown>
          <template #header>
            <span
              style="
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 8px;
                border-radius: var(--ds-radius-sm);
                border: 1px solid var(--ds-neutral-200);
                background: var(--ds-neutral-0);
              "
              aria-label="Mais opções"
            >
              <EllipsisHorizontalIcon
                width="20"
                height="20"
                style="color: var(--ds-neutral-700)"
              />
            </span>
          </template>
          <div style="display: flex; flex-direction: column; gap: 2px; min-width: 200px">
            <DropDownItem label="Editar">
              <template #icon>
                <EditIcon width="18" height="18" />
              </template>
            </DropDownItem>
            <DropDownItem label="Excluir">
              <template #icon>
                <TrashIcon width="18" height="18" />
              </template>
            </DropDownItem>
          </div>
        </Dropdown>
      </div>
    `,
  }),
};

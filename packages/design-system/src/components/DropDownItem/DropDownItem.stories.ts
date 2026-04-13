import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { EditIcon, EllipsisHorizontalIcon, TrashIcon } from "@clicksign/icons";

import Dropdown from "../Dropdown/Dropdown.vue";
import DropDownItem from "./DropDownItem.vue";

type DropDownItemStoryArgs = {
  label?: string;
  disabled?: boolean;
};

const meta: Meta<DropDownItemStoryArgs> = {
  title: "Components/DropDownItem",
  component: DropDownItem,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Texto exibido no botão",
    },
    disabled: {
      control: "boolean",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Item de menu como **`<button type=\"button\">`**. Use a prop **`label`** e, se quiser, o slot **`#icon`** com um ícone de `@clicksign/icons`.",
      },
    },
  },
  render: args => ({
    components: { DropDownItem },
    setup() {
      return { args };
    },
    template: `
      <div style="max-width: 260px; padding: 24px; background: #f5f5f5;">
        <div
          style="
            padding: 4px;
            background: var(--ds-neutral-0);
            border: 1px solid var(--ds-neutral-200);
            border-radius: var(--ds-radius-sm);
          "
        >
          <DropDownItem :label="args.label" :disabled="args.disabled" />
        </div>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Editar projeto",
    disabled: false,
  },
};

export const ComIcone: Story = {
  name: "Com ícone",
  parameters: {
    docs: {
      source: {
        code: `import { EditIcon } from "@clicksign/icons";
import { DropDownItem } from "@clicksign/design-system";

<DropDownItem label="Editar">
  <template #icon>
    <EditIcon width="18" height="18" />
  </template>
</DropDownItem>`,
      },
    },
  },
  render: args => ({
    components: { DropDownItem, EditIcon },
    setup() {
      return { args };
    },
    template: `
      <div style="max-width: 260px; padding: 24px; background: #f5f5f5;">
        <div
          style="
            padding: 4px;
            background: var(--ds-neutral-0);
            border: 1px solid var(--ds-neutral-200);
            border-radius: var(--ds-radius-sm);
          "
        >
          <DropDownItem :label="args.label" :disabled="args.disabled">
            <template #icon>
              <EditIcon width="18" height="18" />
            </template>
          </DropDownItem>
        </div>
      </div>
    `,
  }),
  args: {
    label: "Editar",
    disabled: false,
  },
};

export const Desabilitado: Story = {
  args: {
    label: "Ação indisponível",
    disabled: true,
  },
};

export const ListaNoDropdown: Story = {
  name: "Lista no Dropdown",
  parameters: {
    docs: {
      source: {
        code: `import { EllipsisHorizontalIcon, EditIcon, TrashIcon } from "@clicksign/icons";
import { Dropdown, DropDownItem } from "@clicksign/design-system";

<Dropdown>
  <template #header>
    <span aria-label="Ações do projeto">
      <EllipsisHorizontalIcon width="20" height="20" />
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
      EditIcon,
      TrashIcon,
      EllipsisHorizontalIcon,
    },
    template: `
      <div style="padding: 48px; background: #f5f5f5; min-height: 240px">
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
              aria-label="Ações do projeto"
            >
              <EllipsisHorizontalIcon width="20" height="20" style="color: var(--ds-neutral-700)" />
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

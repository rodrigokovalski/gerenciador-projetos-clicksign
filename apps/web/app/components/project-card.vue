<script setup lang="ts">
import {
  Button,
  Card,
  Dropdown,
  DropDownItem,
  Modal,
  Paragraph,
  Title,
} from "@clicksign/design-system";
import {
  CalendarCheckLightIcon,
  CalendarDayLightIcon,
  EditIcon,
  EllipsisHorizontalIcon,
  StarFilledIcon,
  StarOutlinedIcon,
  TrashIcon,
} from "@clicksign/icons";
const env = usePublicEnv();

const props = defineProps<{
  id: number;
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  favorite: boolean;
  imageUrl?: string | null;
}>();

const emit = defineEmits<{
  deleted: [];
  updated: [];
}>();

const titleColor = "var(--ds-primary-800)";
const metaColor = "var(--ds-neutral-600)";

const pendingDelete = ref(false);
const pendingFavorite = ref(false);
const deleteModalOpen = ref(false);
const menuKey = ref(0);

function bumpMenuKey() {
  menuKey.value += 1;
}

function formatDateDisplay(value: string) {
  const trimmed = value.trim();
  const ymd = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (ymd) {
    const y = Number(ymd[1]);
    const m = Number(ymd[2]) - 1;
    const d = Number(ymd[3]);
    return new Date(y, m, d).toLocaleDateString("pt-BR");
  }
  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime()))
    return value;
  return parsed.toLocaleDateString("pt-BR");
}

function openDeleteModal() {
  bumpMenuKey();
  deleteModalOpen.value = true;
}

function closeDeleteModal() {
  deleteModalOpen.value = false;
}

async function confirmDelete() {
  if (pendingDelete.value)
    return;
  pendingDelete.value = true;
  try {
    await $fetch(`${env.NUXT_PUBLIC_API_BASE_URL}/api/v1/projects/${props.id}`, { method: "DELETE" });
    emit("deleted");
    deleteModalOpen.value = false;
  }
  finally {
    pendingDelete.value = false;
  }
}

function onMenuEdit() {
  bumpMenuKey();
  void navigateTo(`/edit/${props.id}`);
}

async function onToggleFavorite() {
  if (pendingFavorite.value)
    return;
  pendingFavorite.value = true;
  try {
    await $fetch(`${env.NUXT_PUBLIC_API_BASE_URL}/api/v1/projects/${props.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: { project: { favorite: !props.favorite } },
    });
    emit("updated");
  }
  finally {
    pendingFavorite.value = false;
  }
}
</script>

<template>
  <Card class="project-card">
    <div v-if="imageUrl" class="project-card__media">
      <NuxtImg
        :src="imageUrl"
        :alt="name"
        class="project-card__image"
        width="640"
        height="360"
        sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 320px"
        loading="lazy"
        decoding="async"
        format="webp"
      />
      <div class="project-card__media-overlay">
        <button
          type="button"
          class="project-card__star-btn"
          :disabled="pendingFavorite"
          :aria-pressed="favorite"
          :aria-label="favorite ? 'Desfavoritar projeto' : 'Favoritar projeto'"
          @click="onToggleFavorite"
        >
          <StarFilledIcon v-if="favorite" class="project-card__star project-card__star--filled" />
          <StarOutlinedIcon v-else class="project-card__star" />
        </button>
        <Dropdown :key="menuKey" class="project-card__dropdown">
          <template #header>
            <button
              type="button"
              class="project-card__icon-btn project-card__menu-trigger"
              aria-label="Abrir menu do projeto"
            >
              <EllipsisHorizontalIcon />
            </button>
          </template>
          <div class="project-card__dropdown-panel">
            <DropDownItem label="Editar" @click="onMenuEdit">
              <template #icon>
                <EditIcon width="18" height="18" />
              </template>
            </DropDownItem>
            <DropDownItem label="Remover" @click="openDeleteModal">
              <template #icon>
                <TrashIcon width="18" height="18" />
              </template>
            </DropDownItem>
          </div>
        </Dropdown>
      </div>
    </div>
    <div v-else class="project-card__toolbar">
      <button
        type="button"
        :disabled="pendingFavorite"
        :aria-pressed="favorite"
        :aria-label="favorite ? 'Desfavoritar projeto' : 'Favoritar projeto'"
        @click="onToggleFavorite"
      >
        <StarFilledIcon v-if="favorite" class="project-card__star project-card__star--filled" />
        <StarOutlinedIcon v-else class="project-card__star" />
      </button>
      <Dropdown :key="menuKey" class="project-card__dropdown">
        <template #header>
          <button
            type="button"
            class="project-card__icon-btn project-card__icon-btn--toolbar project-card__menu-trigger"
            aria-label="Abrir menu do projeto"
          >
            <EllipsisHorizontalIcon />
          </button>
        </template>
        <div class="project-card__dropdown-panel">
          <DropDownItem label="Editar" @click="onMenuEdit">
            <template #icon>
              <EditIcon width="18" height="18" />
            </template>
          </DropDownItem>
          <DropDownItem label="Remover" @click="openDeleteModal">
            <template #icon>
              <TrashIcon width="18" height="18" />
            </template>
          </DropDownItem>
        </div>
      </Dropdown>
    </div>
    <div class="project-card__body">
      <Title as="h4" :color="titleColor">
        {{ name }}
      </Title>
      <Paragraph size="sm" :color="metaColor">
        Cliente: {{ client }}
      </Paragraph>
      <hr class="project-card__divider">
      <div class="project-card__dates">
        <Paragraph size="sm" :color="metaColor">
          <CalendarDayLightIcon /> Início: {{ formatDateDisplay(startDate) }}
        </Paragraph>
        <Paragraph size="sm" :color="metaColor">
          <CalendarCheckLightIcon /> Término: {{ formatDateDisplay(endDate) }}
        </Paragraph>
      </div>
    </div>
    <Modal
      v-model="deleteModalOpen"
      title="Remover projeto"
    >
      <Paragraph class="project-card__modal-body">
        Essa ação removerá definitivamente o projeto:<br>
        <strong class="project-card__modal-body-name">{{ name }}</strong>
      </Paragraph>
      <template #footer>
        <div class="project-card__modal-footer">
          <Button
            type="button"
            variant="outlined"
            :disabled="pendingDelete"
            @click="closeDeleteModal"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            :disabled="pendingDelete"
            @click="confirmDelete"
          >
            Confirmar
          </Button>
        </div>
      </template>
    </Modal>
  </Card>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}

.project-card__media {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 235px;
  margin-inline: auto;
  background: var(--ds-neutral-100);
}

.project-card__image {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-card__media-overlay {
  position: absolute;
  z-index: 1;
  right: 16px;
  bottom: 16px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.project-card__toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 12px 0;
  background: var(--ds-neutral-100);
}

.project-card__dropdown {
  flex-shrink: 0;
}

.project-card__dropdown :deep(.ds-dropdown__panel) {
  right: 0;
  left: auto;
  min-width: 180px;
}

.project-card__dropdown-panel {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.project-card__icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: var(--ds-radius-50);
  background: rgb(255 255 255 / 0.92);
  color: var(--ds-neutral-800);
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.12);
  cursor: pointer;
}

.project-card__icon-btn:hover:not(:disabled) {
  background: var(--ds-neutral-0);
}

.project-card__icon-btn:focus-visible {
  outline: 2px solid var(--ds-primary-700);
  outline-offset: 2px;
}

.project-card__icon-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.project-card__icon-btn--toolbar {
  background: var(--ds-neutral-0);
  border: 1px solid var(--ds-neutral-200);
  box-shadow: none;
}

.project-card__menu-trigger {
  color: var(--ds-neutral-700);
}

.project-card__star-btn {
  background: transparent;
  border: none;
  cursor: pointer;
}

.project-card__star {
  display: block;
}

.project-card__star--filled {
  color: var(--ds-primary-600);
}

.project-card__body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  flex: 1;
}

.project-card__dates {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 4px;

  p {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}

.project-card__divider {
  border-top: 1px solid var(--ds-neutral-100);
  margin: 16px 0;
}

.project-card__modal-body {
  text-align: center;
}

.project-card__modal-footer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  width: 100%;
}

.project-card__modal-body-name {
  color: var(--ds-neutral-900);
  margin-top: 16px;
  display: block;
  font-size: var(--ds-font-size-2xl);
  font-weight: var(--ds-font-weight-normal);
}
</style>

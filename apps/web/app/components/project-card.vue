<script setup lang="ts">
import { Button, Card, Paragraph, Title } from "@clicksign/design-system";
import { CalendarCheckLightIcon, CalendarDayLightIcon, EditIcon, StarOutlinedIcon, TrashIcon } from "@clicksign/icons";

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

function formatDateDisplay(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime()))
    return value;
  return d.toLocaleDateString("pt-BR");
}

async function onRemove() {
  if (pendingDelete.value)
    return;
  pendingDelete.value = true;
  try {
    await $fetch(`http://localhost:3001/api/projects/${props.id}`, { method: "DELETE" });
    emit("deleted");
  }
  finally {
    pendingDelete.value = false;
  }
}

async function onToggleFavorite() {
  if (pendingFavorite.value)
    return;
  pendingFavorite.value = true;
  try {
    await $fetch(`http://localhost:3001/api/projects/${props.id}`, {
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
      <img
        :src="imageUrl"
        :alt="name"
        class="project-card__image"
      >
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
        <div class="project-card__actions">
          <NuxtLink :to="`/edit/${id}`" class="project-card__link">
            <Button type="button">
              <EditIcon />
              Editar
            </Button>
          </NuxtLink>
          <Button
            type="button"
            :disabled="pendingDelete"
            @click="onRemove"
          >
            <TrashIcon />
            Remover
          </Button>
          <Button
            type="button"
            :disabled="pendingFavorite"
            @click="onToggleFavorite"
          >
            <StarOutlinedIcon />
            {{ favorite ? "Desfavoritar" : "Favoritar" }}
          </Button>
        </div>
      </div>
    </div>
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
  aspect-ratio: 16 / 9;
  background: var(--ds-neutral-100);
}

.project-card__image {
  display: block;
  width: 100%;
  max-height: 235px;
  height: 100%;
  object-fit: cover;
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

.project-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}

.project-card__link {
  text-decoration: none;
  color: inherit;
}

.project-card__divider {
  border-top: 1px solid var(--ds-neutral-100);
  margin: 16px 0;
}
</style>

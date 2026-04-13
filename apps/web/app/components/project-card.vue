<script setup lang="ts">
import { Card, Paragraph, Title } from "@clicksign/design-system";
import { CalendarCheckLightIcon, CalendarDayLightIcon } from "@clicksign/icons";

defineProps<{
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  imageUrl?: string | null;
}>();

const titleColor = "var(--ds-primary-800)";
const metaColor = "var(--ds-neutral-600)";

function formatDateDisplay(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime()))
    return value;
  return d.toLocaleDateString("pt-BR");
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
        <NuxtLink>
          <Button>
            <PencilIcon />
            Editar
          </Button>
        </NuxtLink>
        <Button>
          <TrashIcon />
          Remover
        </Button>
        <Button>
          <StarIcon />
          Favoritar
        </Button>
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

.project-card__divider {
  border-top: 1px solid var(--ds-neutral-100);
  margin: 16px 0;
}
</style>

<script setup lang="ts">
import { Button, InputFile, Label } from "@clicksign/design-system";
import { CalendarCheckLightIcon, CalendarDayLightIcon, TrashIcon } from "@clicksign/icons";

type FormErrors = {
  name?: string;
  client?: string;
  dataInicio?: string;
  dataFim?: string;
};

defineProps<{
  errors: FormErrors;
  coverImageValue: File[] | undefined;
  hasCoverPreview: boolean;
  coverDisplaySrc: string;
  submitLabel: string;
  imageDescription: string;
}>();

const emit = defineEmits<{
  submit: [];
  "clear-cover": [];
  "update:coverImage": [files: File[]];
}>();

function onCoverUpdate(files: File[]) {
  emit("update:coverImage", files);
}
</script>

<template>
  <div class="form">
    <form @submit.prevent="emit('submit')">
      <div class="form-group">
        <FormField
          name="name"
          label="Nome do projeto"
          :error="errors.name"
        />
      </div>
      <div class="form-group">
        <FormField
          name="client"
          label="Cliente"
          :error="errors.client"
        />
      </div>
      <div class="flex">
        <div class="form-group">
          <FormField
            name="dataInicio"
            label="Data de início"
            type="date"
            :error="errors.dataInicio"
            :icon="CalendarDayLightIcon"
          />
        </div>
        <div class="form-group">
          <FormField
            name="dataFim"
            label="Data final"
            type="date"
            :error="errors.dataFim"
            :icon="CalendarCheckLightIcon"
          />
        </div>
      </div>
      <div class="form-group">
        <Label class="label" for="project-files">Capa do projeto</Label>
        <div v-if="hasCoverPreview" class="cover-preview">
          <button
            type="button"
            class="cover-preview__remove"
            aria-label="Remover imagem"
            @click="emit('clear-cover')"
          >
            <TrashIcon />
          </button>
          <img
            v-if="coverDisplaySrc"
            :src="coverDisplaySrc"
            alt=""
            class="cover-preview__img"
          >
        </div>
        <InputFile
          v-else
          input-id="project-files"
          name="coverImage"
          accept="image/*"
          :multiple="false"
          class="input-file"
          :model-value="coverImageValue"
          @update:model-value="onCoverUpdate"
        >
          <template #description>
            {{ imageDescription }}
          </template>
        </InputFile>
      </div>
      <Button type="submit" class="button" :disabled="Object.keys(errors).length > 0">
        {{ submitLabel }}
      </Button>
    </form>
  </div>
</template>

<style scoped>
.form {
  max-width: 760px;
  margin: 0 auto;
  width: 100%;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 32px;
  flex: 1;
}
.flex {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.input-file {
  background-color: transparent !important;
}
.button {
  width: 100%;
}
.label {
  color: var(--ds-primary-700);
}
.cover-preview {
  position: relative;
  width: 100%;
  min-height: 170px;
  border: 1px dashed var(--ds-neutral-200);
  border-radius: var(--ds-radius-4);
  background: var(--ds-neutral-0);
  box-sizing: border-box;
}
.cover-preview__img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  object-fit: cover;
  border-radius: var(--ds-radius-4);
}
.cover-preview__remove {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: var(--ds-radius-4);
  background: var(--ds-neutral-0);
  color: var(--ds-primary-700);
  box-shadow: 0 1px 4px rgb(0 0 0 / 12%);
  cursor: pointer;
}
.cover-preview__remove:hover {
  color: var(--ds-primary-800);
}
</style>

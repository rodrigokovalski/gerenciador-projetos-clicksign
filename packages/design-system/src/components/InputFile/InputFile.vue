<script setup lang="ts">
import { useTemplateRef, watch } from "vue";

import { UploadLightIcon } from "@clicksign/icons";

import Button from "../Button/Button.vue";
import Paragraph from "../Typography/Paragraph/Paragraph.vue";

const props = withDefaults(
  defineProps<{
    modelValue?: File[];
    buttonText?: string;
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    name?: string;
    inputId?: string;
  }>(),
  {
    modelValue: () => [],
    buttonText: "Selecionar arquivo",
    disabled: false,
    accept: undefined,
    multiple: false,
    name: undefined,
    inputId: undefined,
  },
);

const emit = defineEmits<{
  "update:modelValue": [files: File[]];
}>();

const fileInputRef = useTemplateRef<HTMLInputElement>("fileInput");

watch(
  () => props.modelValue,
  (files) => {
    if (files.length === 0 && fileInputRef.value) {
      fileInputRef.value.value = "";
    }
  },
);

function openFilePicker() {
  if (props.disabled) {
    return;
  }
  fileInputRef.value?.click();
}

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const list = input.files;
  const files = list ? Array.from(list) : [];
  emit("update:modelValue", files);
}
</script>

<template>
  <div
    class="ds-input-file"
    data-testid="ds-input-file"
  >
    <input
      :id="inputId"
      ref="fileInput"
      type="file"
      class="ds-input-file__native"
      :name="name"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      tabindex="-1"
      data-testid="ds-input-file-native"
      @change="onFileChange"
    >
    <div class="ds-input-file__body">
      <span
        class="ds-input-file__icon"
        aria-hidden="true"
      >
        <UploadLightIcon />
      </span>
      <Paragraph
        size="sm"
        class="ds-input-file__text"
      >
        <slot name="description">
          Envie um arquivo do seu dispositivo.
        </slot>
      </Paragraph>
      <Button
        variant="outlined"
        :disabled="disabled"
        @click="openFilePicker"
      >
        {{ buttonText }}
      </Button>
    </div>
  </div>
</template>

<style scoped>
.ds-input-file {
  position: relative;
  box-sizing: border-box;
  min-height: 170px;
  padding: 24px 16px;
  border: 1px dashed var(--ds-neutral-200);
  border-radius: var(--ds-radius-4);
  background: var(--ds-neutral-0);
  width: 100%;
}

.ds-input-file__native {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.ds-input-file__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: calc(170px - 48px);
  text-align: center;
}

.ds-input-file__icon {
  display: flex;
  color: var(--ds-primary-700);
}

</style>

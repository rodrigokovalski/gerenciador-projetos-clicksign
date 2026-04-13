<script setup lang="ts">
import { nextTick, onMounted, useTemplateRef, watch } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title?: string;
    /** Exibe o botão fechar (×) e permite fechar com Esc; se `false`, chame `close()` manualmente ou use botões com `formmethod="dialog"`. */
    closable?: boolean;
  }>(),
  {
    title: undefined,
    closable: true,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const dialogRef = useTemplateRef<HTMLDialogElement>("modalDialog");

function syncDialogOpen() {
  const el = dialogRef.value;
  if (!el) {
    return;
  }
  if (props.modelValue && !el.open) {
    el.showModal();
  }
  else if (!props.modelValue && el.open) {
    el.close();
  }
}

watch(
  () => props.modelValue,
  () => {
    void nextTick(syncDialogOpen);
  },
);

onMounted(() => {
  void nextTick(syncDialogOpen);
});

function onDialogClose() {
  emit("update:modelValue", false);
}

function requestClose() {
  dialogRef.value?.close();
}

function onCancel(event: Event) {
  if (!props.closable) {
    event.preventDefault();
  }
}
</script>

<template>
  <dialog
    ref="modalDialog"
    class="ds-modal"
    data-testid="ds-modal"
    @close="onDialogClose"
    @cancel="onCancel"
  >
    <div class="ds-modal__surface">
      <div
        v-if="title || $slots.header || closable"
        class="ds-modal__header"
      >
        <div class="ds-modal__header-main">
          <slot name="header">
            <h2
              v-if="title"
              class="ds-modal__title"
            >
              {{ title }}
            </h2>
          </slot>
        </div>
        <button
          v-if="closable"
          type="button"
          class="ds-modal__close"
          aria-label="Fechar"
          data-testid="ds-modal-close"
          @click="requestClose"
        >
          ×
        </button>
      </div>
      <div class="ds-modal__body">
        <slot />
      </div>
      <div
        v-if="$slots.footer"
        class="ds-modal__footer"
      >
        <slot name="footer" />
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.ds-modal {
  max-width: calc(100vw - 32px);
  width: min(480px, 100%);
  margin: auto;
  padding: 0;
  border: none;
  background: transparent;
}

.ds-modal::backdrop {
  background: rgb(0 0 0 / 0.45);
}

.ds-modal__surface {
  overflow: hidden;
  border-radius: var(--ds-radius-4);
  border: 1px solid var(--ds-neutral-200);
  background: var(--ds-neutral-0);
  box-shadow: 0 16px 48px rgb(0 0 0 / 0.18);
}

.ds-modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 16px 0;
}

.ds-modal__header-main {
  flex: 1;
  min-width: 0;
}

.ds-modal__title {
  margin: 0;
  font-family: inherit;
  font-size: var(--ds-font-size-xl);
  font-weight: 600;
  line-height: var(--ds-line-height-normal);
  color: var(--ds-neutral-900);
}

.ds-modal__close {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin: -6px -6px 0 0;
  padding: 0;
  border: none;
  border-radius: var(--ds-radius-sm);
  background: transparent;
  color: var(--ds-neutral-700);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
}

.ds-modal__close:hover {
  background: var(--ds-neutral-100);
}

.ds-modal__close:focus-visible {
  outline: 2px solid var(--ds-primary-700);
  outline-offset: 2px;
}

.ds-modal__body {
  padding: 16px;
  font-family: inherit;
  font-size: var(--ds-font-size-md);
  line-height: var(--ds-line-height-normal);
  color: var(--ds-neutral-900);
}

.ds-modal__header + .ds-modal__body {
  padding-top: 12px;
}

.ds-modal__footer {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
  padding: 0 16px 16px;
}
</style>

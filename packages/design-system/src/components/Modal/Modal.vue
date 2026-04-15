<script setup lang="ts">
import { TrashIcon } from "@clicksign/icons";
import { nextTick, onMounted, useTemplateRef, watch } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title?: string;
    /** Se `false`, Esc não fecha o diálogo (backdrop continua nativo do `<dialog>`). */
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
        v-if="title || $slots.header || props.closable"
        class="ds-modal__header"
      >
        <TrashIcon class="ds-modal__trash-icon" />
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
      </div>
      <hr class="ds-modal__divider" />
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
  width: min(582px, calc(100vw - 32px));
  max-width: calc(100vw - 32px);
  margin: auto;
  padding: 40px 0 0;
  border: none;
  background: transparent;
  overflow: visible;
  box-sizing: border-box;
}

.ds-modal::backdrop {
  background: rgb(0 0 0 / 0.45);
}

.ds-modal__surface {
  margin-top: -40px;
  border-radius: var(--ds-radius-4);
  border: 1px solid var(--ds-neutral-200);
  background: var(--ds-neutral-0);
  box-shadow: 0 16px 48px rgb(0 0 0 / 0.18);
  overflow: visible;
  width: 100%;
}

.ds-modal__header {
  text-align: center;
  padding: 32px 32px 0;
  position: relative;
  overflow: visible;
}

.ds-modal__trash-icon {
  position: absolute;
  top: -32px;
  left: 50%;
  transform: translateX(-50%);
  width: 64px;
  height: 64px;
  color: var(--ds-neutral-700);
  border-radius: var(--ds-radius-50);
  padding: 22px;
  background: var(--ds-primary-700);
  color: var(--ds-neutral-0);
}

.ds-modal__header-main {
  flex: 1;
  min-width: 0;
  margin-top: 16px;
}

.ds-modal__title {
  margin: 0;
  font-family: inherit;
  font-size: var(--ds-font-size-xl);
  font-weight: 600;
  line-height: var(--ds-line-height-normal);
  color: var(--ds-primary-800);
}

.ds-modal__body {
  padding: 0 32px 32px;
  font-family: inherit;
  font-size: var(--ds-font-size-md);
  line-height: var(--ds-line-height-normal);
  color: var(--ds-neutral-900);
}

.ds-modal__footer {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
  padding: 0 32px 32px;
}
.ds-modal__divider {
  border-top: 1px solid var(--ds-neutral-200);
  margin: 24px 32px 32px;
}
</style>

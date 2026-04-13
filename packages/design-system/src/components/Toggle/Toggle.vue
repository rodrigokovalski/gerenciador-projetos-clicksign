<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: boolean;
    /** Texto à direita do interruptor */
    label?: string;
    id?: string;
    name?: string;
    disabled?: boolean;
  }>(),
  {
    modelValue: false,
    disabled: false,
    label: undefined,
    id: undefined,
    name: undefined,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

function onChange(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.checked);
}
</script>

<template>
  <label
    class="ds-toggle"
    data-testid="ds-toggle"
  >
    <input
      :id="id"
      type="checkbox"
      class="ds-toggle__input"
      role="switch"
      :name="name"
      :checked="modelValue"
      :disabled="disabled"
      :aria-checked="modelValue"
      data-testid="ds-toggle-input"
      @change="onChange"
    >
    <span
      class="ds-toggle__track"
      aria-hidden="true"
    />
    <span
      v-if="label"
      class="ds-toggle__label"
    >{{ label }}</span>
  </label>
</template>

<style scoped>
.ds-toggle {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  cursor: pointer;
  user-select: none;
}

.ds-toggle__input {
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

.ds-toggle__input:focus-visible + .ds-toggle__track {
  outline: 2px solid var(--ds-primary-700);
  outline-offset: 2px;
}

.ds-toggle__input:disabled + .ds-toggle__track {
  opacity: 0.5;
  cursor: not-allowed;
}

.ds-toggle:has(.ds-toggle__input:disabled) {
  cursor: not-allowed;
}

.ds-toggle__track {
  position: relative;
  flex-shrink: 0;
  width: 44px;
  height: 24px;
  border-radius: 999px;
  background: var(--ds-neutral-300);
  transition: background 0.15s ease;
}

.ds-toggle__track::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--ds-neutral-0);
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.12);
  transition: transform 0.15s ease;
}

.ds-toggle__input:checked + .ds-toggle__track {
  background: var(--ds-primary-700);
}

.ds-toggle__input:checked + .ds-toggle__track::after {
  transform: translateX(20px);
}

.ds-toggle__label {
  font-family: inherit;
  font-size: var(--ds-font-size-md);
  font-weight: var(--ds-font-weight-regular);
  line-height: var(--ds-line-height-normal);
  color: var(--ds-neutral-900);
}
</style>

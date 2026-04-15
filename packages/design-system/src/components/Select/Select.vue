<script setup lang="ts">
import { ChevronDownLightIcon } from "@clicksign/icons";

withDefaults(
  defineProps<{
    modelValue?: string;
    id?: string;
    name?: string;
    disabled?: boolean;
    placeholder?: string;
  }>(),
  {
    modelValue: "",
    disabled: false,
    id: undefined,
    name: undefined,
    placeholder: undefined,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

function onChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  emit("update:modelValue", target.value);
}
</script>

<template>
  <div class="ds-select-wrap">
    <select
      :id="id"
      :name="name"
      class="ds-select"
      :value="modelValue"
      :disabled="disabled"
      data-testid="ds-select"
      @change="onChange"
    >
      <option
        v-if="placeholder !== undefined && placeholder !== ''"
        value=""
        disabled
      >
        {{ placeholder }}
      </option>
      <slot />
    </select>
    <span class="ds-select__icon" aria-hidden="true">
      <ChevronDownLightIcon />
    </span>
  </div>
</template>

<style scoped>
.ds-select-wrap {
  position: relative;
  width: 100%;
  min-width: 0;
}

.ds-select {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: 8px 47px 8px 16px;
  border: 1px solid var(--ds-neutral-500);
  border-radius: var(--ds-radius-8);
  background: var(--ds-neutral-0);
  font-family: inherit;
  font-size: var(--ds-font-size-md);
  font-weight: var(--ds-font-weight-regular);
  line-height: var(--ds-line-height-normal);
  color: var(--ds-neutral-900);
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.ds-select::-ms-expand {
  display: none;
}

.ds-select__icon {
  position: absolute;
  top: 50%;
  right: 16px;
  display: flex;
  line-height: 0;
  color: var(--ds-neutral-600);
  pointer-events: none;
  transform: translateY(-50%);
}

.ds-select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: var(--ds-neutral-200);
}

.ds-select-wrap:has(.ds-select:disabled) .ds-select__icon {
  opacity: 0.6;
}

.ds-select:focus-visible {
  outline: 2px solid var(--ds-primary-700);
  outline-offset: 2px;
}
</style>

<script setup lang="ts">
import { SearchIcon } from "@clicksign/icons";

withDefaults(
  defineProps<{
    modelValue?: string;
    id?: string;
    name?: string;
    placeholder?: string;
    disabled?: boolean;
    ariaLabel?: string;
  }>(),
  {
    modelValue: "",
    disabled: false,
    id: undefined,
    name: undefined,
    placeholder: undefined,
    ariaLabel: "Buscar",
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
</script>

<template>
  <div class="ds-search" data-testid="ds-search">
    <span class="ds-search__icon" aria-hidden="true">
      <SearchIcon />
    </span>
    <input
      :id="id"
      :name="name"
      class="ds-search__input"
      type="search"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-label="ariaLabel"
      enterkeyhint="search"
      data-testid="ds-search-input"
      @input="onInput"
    >
  </div>
</template>

<style scoped>
.ds-search {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: 8px 16px 8px 12px;
  border: 1px solid var(--ds-neutral-500);
  border-radius: var(--ds-radius-4);
  background: var(--ds-neutral-0);
  color: var(--ds-neutral-600);
  height: 100%;
}

.ds-search:focus-within {
  outline: 2px solid var(--ds-primary-700);
  outline-offset: 2px;
}

.ds-search__icon {
  display: flex;
  flex-shrink: 0;
  line-height: 0;
}

.ds-search__input {
  box-sizing: border-box;
  flex: 1 1 0;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  font-family: inherit;
  font-size: var(--ds-font-size-md);
  font-weight: var(--ds-font-weight-regular);
  line-height: var(--ds-line-height-normal);
  color: var(--ds-neutral-900);
}

.ds-search__input::placeholder {
  color: var(--ds-neutral-500);
}

.ds-search__input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.ds-search:has(.ds-search__input:disabled) {
  background: var(--ds-neutral-200);
  cursor: not-allowed;
}

.ds-search__input:focus {
  outline: none;
}
</style>

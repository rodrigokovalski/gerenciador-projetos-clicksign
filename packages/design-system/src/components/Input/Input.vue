<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: string;
    type?: "text" | "date";
    id?: string;
    name?: string;
    placeholder?: string;
    disabled?: boolean;
    autocomplete?: string;
  }>(),
  {
    modelValue: "",
    type: "text",
    disabled: false,
    id: undefined,
    name: undefined,
    placeholder: undefined,
    autocomplete: undefined,
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
  <input
    :id="id"
    :name="name"
    class="ds-input"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :autocomplete="autocomplete"
    data-testid="ds-input"
    @input="onInput"
  >
</template>

<style scoped>
.ds-input {
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 8px 16px;
  border: 1px solid var(--ds-neutral-500);
  border-radius: var(--ds-radius-4);
  background: var(--ds-neutral-0);
  font-family: inherit;
  font-size: var(--ds-font-size-md);
  font-weight: var(--ds-font-weight-regular);
  line-height: var(--ds-line-height-normal);
  color: var(--ds-neutral-900);
}

.ds-input::placeholder {
  color: var(--ds-neutral-500);
}

.ds-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: var(--ds-neutral-200);
}

.ds-input:focus-visible {
  outline: 2px solid var(--ds-primary-700);
  outline-offset: 2px;
}
</style>

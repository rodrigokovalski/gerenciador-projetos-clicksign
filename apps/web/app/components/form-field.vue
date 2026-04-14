<script lang="ts" setup>
import { Field } from "vee-validate";

const props = withDefaults(
  defineProps<{
    error?: string;
    label: string;
    name: string;
    type?: "text" | "date";
    disabled?: boolean;
    placeholder?: string;
    showRequired?: boolean;
  }>(),
  {
    error: undefined,
    type: "text",
    disabled: false,
    placeholder: undefined,
    showRequired: true,
  },
);
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.label }}
      <span v-if="props.showRequired" class="hint">(Obrigatório)</span>
    </legend>
    <Field v-slot="{ field }" :name="props.name">
      <input
        v-bind="field"
        :id="field.name"
        :type="props.type"
        :disabled="props.disabled"
        :placeholder="props.placeholder"
        class="ds-input"
        :class="{ 'ds-input--error': props.error }"
      >
    </Field>
    <p v-if="props.error" class="field-error">
      {{ props.error }}
    </p>
  </fieldset>
</template>

<style scoped>
.fieldset {
  border: none;
  padding: 0;
  margin: 0;
  min-width: 0;
}

.fieldset-legend {
  color: var(--ds-primary-700);
  font-size: var(--ds-font-size-lg);
  padding: 0;
  margin-bottom: 8px;
}

.hint {
  color: var(--ds-neutral-500);
  font-weight: var(--ds-font-weight-regular);
  margin-left: 8px;
}

.ds-input {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: 8px 16px;
  border: 1px solid var(--ds-neutral-500);
  border-radius: var(--ds-radius-8);
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

.ds-input--error {
  border-color: var(--ds-error-600);
}

.ds-input--error:focus-visible {
  outline-color: var(--ds-error-600);
}

.field-error {
  margin-top: 6px;
  font-size: var(--ds-font-size-sm);
  color: var(--ds-error-600);
}

</style>

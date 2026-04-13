<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);
</script>

<template>
  <button
    type="button"
    class="ds-dropdown-item"
    :disabled="disabled"
    data-testid="ds-dropdown-item"
  >
    <span
      v-if="$slots.icon"
      class="ds-dropdown-item__icon"
      aria-hidden="true"
    >
      <slot name="icon" />
    </span>
    <span class="ds-dropdown-item__label">{{ label }}</span>
  </button>
</template>

<style scoped>
.ds-dropdown-item {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
  margin: 0;
  padding: 8px 10px;
  border: none;
  border-radius: var(--ds-radius-sm);
  background: transparent;
  color: var(--ds-neutral-900);
  font: 500 14px/1.4 system-ui, sans-serif;
  text-align: left;
  cursor: pointer;
}

.ds-dropdown-item:hover:not(:disabled) {
  background: var(--ds-neutral-100);
}

.ds-dropdown-item:focus-visible {
  outline: 2px solid var(--ds-primary-700);
  outline-offset: -2px;
}

.ds-dropdown-item:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ds-dropdown-item__icon {
  display: inline-flex;
  flex-shrink: 0;
  color: var(--ds-neutral-700);
}

.ds-dropdown-item__label {
  flex: 1;
  min-width: 0;
}
</style>

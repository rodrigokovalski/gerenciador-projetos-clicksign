<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "primary" | "outlined";
    disabled?: boolean;
  }>(),
  {
    variant: "primary",
    disabled: false,
  },
);

</script>

<template>
  <button
    type="button"
    :class="['ds-button', `ds-button--${variant}`]"
    :data-variant="variant"
    :disabled="disabled"
    data-testid="ds-button"
  >
    <slot />
  </button>
</template>

<style scoped>
.ds-button {
  cursor: pointer;
  border-radius: var(--ds-radius-lg);
  padding: 14px 32px;
  border: 1px solid transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.ds-button--primary {
  background: var(--ds-primary-700);
  color: var(--ds-neutral-0);

  &[disabled] {
    background: var(--ds-primary-400);
  }
}
.ds-button--outlined {
  background: var(--ds-neutral-0);
  border-color: var(--ds-primary-700);
  color: var(--ds-primary-700);

  &[disabled] {
    opacity: 0.5;
  }
}
</style>

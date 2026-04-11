<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'outlined',
    disabled?: boolean,
  }>(),
  {
    variant: 'primary',
    disabled: false,
  },
)

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
  border-radius: 26px;
  padding: 14px 32px;
  border: 1px solid transparent;
}

.ds-button--primary {
  background: #695CCD;
  color: #fff;

  &[disabled] {
    background: #B2A8FF;
  }
}
.ds-button--outlined {
  background: #fff;
  border-color: #695CCD;
  color: #695CCD;

  &[disabled] {
    opacity: 0.5;
  }
}
</style>

<template>
  <div class="ds-card" data-testid="ds-card">
    <slot />
  </div>
</template>

<style scoped>
.ds-card {
  background: var(--ds-neutral-0);
  border-radius: var(--ds-radius-sm);
  border: 1px solid var(--ds-neutral-200);
}
</style>

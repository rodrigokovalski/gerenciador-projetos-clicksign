<template>
  <header class="ds-header" data-testid="ds-header">
    <slot />
  </header>
</template>

<style scoped>
.ds-header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: var(--ds-neutral-900);
  border-bottom: 1px solid var(--ds-neutral-950);
  box-shadow: var(--ds-shadow-md);
}
</style>

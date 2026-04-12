<script setup lang="ts">
import { Card, Span, Title } from "@clicksign/design-system";
import { ArrowLeftIcon } from "@clicksign/icons";

</script>

<template>
  <div>
    <div class="header">
      <Span class="link-container">
        <NuxtLink to="/" class="link">
          <ArrowLeftIcon />
          Voltar
        </NuxtLink>
      </Span>
      <Title as="h2" :color="'var(--ds-primary-800)'">
        Novo projeto
      </Title>
    </div>
    <div class="content">
      <Card class="card" />
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 32px;
}
.card {
  padding: 16px;
  background: transparent;
  border-radius: var(--ds-radius-8);
}
.link-container {
width: fit-content;
}
.link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--ds-primary-700);
}
</style>

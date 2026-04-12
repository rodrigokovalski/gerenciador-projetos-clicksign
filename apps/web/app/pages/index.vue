<script setup lang="ts">
import { Button, Paragraph, Title } from "@clicksign/design-system";

</script>

<template>
  <div class="card">
    <div class="flex">
      <Title as="h4" :color="'var(--ds-primary-800)'">
        Nenhum projeto
      </Title>
      <Paragraph>Clique no botão abaixo para criar o primeiro e gerenciá-lo.</Paragraph>
      <NuxtLink to="/add">
        <Button class="mt-4">
          Novo projeto
        </Button>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 200px);
  background: white;
  border-radius: var(--ds-radius-4);

  @media (max-width: 768px) {
    height: calc(100vh - 164px);
  }
  @media (max-width: 480px) {
    height: calc(100vh - 128px);
  }
}
.flex {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  align-items: center;
  padding: 16px;
  text-align: center;
}
.mt-4 {
  margin-top: 16px;
}
</style>

<script setup lang="ts">
import { Button, Card, Input, InputFile, Label, Span, Title } from "@clicksign/design-system";
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
      <Card class="card">
        <div class="form">
          <form action="">
            <div class="form-group">
              <Label for="name">Nome do projeto</Label>
              <Input type="text" id="name" name="name" />
            </div>
            <div class="form-group">
              <Label for="client">Cliente</Label>
              <Input type="text" id="client" name="client" />
            </div>
            <div class="flex">
              <div class="form-group">
                <Label for="client">Data de início</Label>
                <Input type="date" id="client" name="client" />
              </div>
              <div class="form-group">
                <Label for="client">Data final</Label>
                <Input type="date" id="client" name="client" />
              </div>
            </div>
            <div class="form-group">
              <Label for="client">Cliente</Label>
              <InputFile class="input-file"/>
            </div>
            <Button type="submit" class="button">Salvar projeto</Button>
          </form>
        </div>
      </Card>
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
  padding: 52px;
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
.form {
  max-width: 760px;
  margin: 0 auto;
  width: 100%;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 32px;
}
.flex {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.input-file {
  background-color: transparent !important;
}
.button {
  width: 100%;
}
</style>

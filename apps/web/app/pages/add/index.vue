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
              <Label class="label" for="name">Nome do projeto <Span class="span">(Obrigatório)</Span></Label>
              <Input
                id="name"
                type="text"
                name="name"
              />
            </div>
            <div class="form-group">
              <Label class="label" for="client">Cliente <Span class="span">(Obrigatório)</Span></Label>
              <Input
                id="client"
                type="text"
                name="client"
              />
            </div>
            <div class="flex">
              <div class="form-group">
                <Label class="label" for="client">Data de início <Span class="span">(Obrigatório)</Span></Label>
                <Input
                  id="client"
                  type="date"
                  name="client"
                />
              </div>
              <div class="form-group">
                <Label class="label" for="client">Data final <Span class="span">(Obrigatório)</Span></Label>
                <Input
                  id="client"
                  type="date"
                  name="client"
                />
              </div>
            </div>
            <div class="form-group">
              <Label class="label" for="client">Cliente <Span class="span">(Obrigatório)</Span></Label>
              <InputFile class="input-file" />
            </div>
            <Button type="submit" class="button">
              Salvar projeto
            </Button>
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

  @media (max-width: 768px) {
    padding: 24px;
  }
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

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
.input-file {
  background-color: transparent !important;
}
.button {
  width: 100%;
}
.label {
  color: var(--ds-primary-700);
}
.span {
  color: var(--ds-neutral-500);
  font-weight: var(--ds-font-weight-regular);
  margin-left: 8px;
}
</style>

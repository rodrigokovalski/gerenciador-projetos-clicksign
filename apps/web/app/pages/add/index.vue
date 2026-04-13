<script setup lang="ts">
import { Button, Card, InputFile, Label, Span, Title } from "@clicksign/design-system";
import { ArrowLeftIcon } from "@clicksign/icons";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

const validationSchema = toTypedSchema(
  z.object({
    name: z.string().refine(value => wordCount(value) >= 2, {
      message: "Por favor, digite ao menos duas palavras",
    }),
    client: z.string().refine(value => wordCount(value) >= 1, {
      message: "Por favor, digite ao menos uma palavra",
    }),
    dataInicio: z.coerce.date({ error: () => "Selecione uma data válida" }),
    dataFim: z.coerce.date({ error: () => "Selecione uma data válida" }),
    coverImage: z.array(z.instanceof(File)).optional(),
  }),
);

const { handleSubmit, errors, values, setFieldValue } = useForm({
  validationSchema,
  initialValues: {
    name: "",
    client: "",
    dataInicio: "",
    dataFim: "",
    coverImage: [] as File[],
  },
});

const onSubmit = handleSubmit((values) => {
  // eslint-disable-next-line no-console -- feedback do envio no demo
  console.log(values);
});

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
          <form @submit.prevent="onSubmit">
            <div class="form-group">
              <FormField
                name="name"
                label="Nome do projeto"
                :error="errors.name"
              />
            </div>
            <div class="form-group">
              <FormField
                name="client"
                label="Cliente"
                :error="errors.client"
              />
            </div>
            <div class="flex">
              <div class="form-group">
                <FormField
                  name="dataInicio"
                  label="Data de início"
                  type="date"
                  :error="errors.dataInicio"
                />
              </div>
              <div class="form-group">
                <FormField
                  name="dataFim"
                  label="Data final"
                  type="date"
                  :error="errors.dataFim"
                />
              </div>
            </div>
            <div class="form-group">
              <Label class="label" for="project-files">Imagem do projeto</Label>
              <InputFile
                input-id="project-files"
                name="coverImage"
                accept="image/*"
                :multiple="false"
                class="input-file"
                :model-value="values.coverImage"
                @update:model-value="files => setFieldValue('coverImage', files)"
              >
                <template #description>
                  Escolha uma imagem .jpg ou .png no seu dispositivo
                </template>
              </InputFile>
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

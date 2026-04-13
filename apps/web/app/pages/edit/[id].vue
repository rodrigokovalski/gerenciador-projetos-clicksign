<script setup lang="ts">
import { Button, Card, InputFile, Label, Span, Title } from "@clicksign/design-system";
import { ArrowLeftIcon, TrashIcon } from "@clicksign/icons";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";

type Project = {
  id: number;
  name: string;
  client: string;
  start_date: string;
  end_date: string;
  favorite: boolean;
  image_url?: string | null;
};

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function toDateInputValue(value: string) {
  if (!value)
    return "";
  return value.slice(0, 10);
}

const route = useRoute();
const projectId = computed(() => String(route.params.id));

const { data: project, error } = await useFetch<Project>(
  () => `http://localhost:3001/api/projects/${projectId.value}`,
  { key: () => `project-edit-${projectId.value}` },
);

if (error.value || !project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Projeto não encontrado",
  });
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

const p = project.value;

const { handleSubmit, errors, values, setFieldValue } = useForm({
  validationSchema,
  initialValues: {
    name: p.name,
    client: p.client,
    dataInicio: toDateInputValue(p.start_date),
    dataFim: toDateInputValue(p.end_date),
    coverImage: [] as File[],
  },
});

const currentCoverDismissed = ref(false);
const objectPreviewUrl = ref<string | null>(null);

watch(
  () => values.coverImage,
  (files) => {
    if (objectPreviewUrl.value) {
      URL.revokeObjectURL(objectPreviewUrl.value);
      objectPreviewUrl.value = null;
    }
    const file = files?.[0];
    if (file) {
      objectPreviewUrl.value = URL.createObjectURL(file);
    }
  },
  { deep: true },
);

onUnmounted(() => {
  if (objectPreviewUrl.value) {
    URL.revokeObjectURL(objectPreviewUrl.value);
  }
});

const coverDisplaySrc = computed(() => {
  if (objectPreviewUrl.value) {
    return objectPreviewUrl.value;
  }
  if (!currentCoverDismissed.value && project.value?.image_url) {
    return project.value.image_url;
  }
  return "";
});

const hasCoverPreview = computed(() => Boolean(coverDisplaySrc.value));

function clearCoverImage() {
  if (values.coverImage?.length) {
    setFieldValue("coverImage", []);
    return;
  }
  if (project.value?.image_url) {
    currentCoverDismissed.value = true;
  }
}

const onSubmit = handleSubmit(async (formValues) => {
  const formData = new FormData();
  formData.append("project[name]", formValues.name);
  formData.append("project[client]", formValues.client);
  formData.append("project[start_date]", new Date(formValues.dataInicio).toISOString());
  formData.append("project[end_date]", new Date(formValues.dataFim).toISOString());
  if (formValues.coverImage && formValues.coverImage.length > 0) {
    formData.append("project[image]", formValues.coverImage[0] as Blob);
  }
  else if (currentCoverDismissed.value) {
    formData.append("project[remove_image]", "true");
  }
  await $fetch(`http://localhost:3001/api/projects/${projectId.value}`, {
    method: "PATCH",
    body: formData,
  });

  navigateTo("/");
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
        Editar projeto
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
              <div v-if="hasCoverPreview" class="cover-preview">
                <button
                  type="button"
                  class="cover-preview__remove"
                  aria-label="Remover imagem"
                  @click="clearCoverImage"
                >
                  <TrashIcon />
                </button>
                <img
                  v-if="coverDisplaySrc"
                  :src="coverDisplaySrc"
                  alt=""
                  class="cover-preview__img"
                >
              </div>
              <InputFile
                v-else
                input-id="project-files"
                name="coverImage"
                accept="image/*"
                :multiple="false"
                class="input-file"
                :model-value="values.coverImage"
                @update:model-value="files => setFieldValue('coverImage', files)"
              >
                <template #description>
                  Escolha uma imagem .jpg ou .png no seu dispositivo (opcional para manter a atual)
                </template>
              </InputFile>
            </div>
            <Button type="submit" class="button">
              Salvar alterações
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
  flex: 1;
}
.flex {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
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
.cover-preview {
  position: relative;
  width: 100%;
  min-height: 170px;
  border: 1px dashed var(--ds-neutral-200);
  border-radius: var(--ds-radius-4);
  background: var(--ds-neutral-0);
  box-sizing: border-box;
}
.cover-preview__img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  object-fit: cover;
  border-radius: var(--ds-radius-4);
}
.cover-preview__remove {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: var(--ds-radius-4);
  background: var(--ds-neutral-0);
  color: var(--ds-primary-700);
  box-shadow: 0 1px 4px rgb(0 0 0 / 12%);
  cursor: pointer;
}
.cover-preview__remove:hover {
  color: var(--ds-primary-800);
}
</style>

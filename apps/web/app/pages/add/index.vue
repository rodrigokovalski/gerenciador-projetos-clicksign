<script setup lang="ts">
import { Card, Span, Title } from "@clicksign/design-system";
import { ArrowLeftIcon } from "@clicksign/icons";
import { joinURL } from "ufo";
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

const hasCoverPreview = computed(() => Boolean(objectPreviewUrl.value));

const coverDisplaySrc = computed(() => objectPreviewUrl.value ?? "");

function clearCoverImage() {
  setFieldValue("coverImage", []);
}

const { public: pub } = useRuntimeConfig();

const onSubmit = handleSubmit(async (formValues) => {
  const formData = new FormData();
  formData.append("project[name]", formValues.name);
  formData.append("project[client]", formValues.client);
  formData.append("project[start_date]", new Date(formValues.dataInicio).toISOString());
  formData.append("project[end_date]", new Date(formValues.dataFim).toISOString());
  if (formValues.coverImage && formValues.coverImage.length > 0) {
    formData.append("project[image]", formValues.coverImage[0] as Blob);
  }
  const projectsCreateUrl = joinURL(String(pub.apiBaseUrl ?? "").replace(/\/$/, ""), "/api/v1/projects");
  await $fetch(projectsCreateUrl, { method: "POST", body: formData });

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
        Novo projeto
      </Title>
    </div>
    <div class="content">
      <Card class="card">
        <ProjectForm
          :errors="errors"
          :cover-image-value="values.coverImage"
          :has-cover-preview="hasCoverPreview"
          :cover-display-src="coverDisplaySrc"
          submit-label="Salvar projeto"
          image-description="Escolha uma imagem .jpg ou .png no seu dispositivo"
          @submit="onSubmit"
          @clear-cover="clearCoverImage"
          @update:cover-image="files => setFieldValue('coverImage', files)"
        />
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
</style>

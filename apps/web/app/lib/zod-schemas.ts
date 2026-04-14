import { z } from "zod";

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

export const projectFormSchema = z.object({
  name: z.string().refine(value => wordCount(value) >= 2, {
    message: "Por favor, digite ao menos duas palavras",
  }),
  client: z.string().refine(value => wordCount(value) >= 1, {
    message: "Por favor, digite ao menos uma palavra",
  }),
  start_date: z.coerce.date({ error: () => "Selecione uma data válida" }),
  end_date: z.coerce.date({ error: () => "Selecione uma data válida" }),
  coverImage: z.array(z.instanceof(File)).optional(),
})
.refine(
  data => data.end_date >= data.start_date,
  { message: "A data final deve ser igual ou posterior à data de início", path: ["end_date"] },
);

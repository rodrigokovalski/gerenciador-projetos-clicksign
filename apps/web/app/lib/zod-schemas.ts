import { z } from "zod";

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

const dateInputString = z
  .string()
  .min(1, { message: "Selecione uma data válida" })
  .refine(value => !Number.isNaN(Date.parse(value)), { message: "Selecione uma data válida" });

export const projectFormSchema = z.object({
  name: z.string().refine(value => wordCount(value) >= 2, {
    message: "Por favor, digite ao menos duas palavras",
  }),
  client: z.string().refine(value => wordCount(value) >= 1, {
    message: "Por favor, digite ao menos uma palavra",
  }),
  start_date: dateInputString,
  end_date: dateInputString,
  coverImage: z.array(z.instanceof(File)).optional(),
})
  .refine(
    data => new Date(data.end_date) >= new Date(data.start_date),
    { message: "A data final deve ser igual ou posterior à data de início", path: ["end_date"] },
  );

export type ProjectType = {
  id: number;
  name: string;
  client: string;
  start_date: string;
  end_date: string;
  favorite: boolean;
  image_url?: string | null;
};

export type SortKeyType = "alphabetical" | "start_recent" | "deadline_soon";

export type FormErrorsType = {
  name?: string;
  client?: string;
  dataInicio?: string;
  dataFim?: string;
};

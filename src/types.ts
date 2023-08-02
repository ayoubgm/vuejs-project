export type TaskType = {
  id: number;
  categories: string[];
  title: string;
  descr: string;
  isdone: boolean;
  createdAt: string;
}

export type TaskErrors = {
  title?: string[] | undefined;
  descr?: string[] | undefined;
  categories?: string[] | undefined;
}
  
export type TaskForm = {
  title: string;
  descr: string;
  categories: string[];
}
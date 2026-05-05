export interface todoType {
  id: string;
  title: string;
  description: string;
  status_id: string;
  status_name: string;
  created_at: string;
  updated_at: string | Date;
}

export interface todoInput {
  title: string;
  description: string;
  user_id: string;
  status_id: string;
  created_at?: string;
  updated_at?: string | Date;
}

export interface todoQuery {
  search?: string;
  status?: string;
}

import { Todo } from './todo';

// API 응답 타입들
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success: boolean;
}

export type TodosResponse = Todo[];

export interface TodoResponse {
  item: Todo;
}

export interface CreateTodoRequest {
  name: string;
}

export interface UpdateTodoRequest {
  name?: string;
  memo?: string;
  imageUrl?: string;
  isCompleted?: boolean;
}

export interface UploadImageResponse {
  imageUrl: string;
  filename: string;
}

// API 에러 타입
export interface ApiError {
  message: string;
  status: number;
  code?: string;
} 
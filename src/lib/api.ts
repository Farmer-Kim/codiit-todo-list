const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://assignment-todolist-api.vercel.app';
const tenantId = 'daegeon';

export async function fetchTodos(page: number = 1, pageSize: number = 10) {
  const res = await fetch(`${BASE_URL}/api/${tenantId}/items?page=${page}&pageSize=${pageSize}`, { 
    cache: 'no-store',
    headers: {
      'accept': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
}

export async function fetchTodo(id: number) {
  const res = await fetch(`${BASE_URL}/api/${tenantId}/items/${id}`, { 
    cache: 'no-store',
    headers: {
      'accept': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Failed to fetch todo');
  return res.json();
}

export async function addTodo(name: string) {
  const res = await fetch(`${BASE_URL}/api/${tenantId}/items`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Failed to add todo');
  return res.json();
}

export async function updateTodo(
  id: number, 
  data: {
    name?: string;
    memo?: string;
    imageUrl?: string;
    isCompleted?: boolean;
  }
) {
  const res = await fetch(`${BASE_URL}/api/${tenantId}/items/${id}`, {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update todo');
  return res.json();
}

export async function deleteTodo(id: number) {
  const res = await fetch(`${BASE_URL}/api/${tenantId}/items/${id}`, {
    method: 'DELETE',
    headers: {
      'accept': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Failed to delete todo');
  return res.json();
}

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('image', file);
  
  const res = await fetch(`${BASE_URL}/api/${tenantId}/images/upload`, {
    method: 'POST',
    body: formData,
    headers: {
      'accept': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Failed to upload image');
  return res.json();
}
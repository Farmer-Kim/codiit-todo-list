const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://assignment-todolist-api.vercel.app';
const tenantId = 'daegeon';

// 에러 처리를 위한 헬퍼 함수
async function handleApiError(response: Response, defaultMessage: string) {
  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || defaultMessage);
    } catch {
      // JSON 파싱 실패 시 기본 에러 메시지 사용
      throw new Error(defaultMessage);
    }
  }
}

export async function fetchTodos(page: number = 1, pageSize: number = 10) {
  try {
    const res = await fetch(`${BASE_URL}/api/${tenantId}/items?page=${page}&pageSize=${pageSize}`, { 
      cache: 'no-store',
      headers: {
        'accept': 'application/json'
      }
    });
    await handleApiError(res, '할 일 목록을 불러오는데 실패했습니다');
    return res.json();
  } catch (error) {
    console.error('fetchTodos error:', error);
    throw error;
  }
}

export async function fetchTodo(id: number) {
  try {
    const res = await fetch(`${BASE_URL}/api/${tenantId}/items/${id}`, { 
      cache: 'no-store',
      headers: {
        'accept': 'application/json'
      }
    });
    await handleApiError(res, '할 일을 불러오는데 실패했습니다');
    return res.json();
  } catch (error) {
    console.error('fetchTodo error:', error);
    throw error;
  }
}

export async function addTodo(name: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/${tenantId}/items`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({ name }),
    });
    await handleApiError(res, '할 일을 추가하는데 실패했습니다');
    return res.json();
  } catch (error) {
    console.error('addTodo error:', error);
    throw error;
  }
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
  try {
    const res = await fetch(`${BASE_URL}/api/${tenantId}/items/${id}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(data),
    });
    await handleApiError(res, '할 일을 수정하는데 실패했습니다');
    return res.json();
  } catch (error) {
    console.error('updateTodo error:', error);
    throw error;
  }
}

export async function deleteTodo(id: number) {
  try {
    const res = await fetch(`${BASE_URL}/api/${tenantId}/items/${id}`, {
      method: 'DELETE',
      headers: {
        'accept': 'application/json'
      }
    });
    await handleApiError(res, '할 일을 삭제하는데 실패했습니다');
    return res.json();
  } catch (error) {
    console.error('deleteTodo error:', error);
    throw error;
  }
}

export async function uploadImage(file: File) {
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    const res = await fetch(`${BASE_URL}/api/${tenantId}/images/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        'accept': 'application/json'
      }
    });
    await handleApiError(res, '이미지 업로드에 실패했습니다');
    return res.json();
  } catch (error) {
    console.error('uploadImage error:', error);
    throw error;
  }
}
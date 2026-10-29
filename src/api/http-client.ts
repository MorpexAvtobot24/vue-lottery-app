const BASE_URL = import.meta.env.VITE_API_URL;

export async function http<T>(path: string, options: RequestInit = {}): Promise<T> {
  // Дістаємо токен з localStorage, якщо він є (знадобиться для авторизації)
  const token = localStorage.getItem('token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    headers,
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} : ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

export async function apiFetch(path: string, init?: RequestInit) {
  const token = getToken();
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Erro na requisição');
  }

  return response.json();
}

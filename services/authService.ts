const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000';

export interface AuthResponse {
  token: string;
  user: { id: string; email: string; name?: string };
}

export async function signup(email: string, password: string, name?: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name })
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Signup failed');
  return res.json();
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Login failed');
  return res.json();
}

export function saveToken(token: string) {
  localStorage.setItem('usafi_token', token);
}

export function getToken() {
  return localStorage.getItem('usafi_token');
}

export function clearToken() {
  localStorage.removeItem('usafi_token');
}

export default { signup, login, saveToken, getToken, clearToken };

export async function me(): Promise<{ user: { id: string; email: string; name?: string } }> {
  const token = getToken();
  if (!token) throw new Error('No token');
  const res = await fetch(`${API_BASE}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Not authenticated');
  return res.json();
}

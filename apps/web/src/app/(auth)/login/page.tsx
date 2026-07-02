'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_URL } from '../../../lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@gestaoobras.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setError('Credenciais inválidas');
      return;
    }

    const data = await response.json();
    localStorage.setItem('accessToken', data.accessToken);
    router.push('/dashboard');
  }

  return (
    <div className="container" style={{ maxWidth: 420, paddingTop: 80 }}>
      <div className="card">
        <h1>Entrar</h1>
        <p className="small">Use o usuário inicial do seed</p>
        <form onSubmit={handleSubmit} className="grid">
          <label>
            <div className="small">E-mail</div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            <div className="small">Senha</div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit">Entrar</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

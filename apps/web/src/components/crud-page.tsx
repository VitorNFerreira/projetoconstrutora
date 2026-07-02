'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';

type Field = { name: string; label: string; type?: 'text' | 'number' | 'date'; required?: boolean };

export function CrudPage({ title, endpoint, fields }: { title: string; endpoint: string; fields: Field[] }) {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState<Record<string, any>>({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await apiFetch(endpoint);
      setItems(data);
      setError('');
    } catch (e: any) {
      setError(e.message || 'Erro ao carregar');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [endpoint]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await apiFetch(endpoint, { method: 'POST', body: JSON.stringify(form) });
      setForm({});
      await load();
    } catch (e: any) {
      setError(e.message || 'Erro ao salvar');
    }
  }

  return (
    <div className="grid" style={{ gap: 20 }}>
      <div className="header">
        <div>
          <h1>{title}</h1>
          <p className="small">Cadastro e listagem do módulo</p>
        </div>
        <span className="badge">{items.length} registros</span>
      </div>

      <div className="card">
        <form onSubmit={onSubmit}>
          <div className="grid grid-2">
            {fields.map((field) => (
              <label key={field.name}>
                <div className="small">{field.label}</div>
                <input
                  type={field.type || 'text'}
                  required={field.required}
                  value={form[field.name] ?? ''}
                  onChange={(e) => setForm((prev) => ({ ...prev, [field.name]: field.type === 'number' ? Number(e.target.value) : e.target.value }))}
                />
              </label>
            ))}
          </div>
          <button type="submit">Salvar</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>

      <div className="card">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <table>
            <thead>
              <tr>
                {fields.map((field) => <th key={field.name}>{field.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  {fields.map((field) => <td key={field.name}>{String(item[field.name] ?? '')}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

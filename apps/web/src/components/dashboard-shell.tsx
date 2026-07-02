'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const links = [
  ['Dashboard', '/dashboard'],
  ['Clientes', '/clientes'],
  ['Fornecedores', '/fornecedores'],
  ['Orçamentos', '/orcamentos'],
  ['Obras', '/obras'],
  ['Solicitações', '/solicitacoes'],
  ['Cotações', '/cotacoes'],
  ['Pedidos', '/pedidos'],
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.replace('/login');
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) return null;

  return (
    <div className="layout">
      <aside className="nav">
        <h2>Gestão de Obras</h2>
        <p className="small">MVP operacional</p>
        <div style={{ marginTop: 20 }}>
          {links.map(([label, href]) => (
            <Link key={href} href={href} style={{ background: pathname === href ? 'rgba(255,255,255,.15)' : undefined }}>
              {label}
            </Link>
          ))}
          <button
            className="secondary"
            style={{ marginTop: 16 }}
            onClick={() => {
              localStorage.removeItem('accessToken');
              router.replace('/login');
            }}
          >
            Sair
          </button>
        </div>
      </aside>
      <main className="container">{children}</main>
    </div>
  );
}

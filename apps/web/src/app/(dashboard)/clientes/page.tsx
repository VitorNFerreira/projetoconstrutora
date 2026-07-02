import { CrudPage } from '../../../components/crud-page';
export default function Page() { return <CrudPage title="Clientes" endpoint="/clients" fields={[{ name: 'name', label: 'Nome', required: true }, { name: 'document', label: 'Documento' }, { name: 'email', label: 'E-mail' }, { name: 'phone', label: 'Telefone' }]} />; }

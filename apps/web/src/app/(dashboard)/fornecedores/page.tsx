import { CrudPage } from '../../../components/crud-page';
export default function Page() { return <CrudPage title="Fornecedores" endpoint="/suppliers" fields={[{ name: 'name', label: 'Nome', required: true }, { name: 'document', label: 'Documento' }, { name: 'email', label: 'E-mail' }, { name: 'paymentTerm', label: 'Condição de pagamento' }]} />; }

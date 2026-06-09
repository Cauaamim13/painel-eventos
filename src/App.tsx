import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const EyeIcon = () => <span>👁️</span>;
const EditIcon = () => <span>📝</span>;
const TrashIcon = () => <span>🗑️</span>;

function App() {
  const [contratos, setContratos] = useState<any[]>([]);

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const [modalAberto, setModalAberto] = useState(false);
  const [relatorioAtual, setRelatorioAtual] = useState<any[]>([]);
  const [nomeClienteModal, setNomeClienteModal] = useState('');

  async function buscarDados() {
    try {
      const resposta = await axios.get('http://localhost:3333/banco');
      setContratos(resposta.data.dados || []);
    } catch (erro) {
      console.error("Erro ao buscar dados:", erro);
    }
  }

  useEffect(() => {
    buscarDados();
  }, []);

  async function adicionarCliente(e: React.FormEvent) {
    e.preventDefault(); 
    
    try {
      await axios.post('http://localhost:3333/clientes', {
        nome_completo: nome,
        cpf: cpf,
        email: email,
        telefone: telefone
      });

      setNome('');
      setCpf('');
      setEmail('');
      setTelefone('');

      buscarDados();
    } catch (erro) {
      console.error("Erro ao adicionar cliente:", erro);
      alert("Erro ao salvar!");
    }
  }

  async function deletarCliente(id: number) {
    if (!window.confirm("Tem certeza que deseja excluir este cliente?")) return;

    try {
      await axios.delete(`http://localhost:3333/banco/${id}`);
      buscarDados();
    } catch (erro) {
      console.error("Erro ao deletar:", erro);
      alert("Erro ao excluir!");
    }
  }

  async function verContratos(id: number, nomeCliente: string) {
    try {
      const resposta = await axios.get(`http://localhost:3333/clientes/${id}/relatorio`);
      
      setRelatorioAtual(resposta.data.relatorio);
      setNomeClienteModal(nomeCliente);
      setModalAberto(true);

    } catch (erro) {
      if (axios.isAxiosError(erro) && erro.response?.status === 404) {
        alert("Este cliente ainda não possui nenhum contrato cadastrado.");
      } else {
        console.error("Erro ao buscar relatório:", erro);
        alert("Erro ao carregar os contratos.");
      }
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 p-8 flex justify-center items-start font-sans relative'>
      <div className='w-full max-w-5xl bg-white rounded-xl shadow-lg p-8 mt-10'>

        <header className='border-b-2 border-gray-100 pb-4 mb-6 flex justify-between items-center'>
          <h1 className='text-3xl font-bold text-gray-800'>Painel de Clientes</h1>
          <span className='bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full'>Status: Online</span>
        </header>

        <form onSubmit={adicionarCliente} className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8 shadow-inner">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Adicionar Novo Cliente</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <input 
              type="text" placeholder="Nome Completo" required
              value={nome} onChange={(e) => setNome(e.target.value)}
              className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500 shadow-sm"
            />
            <input 
              type="text" placeholder="CPF" required
              value={cpf} onChange={(e) => setCpf(e.target.value)}
              className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500 shadow-sm"
            />
            <input 
              type="email" placeholder="E-mail" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500 shadow-sm"
            />
            <input 
              type="text" placeholder="Telefone" required
              value={telefone} onChange={(e) => setTelefone(e.target.value)}
              className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500 shadow-sm"
            />
          </div>
          
          <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-6 rounded hover:bg-blue-700 transition-colors shadow">
            + Adicionar
          </button>
        </form>

        <div className="flex flex-col gap-3"> 
          
          {!Array.isArray(contratos) || contratos.length === 0 ? (
            <div className="text-center p-10 text-gray-500 border border-dashed border-gray-300 rounded-lg bg-gray-50">
              Nenhum registro encontrado ou aguardando conexão com o banco...
            </div>
          ) : (
            contratos.map((item) => (
              <div 
                key={item.id} 
                className="bg-white border border-gray-200 rounded-lg p-4 flex items-center hover:shadow-md transition-shadow"
              >
            
                <div className="w-16 text-center border-r border-gray-100 pr-4">
                    <span className="text-xs text-gray-400 block uppercase tracking-wider font-semibold">ID</span>
                    <strong className="text-gray-800">{String(item.id).padStart(2, '0')}</strong>
                </div>

                <div className="flex-1 flex gap-6 px-6">
                    <div>
                        <span className="text-xs text-gray-400 block uppercase tracking-wider font-semibold">Cliente:</span>
                        <strong className="text-gray-800 text-lg">{item.nome_completo || "Não informado"}</strong>
                    </div>
                    <div>
                        <span className="text-xs text-gray-400 block uppercase tracking-wider font-semibold">CPF:</span>
                        <span className="text-gray-600 font-medium">{item.cpf || "Não especificado"}</span>
                    </div>
                </div>

                <div className="flex-1 flex gap-6 px-6">
                    <div className="text-right">
                        <span className="text-xs text-gray-400 block uppercase tracking-wider font-semibold">E-mail:</span>
                        <span className="text-gray-600 font-medium">{item.email || "Não especificado"}</span>
                    </div>
                    <div className="text-right">
                        <span className="text-xs text-gray-400 block uppercase tracking-wider font-semibold">Telefone:</span>
                        <strong className="text-blue-600 text-lg">{item.telefone || "N/A"}</strong>
                    </div>
                </div>

                <div className="w-40 flex justify-center items-center gap-3 pl-6 border-l border-gray-100">
                    <button 
                      onClick={() => verContratos(item.id, item.nome_completo)}
                      className="text-gray-500 hover:text-blue-600 transition-colors p-1" 
                      title="Visualizar"
                    >
                      <EyeIcon />
                    </button>
                    <button className="text-gray-500 hover:text-green-600 transition-colors p-1" title="Editar"><EditIcon /></button>
                    
                    <button 
                        onClick={() => deletarCliente(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                        title="Excluir"
                    >
                        <TrashIcon />
                    </button>
                </div>

              </div>
            ))
          )}

          <div className="text-center p-4 text-gray-300 border-t border-gray-100 mt-2">
            ...
          </div>

        </div>

      </div>

      {modalAberto && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl p-6 relative max-h-[80vh] overflow-y-auto">
            
            <button 
              onClick={() => setModalAberto(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">Contratos e Parcelas</h2>
            <p className="text-gray-600 mb-6">Cliente: <strong className="text-blue-600">{nomeClienteModal}</strong></p>

            <div className="flex flex-col gap-4">
              {relatorioAtual.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex justify-between items-center">
                  
                  <div>
                    <span className="text-xs text-gray-400 block uppercase font-semibold">Evento</span>
                    <strong className="text-gray-800 text-lg">{item.tipo_evento}</strong>
                    <div className="text-sm text-gray-500 mt-1">
                      Data: {new Date(item.data_evento).toLocaleDateString('pt-BR')}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-gray-400 block uppercase font-semibold">Valor Parcela</span>
                    <strong className="text-gray-800 text-xl block">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor_parcela)}
                    </strong>
                    <div className="text-sm text-gray-500 mt-1">
                      Vence em: {new Date(item.data_vencimento).toLocaleDateString('pt-BR')}
                    </div>
                  </div>

                  <div>
                    {item.foi_pago ? (
                      <span className="bg-green-100 text-green-800 text-sm font-semibold px-4 py-2 rounded-full border border-green-200">
                        Paga
                      </span>
                    ) : (
                      <span className="bg-orange-100 text-orange-800 text-sm font-semibold px-4 py-2 rounded-full border border-orange-200">
                        Pendente
                      </span>
                    )}
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;
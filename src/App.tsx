import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [contratos, setContratos] = useState<any[]>([]);

  useEffect(() => {
    async function buscarDados() {
      try {
        const resposta = await axios.get('http://localhost:3333/banco');
        // Usando o .dados para abrir o pacote corretamente
        setContratos(resposta.data.dados);
      } catch (erro) {
        console.error("Erro ao buscar dados da API:", erro);
      }
    }

    buscarDados();
  }, []);

  return (
    <div className='min-h-screen bg-gray-100 p-8 flex justify-center items-start font-sans'>
      <div className='w-full max-w-5xl bg-white rounded-xl shadow-lg p-8 mt-10'>

        <header className='border-b-2 border-gray-100 pb-4 mb-6 flex justify-between items-center'>
          <h1 className='text-3xl font-bold text-gray-800'>Painel de Clientes</h1>
          <span className='bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full'>Status: Online</span>
        </header>

        <div className="flex flex-col gap-4">
          
          {!Array.isArray(contratos) || contratos.length === 0 ? (
            <div className="text-center p-10 text-gray-500 border border-dashed border-gray-300 rounded-lg bg-gray-50">
              Nenhum registro encontrado ou aguardando conexão com o banco...
            </div>
          ) : (
            contratos.map((item) => (
              <div 
                key={item.id} 
                className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:shadow-md transition-shadow bg-white"
              >
                
                {/* Lado Esquerdo: Nome e CPF */}
                <div className="flex gap-8">
                  <div>
                    <span className="text-xs text-gray-400 block uppercase tracking-wider font-semibold">Nome Completo</span>
                    <strong className="text-gray-800 text-lg">{item.nome_completo || "Não informado"}</strong>
                  </div>
                  
                  <div>
                    <span className="text-xs text-gray-400 block uppercase tracking-wider font-semibold">CPF</span>
                    <span className="text-gray-600 font-medium">{item.cpf || "Não especificado"}</span>
                  </div>
                </div>

                {/* Lado Direito: Contatos */}
                <div className="text-right flex gap-6">
                  <div className="text-right">
                    <span className="text-xs text-gray-400 block uppercase tracking-wider font-semibold">E-mail</span>
                    <span className="text-gray-600 font-medium">{item.email || "Não especificado"}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 block uppercase tracking-wider font-semibold">Telefone</span>
                    <strong className="text-blue-600 text-lg">{item.telefone || "N/A"}</strong>
                  </div>
                </div>

              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}

export default App;
import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function App() {
    //estado para guardar dados que virão da API
    const [contratos, setContratos] = useState([]);

    useEffect(() => {
        async function buscarDados() {
             try {
                const resposta = await axios.get ('http://localhost:3333/relatorio');
                setContratos(resposta.data);
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

                    <h1 className='text-3xl font-bold text-gray-800'>Painel Financeiro</h1>
                    <span className='bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full'>Status: Online</span>

                </header>

                <div className='bg-gray-50 rounded-lg border border-dashed border-gray-300 p-10'>
                    <h2 className='text-xl font-bold mb-4'>Dados</h2>
                    <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
                        {JSON.stringify(contratos, null, 2)}
                    </pre>

                </div>

            </div>
        </div>
    );
} 

export default App;


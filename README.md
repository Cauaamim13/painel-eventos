# 📊 Sistema de Gestão de Clientes e Contratos | Full-Stack

Um sistema completo de CRM (Customer Relationship Management) e gestão financeira focado em profissionais de eventos. Esta aplicação permite o gerenciamento de clientes e o cruzamento de dados com seus respectivos contratos e parcelas, entregando uma interface visual limpa, responsiva e de alta performance.

> Este projeto é uma **Single Page Application (SPA)** conectada a uma **API RESTful**, construída com uma arquitetura separada (Front-end e Back-end) garantindo escalabilidade e facilidade de manutenção.

## 🚀 Tecnologias e Ferramentas

O ecossistema do projeto foi dividido em duas camadas principais:

### 💻 Front-end (Interface)
* **React:** Construção de interfaces baseadas em componentes dinâmicos.
* **TypeScript:** Tipagem estática para evitar erros em tempo de execução.
* **Vite:** Motor de build ultrarrápido para ambiente de desenvolvimento.
* **Tailwind CSS v4:** Framework de CSS utilitário para um design moderno e responsivo.
* **Axios:** Cliente HTTP para comunicação assíncrona com o servidor.

### ⚙️ Back-end (API e Dados)
* **Node.js & Express:** Criação do servidor e roteamento da API REST.
* **MySQL:** Banco de dados relacional para garantir a integridade dos dados (Foreign Keys, Constraints).
* **CORS:** Middleware de segurança para controle de acessos entre domínios/portas.

---

## 🎯 Funcionalidades Principais

- **[x] Gestão de Clientes:** Cadastro e exclusão de clientes em tempo real (CRUD).
- **[x] Prevenção de Erros:** Bloqueio inteligente na exclusão de clientes que possuam contratos ativos no banco de dados.
- **[x] Relatórios Financeiros (Modal):** Cruzamento de dados via `INNER JOIN` para exibir contratos e o status (Pago/Pendente) de cada parcela do cliente selecionado.
- **[x] Atualização Dinâmica:** A interface reage e atualiza as informações instantaneamente sem necessidade de recarregar a página.

---

## 🛠️ Como executar este projeto localmente

Se você deseja rodar este projeto na sua máquina, siga o passo a passo abaixo. Você precisará de três terminais/serviços rodando em conjunto.

### Pré-requisitos
* [Node.js](https://nodejs.org/en/) instalado.
* Servidor MySQL (XAMPP, DBeaver, MySQL Workbench, etc).

### 1. Preparando o Banco de Dados
Abra o seu gerenciador de banco de dados e execute o script SQL abaixo para criar a estrutura e relacionamentos exatos:

```sql
CREATE DATABASE painel_clientes;
USE painel_clientes;

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL
);

CREATE TABLE contratos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    tipo_evento VARCHAR(255) NOT NULL,
    data_evento DATE NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE parcelas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contrato_id INT NOT NULL,
    valor_parcela DECIMAL(10,2) NOT NULL,
    data_vencimento DATE NOT NULL,
    foi_pago BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (contrato_id) REFERENCES contratos(id)
);

2. Rodando a API (Back-end)
Abra um terminal na pasta do Back-end:

Bash
# Instale as dependências
npm install

# Inicie o servidor (Rodará na porta 3333)
npm run dev
3. Rodando a Interface (Front-end)
Abra um segundo terminal na pasta do Front-end:

Bash
# Instale as dependências
npm install

# Inicie a aplicação
npm run dev
O terminal exibirá o link de acesso (geralmente http://localhost:5173). Clique para abrir o sistema no seu navegador.

👨‍💻 Autor
Desenvolvido por Cauã Pereira Amim Focado em desenvolvimento Full-Stack, Automação e na construção de soluções tecnológicas sólidas e escaláveis.

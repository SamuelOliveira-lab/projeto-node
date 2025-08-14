# 📦 Projeto Node.js - CRUD Simples

Este projeto é uma implementação de um API com **Node.js** que implementa um **CRUD básico** com armazenamento de dados.  
Ele foi desenvolvido inicialmente para funcionar com uma base de dados em memória e pode ser adaptado para uso com um banco real como **PostgreSQL**.

🌐 **Deploy online:** [Acesse aqui](https://projeto-node-6hqh.onrender.com/pessoas)

---

## 🚀 Funcionalidades
- **Criar** novos registros (ex.: pessoas).
- **Listar** todos os registros com suporte a busca por título.
- **Atualizar** dados existentes.
- **Excluir** registros pelo ID.
- API simples baseada em **JSON**.

---

## 🛠 Tecnologias Utilizadas
- [Node.js](https://nodejs.org/)
- [Fastify](https://fastify.dev/)
- [JavaScript ES Modules](https://nodejs.org/api/esm.html)
- [UUID](https://nodejs.org/api/crypto.html#cryptorandomuuid)

---

## 📂 Estrutura do Projeto
├── server.js # Ponto de entrada da aplicação  
├── routes/ # Definição das rotas da API  
├── database/ # Arquivo de banco de dados  
└── package.json # Dependências e scripts  
└── create-table.js # Criação da tabela  
└── db.js # Configuração de conexão com o banco de dados Neon.  

---

## 🔧 Como Executar Localmente

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
```

### 2️⃣ Instalar dependências
```bash
npm install
```

### 3️⃣ Executar o servidor
```bash
npm start
```
O servidor estará rodando em:  
http://localhost:3333  

## 📡 Endpoints da API  
A documentação dos Endpoints da API se encontra em:  
http://localhost:3333/docs  

## ✨ Autor

Desenvolvido por [Samuel Oliveira Ferraz Porto] 🚀

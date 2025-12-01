# SIG-PROFREE: SISTEMA DE GERENCIAMENTO DE PROJETOS PARA FREELANCERS

Trabalho 1 - Sistemas de Bancos de Dados (SBD)

## 1. OBJETIVO DO PROJETO

[cite_start]O objetivo é demonstrar a aplicação prática dos conceitos de **modelagem, projeto e implementação** [cite: 8] [cite_start]de sistemas de banco de dados [cite: 65][cite_start], integrando um **Front-end** (React) com um **Back-end** (Node.js/Express) e um **SGBD** (MySQL)[cite: 77, 82]. [cite_start]A aplicação possui funcionalidade **CRUD completa** (Create, Read, Update, Delete)[cite: 79, 78, 73].

## 2. REQUISITOS DE AMBIENTE

* Node.js (Versão LTS) e npm/npx
* [cite_start]MySQL Server (SGBD) [cite: 77]
* MySQL Workbench ou Command Line Client

## 3. CONFIGURAÇÃO DO BANCO DE DADOS

O banco de dados deve ser configurado no MySQL antes da execução da API.

1.  **Inicie o serviço do MySQL Server.**
2.  Crie o banco de dados (Schema) chamado `sigprofree_db`.
    ```sql
    CREATE DATABASE sigprofree_db;
    ```
3.  Execute os scripts SQL (localizados na raiz do projeto ou nesta pasta):
[cite_start]    * **`create_tables.sql`**: Para criar a estrutura do banco de dados[cite: 88].
    * [cite_start]**`insert_data.sql`**: Para inserir os dados fictícios[cite: 88, 80].
4.  **Verificação:** A senha de conexão do banco de dados deve estar configurada no arquivo `sigprofree-backend/db.js`.

## 4. INSTRUÇÕES DE EXECUÇÃO DA APLICAÇÃO

É necessário iniciar dois terminais (o Back-end e o Front-end).

### 4.1. INICIAR BACK-END (API Node.js - Porta 3001)

1.  Abra um terminal na pasta: `sigprofree-backend`.
2.  Instale as dependências: `npm install`
3.  Inicie o servidor (Deixe este terminal rodando): `npm start`
    * **Status:** Servidor rodando em `http://localhost:3001`.

### 4.2. INICIAR FRONT-END (React - Porta 3000)

1.  Abra um **novo terminal** na pasta: `sigprofree-frontend`.
2.  Instale as dependências: `npm install`
3.  Inicie a aplicação React: `npm start`
    * A interface gráfica (GUI) será aberta automaticamente no navegador em: `http://localhost:3000`.

[cite_start]A aplicação está funcional localmente[cite: 91].

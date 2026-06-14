# 🌿 Registro de Trilhas

**Projeto de Avaliação - Segundo Bimestre**  
**Disciplina:** Linguagem de Programação para Web I  
**Professor:** Marcio Araya  

---

👥 Integrantes do Grupo
->GIULIA LORRANY CANABARRO DOS SANTOS
->Pedro Henrique Carolino
->Letícia Lacerda Domingues
->Victor Hugo de Melo


## 📋 Sobre o Projeto

Aplicação completa para registro de trilhas e aventuras na natureza. Permite cadastrar, visualizar, editar e excluir trilhas, com estatísticas e link do Google Maps.


### ESPECIFICAÇÕES DO PROJETO
->Requisitos Obrigatórios:
Desenvolver uma aplicação utilizando JavaScript no backend com Node.js
Utilizar os módulos: dotenv, express, knex e mysql2
Frontend feito com HTML, JavaScript puro e opcionalmente CSS
O backend deve disponibilizar uma API REST para realizar CRUD (Create, Read, Update, Delete)
O frontend deve consumir essa API
Utilizar pelo menos uma tabela no banco de dados MySQL
Tema livre (nós escolhemos "Registro de Trilhas")
Entregar em repositório no GitHub
Apresentar a aplicação funcionando em aula

**Funcionalidades:**
- CRUD completo de trilhas
- Design moderno com tema Dark/Light
- Estatísticas (total de trilhas e nota média)
- Link direto para Google Maps
- Interface responsiva e intuitiva

---
### COMO RODAR O PROJETO
Criar o banco trilhas_db
Configurar o arquivo .env
Instalar as dependências (npm install)
Rodar npm run dev
Abrir o index.html

## AMBIENTAÇÃO DO PROJETO - PASSO A PASSO
1. Criação da estrutura de pastas:
Bashmkdir trilhas-app
cd trilhas-app
mkdir backend
2. Dentro da pasta backend:
Bashcd backend
npm init -y
3. Instalação dos pacotes:
Bashnpm install express knex mysql2 dotenv cors
npm install -D nodemon
4. Configuração do package.json (scripts):
JSON"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
5. Criação do Banco de Dados (no MySQL):
SQLCREATE DATABASE trilhas_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
6. Rodar o projeto:
Bashnpm run dev
Depois basta abrir o arquivo index.html no navegador.

PACOTES INSTALADOS E SUAS FUNÇÕES
express: Criar o servidor web e rotas da API
knex: Facilitar a criação de tabelas e consultas SQL
mysql2: Conectar a aplicação ao banco MySQL
dotenv: Gerenciar variáveis de ambiente (arquivo .env)
cors: Permitir comunicação entre frontend e backend
nodemon: Reiniciar o servidor automaticamente quando salvar o código

---

## 🚀 Como Executar o Projeto

### 1. Configurar o Banco de Dados
sql
CREATE DATABASE trilhas_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

### 2. Configurar o Backend
Bashcd backend
npm install

->Crie o arquivo .env na pasta backend:
envDB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=trilhas_db
PORT=3000

### 3. Rodar o Servidor
No terminal:
 npm run dev

### 4. Abrir o Frontend
Abra o arquivo index.html diretamente no navegador.




🎯 Funcionalidades Implementadas
Backend (API REST)

GET /api/trilhas → Listar trilhas
POST /api/trilhas → Cadastrar trilha
PUT /api/trilhas/:id → Atualizar trilha
DELETE /api/trilhas/:id → Excluir trilha
GET /api/estatisticas → Estatísticas


->Frontend:
Cadastro com modal
Listagem em cards 
Edição inline
Exclusão com confirmação
Tema Dark/Light
Link para Google Maps
Notas com estrelas
Estatísticas em tempo real


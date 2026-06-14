// ====================== SERVER.JS ======================
// Backend da aplicação Registro de Trilhas
// Professor: Marcio Araya
// Linguagem de Programação para Web I

require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const express = require('express');
const cors = require('cors');

// Configuração do Knex (ORM para conectar com o MySQL)
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  pool: { min: 0, max: 10 } // Gerencia as conexões com o banco
});

const app = express();
const PORT = process.env.PORT || 3000;

// ====================== MIDDLEWARES ======================
app.use(cors({ origin: '*' }));        // Permite o frontend acessar a API
app.use(express.json());               // Interpreta JSON enviado no body das requisições

// ====================== INICIALIZAÇÃO DO BANCO ======================
async function initDB() {
  try {
    const existe = await knex.schema.hasTable('trilhas');
    
    if (!existe) {
      await knex.schema.createTable('trilhas', (table) => {
        table.increments('id').primary();           // Chave primária auto-incremento
        table.string('nome', 255).notNullable();
        table.string('local', 255).notNullable();
        table.float('distancia_km');
        table.string('dificuldade', 20);
        table.date('data_trilha');
        table.integer('nota');                      // Nota de 1 a 5
        table.text('observacoes');
        table.string('link_maps', 1000);            // Link do Google Maps (aumentado)
        table.timestamps(true, true);               // created_at e updated_at
      });
      console.log('✅ Tabela "trilhas" criada com sucesso!');
    }
  } catch (erro) {
    console.error('❌ Erro ao criar tabela:', erro.message);
  }
}

// ====================== ROTAS DA API (CRUD) ======================

// Rota raiz - apenas para teste
app.get('/', (req, res) => {
  res.send('🌿 API de Registro de Trilhas - Funcionando!');
});

// LISTAR todas as trilhas (GET)
app.get('/api/trilhas', async (req, res) => {
  try {
    const trilhas = await knex('trilhas').orderBy('data_trilha', 'desc');
    res.json(trilhas);
  } catch (erro) {
    console.error('ERRO AO LISTAR:', erro);
    res.status(500).json({ erro: erro.message });
  }
});

// CADASTRAR nova trilha (POST)
app.post('/api/trilhas', async (req, res) => {
  try {
    const [id] = await knex('trilhas').insert(req.body);
    res.status(201).json({ 
      mensagem: 'Trilha cadastrada com sucesso!', 
      id 
    });
  } catch (erro) {
    console.error('ERRO AO SALVAR:', erro);
    res.status(500).json({ erro: erro.message });
  }
});

// ATUALIZAR trilha (PUT)
app.put('/api/trilhas/:id', async (req, res) => {
  try {
    const atualizado = await knex('trilhas')
      .where({ id: req.params.id })
      .update(req.body);

    if (atualizado) {
      res.json({ mensagem: 'Trilha atualizada com sucesso!' });
    } else {
      res.status(404).json({ erro: 'Trilha não encontrada' });
    }
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// EXCLUIR trilha (DELETE)
app.delete('/api/trilhas/:id', async (req, res) => {
  try {
    await knex('trilhas').where({ id: req.params.id }).del();
    res.json({ mensagem: 'Trilha removida com sucesso!' });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// ESTATÍSTICAS (bônus)
app.get('/api/estatisticas', async (req, res) => {
  try {
    const total = await knex('trilhas').count('* as total').first();
    const media = await knex('trilhas').avg('nota as media').first();

    res.json({
      total: total.total || 0,
      mediaNota: Number(media.media || 0).toFixed(1)
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// ====================== INICIAR SERVIDOR ======================
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
});
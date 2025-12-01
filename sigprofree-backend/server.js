const express = require('express');
const db = require('./db'); 
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API SIG-ProFree Rodando!');
});

app.get('/api/clientes', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM cliente');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).json({ message: 'Erro interno no servidor ao buscar clientes.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor Node.js rodando em http://localhost:${PORT}`);
});

app.post('/api/freelancers', async (req, res) => {
    const { nome, email, especialidade } = req.body;
    try {
        const sql = `INSERT INTO freelancer (nome, email, especialidade) VALUES (?, ?, ?)`;
        const [result] = await db.query(sql, [nome, email, especialidade]);
        res.status(201).json({ id_freelancer: result.insertId, message: 'Freelancer cadastrado com sucesso.' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Este e-mail já está cadastrado.' });
        }
        console.error('Erro ao cadastrar freelancer:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
});

app.get('/api/freelancers', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM freelancer');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao buscar freelancers:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
});

app.put('/api/freelancers/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, especialidade } = req.body;
    try {
        const sql = `UPDATE freelancer SET nome = ?, especialidade = ? WHERE id_freelancer = ?`;
        const [result] = await db.query(sql, [nome, especialidade, id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Freelancer não encontrado.' });
        }
        res.status(200).json({ message: 'Freelancer atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar freelancer:', error);
        res.status(500).json({ message: 'Erro interno ao atualizar freelancer.' });
    }
});

app.delete('/api/freelancers/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM freelancer WHERE id_freelancer = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Freelancer não encontrado para exclusão.' });
        }
        res.status(200).json({ message: 'Freelancer excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir freelancer:', error);
        res.status(500).json({ message: 'Erro interno ao excluir freelancer.' });
    }
});


app.delete('/api/clientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Nota: Se o cliente tiver projetos associados, este DELETE pode falhar por causa das chaves estrangeiras.
        const [result] = await db.query('DELETE FROM cliente WHERE id_cliente = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente não encontrado.' });
        }
        res.status(200).json({ message: 'Cliente excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        res.status(500).json({ message: 'Erro interno ao excluir cliente.' });
    }
});


app.get('/api/freelancers/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM freelancer WHERE id_freelancer = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Freelancer não encontrado.' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Erro ao buscar freelancer por ID:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
});
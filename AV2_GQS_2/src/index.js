import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Dados simulados para pedidos e rotas
let pedidos = [];
let rotas = [];

// Rotas
app.get('/pedidos', (req, res) => {
    res.json(pedidos);
});

app.post('/pedidos', (req, res) => {
    const { endereco, latitude, longitude, produto, quantidade } = req.body;

    if (!endereco || !latitude || !longitude || !produto || !quantidade) {
        return res.status(400).json({ error: 'Campos obrigatórios estão ausentes' });
    }

    const novoPedido = { endereco, latitude, longitude, produto, quantidade };
    pedidos.push(novoPedido);
    res.status(201).json(novoPedido);
});

app.get('/rotas', (req, res) => {
    res.json(rotas);
});

app.post('/rotas', (req, res) => {
    const { latitude, longitude } = req.body;

    if (latitude === undefined || longitude === undefined) {
        return res.status(400).json({ error: 'Campos latitude e longitude são obrigatórios' });
    }

    const novaRota = { latitude, longitude };
    rotas.push(novaRota);
    res.status(201).json(novaRota);
});

app.post('/melhor-rota', (req, res) => {
    const { pedidos, rotas } = req.body;

    if (!pedidos || !rotas) {
        return res.status(400).json({ error: 'Pedidos e rotas são obrigatórios' });
    }

    const melhorRota = rotas[0];
    res.json({ melhorRota });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

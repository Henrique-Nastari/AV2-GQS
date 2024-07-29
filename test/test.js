import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { expect } from 'chai';

const app = express();
app.use(bodyParser.json());

let pedidos = [];
let rotas = [];

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

const agent = request.agent(app);

describe('API Tests', () => {
    it('GET /pedidos should return an empty list initially', (done) => {
        agent.get('/pedidos')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('array').that.is.empty;
                done();
            });
    });

    it('POST /pedidos should create a new pedido', (done) => {
        const pedido = {
            endereco: { rua: 'Rua Exemplo', numero: '123' },
            latitude: 12.34,
            longitude: 56.78,
            produto: 'Bicicleta',
            quantidade: 1
        };

        agent.post('/pedidos')
            .send(pedido)
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.deep.include(pedido);
                done();
            });
    });

    it('GET /rotas should return an empty list initially', (done) => {
        agent.get('/rotas')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('array').that.is.empty;
                done();
            });
    });

    it('POST /rotas should create a new rota', (done) => {
        const rota = {
            latitude: 12.34,
            longitude: 56.78
        };

        agent.post('/rotas')
            .send(rota)
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.deep.include(rota);
                done();
            });
    });

    it('POST /melhor-rota should return the best route', (done) => {
        const pedidos = [
            {
                endereco: { rua: 'Rua Exemplo', numero: '123' },
                latitude: 12.34,
                longitude: 56.78,
                produto: 'Bicicleta',
                quantidade: 1
            }
        ];

        const rotas = [
            {
                latitude: 12.34,
                longitude: 56.78
            }
        ];

        agent.post('/melhor-rota')
            .send({ pedidos, rotas })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('melhorRota');
                done();
            });
    });
});

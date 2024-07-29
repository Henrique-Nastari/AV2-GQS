const assert = require('chai').assert;
const { verificarMelhorRota, calcularDistancia } = require('../src/index');

describe('Função calcularDistancia', function() {
    it('deve calcular a distância corretamente entre dois pontos', function() {
        const endereco1 = { lat: 0, lng: 0 };
        const endereco2 = { lat: 3, lng: 4 };
        const distancia = calcularDistancia(endereco1, endereco2);
        assert.equal(distancia, 5);
    });

    it('deve calcular a distância corretamente para pontos negativos', function() {
        const endereco1 = { lat: -1, lng: -1 };
        const endereco2 = { lat: -4, lng: -5 };
        const distancia = calcularDistancia(endereco1, endereco2);
        assert.equal(distancia, 5);
    });
});

describe('Função verificarMelhorRota', function() {
    it('deve retornar a melhor rota para um conjunto de pedidos e rotas', function() {
        const pedidos = [
            { endereco: { lat: 0, lng: 0 } },
            { endereco: { lat: 3, lng: 4 } }
        ];
        const rotas = [
            { lat: 0, lng: 0 },
            { lat: 3, lng: 4 },
            { lat: 1, lng: 1 }
        ];
        const melhorRota = verificarMelhorRota(pedidos, rotas);
        assert.deepEqual(melhorRota, { lat: 0, lng: 0 });
    });

    it('deve retornar null se não houver rotas', function() {
        const pedidos = [
            { endereco: { lat: 0, lng: 0 } },
            { endereco: { lat: 3, lng: 4 } }
        ];
        const rotas = [];
        const melhorRota = verificarMelhorRota(pedidos, rotas);
        assert.isNull(melhorRota);
    });

    it('deve retornar a única rota disponível', function() {
        const pedidos = [
            { endereco: { lat: 0, lng: 0 } },
            { endereco: { lat: 3, lng: 4 } }
        ];
        const rotas = [
            { lat: 2, lng: 2 }
        ];
        const melhorRota = verificarMelhorRota(pedidos, rotas);
        assert.deepEqual(melhorRota, { lat: 2, lng: 2 });
    });
});

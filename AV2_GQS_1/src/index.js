function verificarMelhorRota(pedidos, rotas){
    let melhorRota = null;
    let menorDistancia = Infinity;

    rotas.forEach(rota => {
        let distanciaTotal = 0;

        pedidos.forEach(pedido => {
            distanciaTotal += calcularDistancia(pedido.endereco, rota);
        });

        if (distanciaTotal < menorDistancia){
            menorDistancia = distanciaTotal; 
            melhorRota = rota;
        }
    });
    return melhorRota;
}

function calcularDistancia(endereco1, endereco2){
    return Math.sqrt(
        Math.pow(endereco1.lat - endereco2.lat, 2) +
        Math.pow(endereco1.lng - endereco2.lng, 2)
    );
}

module.exports = { verificarMelhorRota, calcularDistancia };

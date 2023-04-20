class Produto {
  nome;

  localizacao = {
    x: 0,
    y: 0
  };

  constructor (nome, corredor, prateleira) {
    this.nome = nome;

    this.localizacao.x =  1 + ((corredor -1) * 3);

    this.localizacao.y = 1 + ((prateleira - 1) * 2);
  }
}

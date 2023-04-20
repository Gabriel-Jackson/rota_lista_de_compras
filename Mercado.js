class Mercado {
  produtos = [];

  constructor (){
    this.produtos = [
      new Produto("Sabão em pó",1,1),
      new Produto("Amaciante",1,2),
      new Produto("Papel Higiênico",1,3),
      new Produto("Pão de Forma",2,1),
      new Produto("Leite",2,2),
      new Produto("Macarrão",2,2),
      new Produto("Arroz",2,3),
      new Produto("Feijão",2,3),
      new Produto("Melancia",3,1),
      new Produto("Detergente",3,2),
      new Produto("Sabonete",3,2),
      new Produto("Óleo",4,1),
      new Produto("Margarina",4,1),
      new Produto("Vinagre",4,2),
      new Produto("Farinha de Trigo",4,2),
      new Produto("Maçã",4,2),
      new Produto("Pasta de Dente",5,1),
      new Produto("Condicionador",5,2),
      new Produto("Banana",5,3),
      new Produto("Refrigerante",6,1)
    ];
  }

  procuraProduto(nome){
    if(!nome){
      console.log("Nome não definido");
      return false;
    }
    return this.produtos.find((element) => element.nome.toLowerCase() == nome)
  }
}

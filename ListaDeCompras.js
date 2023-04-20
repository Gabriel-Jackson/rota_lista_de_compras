const ListaDeCompras = function(
  produtos
){
  this.produtos = [];

  this.mercado = new Mercado();

  
}

ListaDeCompras.prototype.addProduto = function(nome){
  if(!nome){
    console.error("Nome não selecionado");
    return;
  }

  if(this.produtos.find((prod) => prod.nome.toLowerCase() == nome.toLowerCase())){
    console.error("Produto já está na lista!");
    return;
  }
  produto = this.mercado.procuraProduto(nome.toLowerCase());

  if(!produto) {
    console.error("Produto não existe!");
    return;
  }

  this.produtos.push(produto);

  
  this.produtos.sort((prodA, prodB) => {
    return prodA.localizacao.x - prodB.localizacao.x == 0? 
      prodA.localizacao.y - prodB.localizacao.y :
      prodA.localizacao.x - prodB.localizacao.x;
  });

  // this.gerarRota();
  return produto;
}

ListaDeCompras.prototype.gerarRota = function() {
  caminho.push(encontrarCaminho({localizacao: {x:1, y:1}}, this.produtos[0]));

  for (let i = 0; i < this.produtos.length; i++) {
    if(i + 1 < this.produtos.length){
      caminho.push(encontrarCaminho(this.produtos[i], this.produtos[i + 1]));
    }
    
  }

  let lastProd = this.produtos[this.produtos.length - 1];
  caminho[caminho.length - 1].push([lastProd.localizacao.x,6]);
  rotaDesenhada = false;
}



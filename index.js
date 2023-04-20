var listaDeCompra = new ListaDeCompras([]);

document.addEventListener('DOMContentLoaded',function(e) {
	var selectProd = document.getElementById('produto');

	listaDeCompra.mercado.produtos.forEach((produto) => {
		let option = document.createElement("option");

		option.setAttribute('value', produto.nome);
		option.text = produto.nome;

    selectProd.appendChild(option);
	})
});


document.getElementById("addLista").addEventListener('click',function(){
  let select = document.getElementById("produto");

  let selecionado = select.options[select.selectedIndex].value;

  let adicionado = listaDeCompra.addProduto(selecionado);

  if(adicionado){
    let lista = document.getElementById("lista-compras");
    let item = document.createElement("li");

    item.textContent = selecionado;

    lista.appendChild(item);

    // encontrarCaminho(listaDeCompra);

  }

})

document.getElementById("calculaRota").addEventListener('click',function(){
  listaDeCompra.gerarRota();

})
var mapHeigh = 7;
var mapWidth = 20;

var Tile = function(
	posX, 
	posY, 
	status, 
	inicio = 
	false, 
	fim = false){
		this.inicio =  inicio;
		this.fim = fim;
		this.aberto = false;
		this.status = status;
		this.custo = 0;
		this.posX = posX;
		this.posY = posY;
		this.size = 50;
		this.filhos = [];
		this.pai = null;
};


Tile.prototype.draw = function() {
	noStroke();
	fill(0,0,0);

	if(this.status == 0){
		fill(255,255,255);
	}

	if(this.inicio){
		fill(0,255,0);
	}
	rect(this.posX + this.size/2, this.posY + this.size/2,this.size);

	fill(0, 0, 255);
}
var tiles = [];
var destino = null;
var inicio = null;


var mapa = [];
	
var linhaInicial = 1;
var colunaInicial = 1;
var tileAtual = inicio;


function setup() 
{
	var canvas = createCanvas( mapWidth * 50, mapHeigh * 50);

	mapa = [
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[1,2,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0],
		[0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,0]
	];
	canvas.canvas.style.border = "1px solid black"
	
	rectMode(CENTER);
	for(let i = 0; i < mapHeigh; i ++){
		for(let j = 0; j < mapWidth; j ++){
			let tile = new Tile(
				j * 50,
				i * 50,
				mapa[i][j]
			);

			if(mapa[i][j] == 2){
				tile.inicio = true;
				tile.status = 0;
				tile.pai = tile;
				inicio = tile;
				linhaInicial = i;
				colunaInicial = j;
			}

			if(mapa[i][j] == 3){
				tile.fim = true;
				tile.status = 0;
				destino = tile;

			}
			mapa[i][j] = tile;
			tile.draw();
		}
	}


	
	linhaInicial = 0;
	colunaInicial = 0;
	tileAtual = inicio;

	
}
var tilesExplorados = [];
var caminho = [
	[[1, 1]]
];
var rotaDesenhada = false;



const encontrarCaminho = function (pontoA, pontoB){
	inicio = mapa[pontoA.localizacao.y][pontoA.localizacao.x];
	destino = mapa[pontoB.localizacao.y][pontoB.localizacao.x];

	destino.inicio = false;

	destino.fim = true;

	console.log(destino);

	inicio.inicio = true;
	inicio.fim = false;

	tileAtual = inicio;
	tileAtual.aberto = false;
	tiles.forEach((tile) => tile.aberto = false);
	while(!tileAtual.fim){
		var distanciaObjetivo = Math.sqrt(Math.abs(
			(destino.posX / 50) - (tileAtual.posX / 50)) +
			Math.abs(
				(destino.posY / 50) - (tileAtual.posY / 50))
		)
		var distanciaInicio = Math.sqrt(Math.abs(
			(inicio.posX / 50) - (tileAtual.posX / 50)) +
			Math.abs(
				(inicio.posY / 50) - (tileAtual.posY / 50)));
		if(!tileAtual.aberto){
			
			tileAtual.custo = tileAtual.inicio? 0: distanciaInicio + distanciaObjetivo;
			tileAtual.aberto = true;
			tiles.push(tileAtual);

		}
		

		tiles.sort((a,b) => {
			return a.custo - b.custo;
		});

		for(let tile = 0; tile < tiles.length; tile++){
			if(tiles[tile].aberto && tiles[tile].filhos.length <= 0){
				tileAtual = tiles[tile];

				if(tileAtual.fim){
					break;
				}
				linhaInicial = tileAtual.posY / 50;
				colunaInicial = tileAtual.posX / 50;

				var vizinhos = []
				if(linhaInicial > 0){
					vizinhos.push([[linhaInicial-1 ,colunaInicial],  mapa[linhaInicial - 1][colunaInicial]]);
				}
				if(colunaInicial < mapWidth - 1){
					vizinhos.push([[linhaInicial,colunaInicial+1], mapa[linhaInicial][colunaInicial + 1]]);
				}
				if(linhaInicial < mapHeigh - 1){
					vizinhos.push([[linhaInicial+1,colunaInicial], mapa[linhaInicial+1][colunaInicial]]);
				}
				if(colunaInicial > 0){
					vizinhos.push([[linhaInicial,colunaInicial-1], mapa[linhaInicial][colunaInicial - 1]]);
				}
				
				vizinhos.forEach(([coordenadas, tileVizinho]) => {
					if(tileVizinho.status == 0 && !tileVizinho.aberto){
						distanciaObjetivo = Math.sqrt(Math.abs(
							(destino.posX / 50) - (tileVizinho.posX / 50)) +
							Math.abs(
								(destino.posY / 50) - (tileVizinho.posY / 50)))
						
						tileVizinho.custo = tileAtual.custo + 10 + distanciaObjetivo;
						tileVizinho.aberto = true;
						tileVizinho.pai = tileAtual;
						tileAtual.filhos.push([coordenadas, tileVizinho]);

					}

					mapa[coordenadas[0]][coordenadas[1]] = tileVizinho;
					
				});
				
				tileAtual.filhos.sort((a,b) => {
					return a[1].custo - b[1].custo;
				});

				tileAtual.filhos.forEach(([coordenada,tileFilho]) => {
					tileFilho.pai = tileAtual;
					tiles.push(tileFilho);
				})
				tilesExplorados.push(tileAtual);
			}
		}
	}
	let caminhoAtual = [];
	while(!tileAtual.inicio){
		let coordenadas = [tileAtual.posX / 50, tileAtual.posY / 50];
		caminhoAtual.splice(0,0,coordenadas);
		
		let pai  = tileAtual.pai;
		tileAtual.pai = null;

		tileAtual = pai;
	}

	tileAtual = mapa[pontoB.localizacao.y][pontoB.localizacao.x];
	tilesExplorados = [];
	return caminhoAtual;
}

var draw = function()
{
	for (let i = 1; i <= 6; i++) {
		fill(0,0,255);
		noStroke();
		text(i,100 + ((i - 1) * 150), 25);
		
		rect(100 + ((i - 1) * 150), 325, 100, 50)
	}

	// while(!tileAtual.inicio){
		
		
	// 	line(
	// 		(50 * tileAtual.posX) + 25, 
	// 		(50 * tileAtual.posY) + 25, 
	// 		(50 * tileAtual.pai.posX) + 25, 
	// 		(50 * tileAtual.pai.posY) + 25)
	// 	tileAtual  = tileAtual.pai;


	// }
	if(!rotaDesenhada){
		for (let i = 0; i < caminho.length; i++) {
			const caminhoAtual = caminho[i];
			if(i == 0 && caminho.length > 1){
				stroke(0, 255, 50);
				line(
					(50 * caminhoAtual[0][0]) + 25, 
					(50 * caminhoAtual[0][1]) + 25, 
					(50 * caminho[i + 1][0][0]) + 25, 
					(50 * caminho[i + 1][0][1]) + 25)
			}
			for (let j = 0; j < caminhoAtual.length; j++) {
				const ponto = caminhoAtual[j];
				if(j + 1 <= caminhoAtual.length - 1){
					stroke(0, 255, 50);
					line(
						(50 * ponto[0]) + 25, 
						(50 * ponto[1]) + 25, 
						(50 * caminhoAtual[j + 1][0]) + 25, 
						(50 * caminhoAtual[j + 1][1]) + 25)
				} else if (j + 1 > caminhoAtual.length - 1 && i > 0){
					line(
						(50 * ponto[0]) + 25, 
						(50 * ponto[1]) + 25, 
						(50 * caminhoAtual[j - 1][0]) + 25, 
						(50 * caminhoAtual[j - 1][1]) + 25)
				}

				if(j == caminhoAtual.length - 1 && i > 0){
					let lastPath = caminho[i - 1];
					stroke(0, 255, 50);
					line(
						(50 * caminhoAtual[0][0]) + 25, 
						(50 * caminhoAtual[0][1]) + 25, 
						(50 * caminho[i - 1][lastPath.length - 1][0]) + 25, 
						(50 * caminho[i - 1][lastPath.length - 1][1]) + 25)
				}
			}
		}
		rotaDesenhada = true;
	}
}


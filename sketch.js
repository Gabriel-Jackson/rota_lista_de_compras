function setup() 
{
	var canvas = createCanvas(400, 400);

	canvas.canvas.style.border = "1px solid black"
}

var posX = 0;
var posY = 50;
var largura = 70;
var altura = 50;
var velocidade = 1;
var velocidadeY = 1;

var Objeto = function(x,y,largura = 50,altura = 50,velocidadeX = 0,velocidadeY = 0){
	this.x = x;
	this.y = y;
	this.largura = largura;
	this.altura = altura;
	this.velocidadeX = velocidadeX;
	this.velocidadeY = velocidadeY;
};

Objeto.prototype.draw = function(){
	this.vertices = [
		{
			x: this.x - this.largura / 2,
			y: this.y - this.altura / 2
		},
		{
			x: this.x + this.largura / 2,
			y: this.y - this.altura / 2
		},
		{
			x: this.x - this.largura / 2,
			y: this.y + this.altura / 2
		},
		{
			x: this.x + this.largura / 2,
			y: this.y + this.altura / 2
		},
	]
	rect(this.x,this.y,this.largura,this.altura);


}

Objeto.prototype.move = function() {
	this.x += this.velocidadeX;
	this.y += this.velocidadeY;
}

Objeto.prototype.bounce = function(objeto = false) {
	
			let touchingLeft = objeto.vertices[1].x >= this.vertices[0].x +5 &&
				objeto.vertices[1].x <= this.vertices[1].x && (
				(objeto.vertices[1].y > this.vertices[1].y && 
					objeto.vertices[0].y < this.vertices[3].y
				) || 
				(this.vertices[1].y > objeto.vertices[0].y &&
					this.vertices[1].y < objeto.vertices[2].y
				)
			);
			let touchingRight = objeto.vertices[0].x <= this.vertices[1].x && 
			objeto.vertices[0].x >= this.vertices[0].x && (
				(objeto.vertices[0].y > this.vertices[1].y && 
					objeto.vertices[0].y < this.vertices[3].y
				) || 
				(this.vertices[1].y > objeto.vertices[0].y &&
					this.vertices[1].y < objeto.vertices[2].y
				)
			);

			let touchingTop = objeto.vertices[3].y >= this.vertices[1].y && 
					objeto.vertices[3].y <= this.vertices[2].y && (
						(
							objeto.vertices[2].x > this.vertices[0].x &&
							objeto.vertices[2].x < this.vertices[1].x
						) ||
						(
							objeto.vertices[3].x > this.vertices[0].x &&
							objeto.vertices[3].x < this.vertices[1].x
						) ||
						(
							this.vertices[1].x > objeto.vertices[2].x &&
							this.vertices[1].x < objeto.vertices[3].x
						) ||
						(
							this.vertices[0].x > objeto.vertices[2].x &&
							this.vertices[0].x < objeto.vertices[3].x
						)
					);

			let touchingBottom = objeto.vertices[1].y <= this.vertices[3].y && 
					objeto.vertices[1].y >= this.vertices[1].y && (
						(
							objeto.vertices[2].x > this.vertices[0].x &&
							objeto.vertices[2].x < this.vertices[1].x
						) ||
						(
							objeto.vertices[3].x > this.vertices[0].x &&
							objeto.vertices[3].x < this.vertices[1].x
						) ||
						(
							this.vertices[1].x > objeto.vertices[2].x &&
							this.vertices[1].x < objeto.vertices[3].x
						) ||
						(
							this.vertices[0].x > objeto.vertices[2].x &&
							this.vertices[0].x < objeto.vertices[3].x
						)
					);
			

			if(touchingTop || touchingBottom){
				this.velocidadeY *= -1;
			}
			if(touchingRight || touchingLeft){
					this.velocidadeX = this.velocidadeX * -1;
					
			}
}

var objetos = [
	new Objeto(-5,200,10,400),
	new Objeto(405,200,10,400),
	new Objeto(200,-5,400,10),
	new Objeto(200,405,400,10),
	new Objeto(275,200,150,10),
	new Objeto(325,350,150,100)
];

var moving = new Objeto(200, 300, 50, 50, 2, 2);

var draw = function()
{
	rectMode(CENTER);
	background(255,255,255);
	fill(255,255,255);
	moving.draw();
	

	objetos.forEach((objeto) => {
		
		objeto.draw();
		
		objeto.move();
		moving.bounce(objeto);
	});

	moving.move();
}

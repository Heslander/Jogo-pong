// variáveis da bola
let xBola = 300;
let yBola = 200;
let dBola = 15;
let raio = dBola/2;

// variávei velocidade da bola
let velocidadeXbola = +9.3;
let velocidadeYbola = +4.8;

// variáveis raquete
let xRaqueteEsquerda = 5;
let yRaqueteEsquerda = 160;
let larguraRaqueteEsquerda = 10;
let comprimentoRaqueteEsquerda = 80;

let xRaqueteDireita = (600-15);
let yRaqueteDireita = 160;
let larguraRaqueteDireita = 10;
let comprimentoRaqueteDireita = 80;

// variáveis raquete movimento automático

let velocidadeAutomatica;

// colisão biblioteca

let colidiu = false;

// variáveis placar

let meusPontos = 0;
let pontosOponente = 0;

// Sons do jogo

let raquetada;
let ponto;
let trilha;

// parametros do jogo

let chanceDeErro = 0;


function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBola();
  movimentoBola();
  verificaColisao();
  raquete(xRaqueteEsquerda,yRaqueteEsquerda);
  raquete(xRaqueteDireita,yRaqueteDireita );
  //raqueteDireita();
  //movimentoRaqueteEsquerda();
  //movimentoRaqueteDireita();
  colisaoRaqueteEsquerda();
  colisaoRaqueteDireita();
  //colisaoBiblioteca(xRaqueteEsquerda, yRaqueteEsquerda);
  //colisaoBiblioteca(xRaqueteDireita, yRaqueteDireita);
  movimentoRaquete();
  movimentoAutomatico();
  incluiPlacar();
  marcaPonto();
  //calculaChanceDeErro();
  bugBolaPresa();
  
  
 }

function mostraBola() {
  circle(xBola, yBola, dBola);
}

function movimentoBola () {
  xBola += velocidadeXbola;
  yBola += velocidadeYbola;
}

function verificaColisao() {
  if (xBola + raio > width || 
     xBola - raio <0) {
  velocidadeXbola *= -1; 
  }
  
  if (yBola + raio > height ||
      yBola - raio < 0) {
    velocidadeYbola *= -1;
  }
}

function raquete (x, y) {
  rect (x,y,larguraRaqueteEsquerda,
        comprimentoRaqueteEsquerda);
}

function raqueteDireita () {
 rect (xRaqueteDireita,yRaqueteDireita,larguraRaqueteDireita,
       comprimentoRaqueteDireita);
}

function movimentoRaqueteEsquerda() {
 if (keyIsDown(DOWN_ARROW)) {
  yRaqueteEsquerda += 3;  
 }
 if (keyIsDown(UP_ARROW)) {
   yRaqueteEsquerda -= 3; 
 }  
}
        
function movimentoRaquete() {
  if (keyIsDown(DOWN_ARROW)) {
    yRaqueteEsquerda += 3;  
  }
  if (keyIsDown(UP_ARROW)) {
    yRaqueteEsquerda -= 3; 
  }  
  yRaqueteEsquerda = constrain (yRaqueteEsquerda, 10, 310);
}
function movimentoRaqueteDireita() {
  if (keyIsDown(83)){ 
    yRaqueteDireita += 3;  
  }
  if (keyIsDown(87)){ 
    yRaqueteDireita -= 3;
      }
  yRaqueteDireita = constrain (yRaqueteDireita, 10, 310);
}



function colisaoRaqueteEsquerda() {
  if (xBola - raio < xRaqueteEsquerda + larguraRaqueteEsquerda && 
     yBola - raio < yRaqueteEsquerda + comprimentoRaqueteEsquerda &&
     yBola + raio > yRaqueteEsquerda) {
  velocidadeXbola *= -1;
    raquetada.play();
  }
}

function colisaoRaqueteDireita() {
  if (xBola + raio > xRaqueteDireita && 
     yBola - raio < yRaqueteDireita + comprimentoRaqueteDireita &&
     yBola + raio > yRaqueteDireita) {
  velocidadeXbola *= -1;
    raquetada.play();
  }
}
                                      
function colisaoBiblioteca (x, y) {
  colidiu = 
  collideRectCircle(x, y, larguraRaqueteEsquerda, comprimentoRaqueteEsquerda, xBola, yBola, raio);
  if (colidiu) {
    velocidadeXbola *= -1
    raquetada.play();
  }
}

function movimentoAutomatico(){
  velocidadeYAutomatico = yBola - yRaqueteDireita - comprimentoRaqueteDireita /2 - 10; 
 yRaqueteDireita += velocidadeYAutomatico + chanceDeErro
calculaChanceDeErro ()
yRaqueteDireita = constrain(yRaqueteDireita, 0, 310);

}

function incluiPlacar(){
  stroke(255);
  textAlign (CENTER);
  textSize (16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text (meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect (450, 10, 40, 20);
  fill(255);
  text (pontosOponente, 470, 26);
}

function marcaPonto (){
  if (xBola > 590) {
    meusPontos += 1;
    ponto.play();
    
  }
  if (xBola < 10){
    pontosOponente += 1;
    ponto.play();
  }
}

function calculaChanceDeErro (){
  if (pontosOponente > meusPontos) {
    chanceDeErro += 2
    if (chanceDeErro >= 10){
      chanceDeErro = 60
    }
  } else {
    chanceDeErro -= 4
    if (chanceDeErro <= 5){
      chanceDeErro = 0
    }
  }
}
function bugBolaPresa(){
  if (xBola - raio < 0){
    xBola = 23
  }
  if (xBola + raio > width) {
    xBola = 567
  }
}

function verificaColisaoBorda(){
  if (xBola + raio> width ||
     xBola - raio< 0){
    velocidadeXbola *= -1;
  }
  if (yBola + raio> height ||
     yBola - raio < 0){
    velocidadeYbola *= -1;
  }
}
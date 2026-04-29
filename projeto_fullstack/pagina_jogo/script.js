//declaração das variaveis----------------------------------------------
let canvas = document.getElementById("canvas1")
let ctx = canvas.getContext("2d")

function quadrado(qua){
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.fillStyle = qua.color;
    ctx.fillRect(qua.x,qua.y,qua.w,qua.h);
    ctx.closePath()
}

let contador_fases = 0

function desenhar(){
    ctx.clearRect(0,0,600,400)
    if(personagem.x >= 560 && contador_fases != 2){
        contador_fases += 1
        personagem.x = 10
    }
    else if(personagem.x <= 0 && contador_fases != 0){
        contador_fases -= 1
        personagem.x = 540
    }
    if(contador_fases == 0){
        cenario_3()
    }
    if(contador_fases == 1){
        cenario_2()
    }
    if(contador_fases == 2){
        cenario_3()
    }
    quadrado(personagem)
    //fazer pelo menos mais 2 cenarios
    requestAnimationFrame(desenhar)
}

function hitbox(obs){
    quadrado(obs)
    if(personagem.y + personagem.h >= obs.y && personagem.y + personagem.h <= obs.y + 10 ){
        if(personagem.x + personagem.w >= obs.x && personagem.x <= obs.x + obs.w){
            vertical = 0
            personagem.y = obs.y - personagem.h // quando for atribuir um novo valor a uma variavel, 
                                                // sempre usar o "=", e 
                                                // deixar a variavel isolada de outros valores do lado
                                                // esquerdo
            chao = true
        }
    }
}

let mov = 2
function armadilha_subida(obs,y){
    quadrado(obs)
    if(obs.y > y){mov = -4}
    obs.y += mov
}

//-------mudança de cenario-----------------------------------------------

function cenario_1(){
    quadrado(habitante_vila)
}
function cenario_2(){
    hitbox(obstaculo1)
    hitbox(obstaculo2)
    hitbox(obstaculo3)
}
function cenario_3(){
    armadilha_subida(armadilha1,350)
}
//-------personagens------------------------------------------------------
let personagem = {
    x : 40,
    y : 340,
    w : 40,
    h : 60,
    color : "yellow",
}
let habitante_vila = {
    x : 450,
    y : 340,
    w : 40,
    h : 60,
    color : "blue",
}

//--------objetos---------------------------------------------------------

//cenario 1
let obstaculo1 = {
    x : 200,
    y : 300,
    w : 100,
    h : 20,
    color : "brown"
}
let obstaculo2 = {
    x : 300,
    y : 250,
    w : 100,
    h : 20,
    color : "brown"
}
let obstaculo3 = {
    x : 0,
    y : 300,
    w : 100,
    h : 20,
    color : "brown"
}
//cenario 2
let armadilha1 = {
    x : 350,
    y : 400,
    w : 30,
    h : 100,
    color : "grey"
}
//---------movimentação-------------------------------------------------------
let vertical = 0;
let gravidade = 0.3;
let chao = true

function pulo(){ //inicializa o pulo
    if(chao){
        vertical = -9
        chao = false
    }
}

function pulo_ar(){ //prossegue com a ação do pulo
    vertical += gravidade
    personagem.y += vertical
    if(personagem.y >= 340){ //descida
        vertical = 0
        personagem.y = 340
        chao = true
    }
}

function loop(){
    pulo_ar()
    requestAnimationFrame(loop)
}

loop()

document.addEventListener("keydown",function(evento){
    var tecla = evento.key;
    var velocidadey = 0
    var velocidadex = 8
    if(personagem.y == 340){velocidadey}
    if(tecla == "a" && personagem.x == 0){velocidadex = 0}
    if(tecla == "d" && personagem.x >= 560){velocidadex = 0}
    if(tecla == "w"){ pulo() }
    if(tecla == "d"){ personagem.x += velocidadex }
    if(tecla == "a"){ personagem.x -= velocidadex }
})

desenhar()
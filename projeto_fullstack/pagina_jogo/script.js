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
    if(vida != 0){
        if(personagem.x >= 560 && contador_fases != 5){
            contador_fases += 1
            personagem.x = 10
        }
        else if(personagem.x <= 0 && contador_fases != 0){
            contador_fases -= 1
            personagem.x = 540
        }
        if(contador_fases == 0){
            cenario_inicial()
        }
        if(contador_fases == 1){
            cenario_1()
        }
        if(contador_fases == 2){
            cenario_2()     
        }
        if(contador_fases == 3){
            cenario_3()
        }
        if(contador_fases == 4){
            cenario_4()
        }
        quadrado(personagem)
    }
    else{
        vida += 3
        contador_fases = 0
        personagem.x = 40
    }
    perda_vida()
    requestAnimationFrame(desenhar)
}

function hitbox(obs){
    quadrado(obs)
    if(personagem.y + personagem.h >= obs.y && personagem.y + personagem.h <= obs.y + 10 ){
        if(personagem.x + personagem.w >= obs.x && personagem.x <= obs.x + obs.w){
            vertical = 0
            personagem.y = obs.y - personagem.h 
            chao = true
        }
    }
}

let sub = 1
function armadilha_subida(obs,y){
    hitbox(obs)
    obs.y += sub
    if(obs.y == y){sub = 1}
    if(obs.y == 400){sub = -1}
    if(personagem.x + personagem.w >= obs.x && personagem.x <= obs.x + obs.w){
        if(personagem.y +personagem.h >= obs.y){
            vida -= 1
            personagem.x = 40
        }
    }
}
let ver = 0.5
function armadilha_horizontal(obs,x1,x2){
    hitbox(obs)
    obs.x += ver
    if(obs.x <= x1){ver = 0.5}
    if(obs.x >= x2){ver = -0.5}
    if(personagem.x + personagem.w >= obs.x && personagem.x <= obs.x + obs.w){
        if(personagem.y +personagem.h >= obs.y && personagem.y <= obs.y + obs.h){
            vida -= 1
            personagem.y = 340
            personagem.x = 40
        }
    }
}

//fazer mais uma armadilha que lança dados

//-------mudança de cenario-----------------------------------------------

function cenario_inicial(){
    quadrado(habitante_vila)
}
//-------cenario1---------------------------------------------------------
function cenario_1(){
    hitbox(obstaculo1)
    hitbox(obstaculo2)
    hitbox(obstaculo3)
    armadilha_subida(armadilha1,200)
}
let obstaculo1 = {
    x : 200,
    y : 200,
    w : 100,
    h : 20,
    color : "brown"
}
let obstaculo2 = {
    x : 100,
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
let armadilha1 = {
    x : 350,
    y : 390,
    w : 30,
    h : 400,
    color : "grey"
}
//-------cenario2---------------------------------------------------------
function cenario_2(){
    hitbox(obstaculo4)
    armadilha_horizontal(armadilha3,20,540)
    armadilha_horizontal(armadilha2,50,)
}
let armadilha2 = {
    x : 200,
    y : 320,
    w : 40,
    h : 40,
    color : "grey"
}
let armadilha3 = {
    x : 400,
    y : 240,
    w : 40,
    h : 40,
    color : "grey"
}
let obstaculo4 = {
    x : 50,
    y : 290,
    w : 300,
    h : 20,
    color : "brown"   
}
//------cenario3---------------------------------------------------------
function cenario_3(){
    hitbox(plataforma1)
    hitbox(plataforma2)
    hitbox(plataforma3)
    hitbox(plataforma4)
    hitbox(plataforma5)
    armadilha_subida(parede,190)
    armadilha_horizontal(armadilha4,70,220)
    armadilha_horizontal(armadilha5)
}
let parede = {
    x : 300,
    y : 200,
    w : 20,
    h : 210,
    color : "grey"
}
let armadilha4 = {
    x : 210,
    y : 250,
    w : 40,
    h : 40,
    color : "grey"
}
let plataforma1 = {
    x : 80,
    y : 300,
    w : 130,
    h : 20,
    color : "brown"
}
let plataforma2 = {
    x : 60,
    y : 200,
    w : 130,
    h : 20,
    color : "brown"
}
let plataforma3 = {
    x : 120,
    y : 100,
    w : 130,
    h : 20,
    color : "brown"
}
let plataforma4 = {
    x : 270,
    y : 170,
    w : 140,
    h : 20,
    color : "brown"
}
let plataforma5 = {
    x : 460,
    y : 300,
    w : 140,
    h : 20,
    color : "brown"
}
let armadilha5 = {
    x : 510,
    y : 240,
    w : 40,
    h : 40,
    color : "grey"
}
//-------cenario4---------------------------------------------------------
function cenario_4(){

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

//---------movimentação-------------------------------------------------------
let vertical = 0;
let gravidade = 0.2;
let chao = true

function pulo(){ //inicializa o pulo
    if(chao){
        vertical = -7
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

//sistema de vida

let vida1 = {
    x : 20,
    y : 20,
    w : 20,
    h : 20,
    color : "red"
}
let vida2 = {
    x : 60,
    y : 20,
    w : 20,
    h : 20,
    color : "red"
}
let vida3 = {
    x : 100,
    y : 20,
    w : 20,
    h : 20,
    color : "red"
}

let vida = 3
function perda_vida(){
    if(vida == 3){
        quadrado(vida1)
        quadrado(vida2)
        quadrado(vida3)
    }
    else if(vida == 2){
        quadrado(vida1)
        quadrado(vida2)
    }
    else if(vida == 1){
        quadrado(vida1)
    }
}

desenhar()
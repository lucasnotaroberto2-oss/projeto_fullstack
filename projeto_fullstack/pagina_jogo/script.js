//declaração das variaveis----------------------------------------------
let canvas = document.getElementById("canvas1")
let ctx = canvas.getContext("2d")

function quadrado(qua){
    if(qua.img){
        ctx.drawImage(qua.img, qua.x, qua.y, qua.w, qua.h)
    } else {
        ctx.fillStyle = qua.color
        ctx.fillRect(qua.x, qua.y, qua.w, qua.h)
    }
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
        if(contador_fases == 5){
            cenario_5()
        }
        quadrado(personagem)
    }
    else{
        vida = 3
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
function lava(obs){
    hitbox(obs)
    if(personagem.y + personagem.h >= obs.y){
        vida -= 1
        personagem.y = 300 - personagem.h
        personagem.x = 40
    }
}
let x = 1
function armadilha_dados(obs){
    quadrado(obs)
    obs.y += x
    if(obs.y >= 400){
        obs.y = 0
    }
    if(personagem.y + personagem.h >= obs.y && personagem.y + personagem.h <= obs.y + 10 ){
        if(personagem.x + personagem.w >= obs.x && personagem.x <= obs.x + obs.w){
            personagem.y = 300 - personagem.h
            personagem.x = 40
            vida -= 1
        }
    }
}

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
    armadilha_horizontal(armadilha3,50,540)
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
    w : 210,
    h : 140,
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
    hitbox(plat1)
    hitbox(plat2)
    lava(lava1)
    hitbox(plat3)
    armadilha_dados(dardo1)
    armadilha_dados(dardo2)
    armadilha_dados(dardo3)
    armadilha_dados(dardo4)
    armadilha_dados(dardo5)
    hitbox(plat4)
}
let plat1 = {
    x : 0,
    y : 300,
    w : 100,
    h : 20,
    color : "brown"
}
let plat2 = {
    x : 520,
    y : 300,
    w : 80,
    h : 100,
    color : "brown"
}
let lava1 = {
    x : 0,
    y : 380,
    w : 520,
    h : 20,
    color : "orange"
}
let plat3 = {
    x : 160,
    y : 300,
    w : 100,
    h : 20,
    color : "brown"
}
let dardo1 = {
    x : 120,
    y : 0,
    w : 10,
    h : 10,
    color : "green"
}
let dardo2 = {
    x : 300,
    y : 0,
    w : 10,
    h : 10,
    color : "green"
}
let dardo3 = {
    x : 340,
    y : 0,
    w : 10,
    h : 10,
    color : "green"
}
let dardo4 = {
    x : 380,
    y : 0,
    w : 10,
    h : 10,
    color : "green"
}
let dardo5 = {
    x : 420,
    y : 0,
    w : 10,
    h : 10,
    color : "green"
}
let plat4 = {
    x : 270,
    y : 250,
    w : 190,
    h : 20,
    color : "brown"
}
//-------cenario5---------------------------------------------------------
function cenario_5(){
    hitbox(p1)
    quadrado(altar)
    quadrado(flor)
}
let p1 = {
    x: 0,
    y : 300,
    w : 600,
    h : 100,
    color : "brown"
}
let altar = {
    x : 270,
    y : 270,
    w : 60,
    h : 30,
    color : "grey"
}
let flor = {
    x : 280,
    y : 230,
    w : 40,
    h : 40,
    color : "cyan"
}
//-------personagens------------------------------------------------------
let pose_padrao = new Image()
pose_padrao.src = "../imagens_jogo/pose_padrao.png"

let personagem_direita = new Image()
personagem_direita.src = "../imagens_jogo/movimento_direita.png"

let personagem_esquerda = new Image()
personagem_esquerda.src = "../imagens_jogo/movimento_esquerda.png"

let plo = new Image()
plo.src = "../imagens_jogo/pulo.png"

let personagem = {
    x : 40,
    y : 340,
    w : 40,
    h : 60,
    img : pose_padrao
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
        vertical = -9
        chao = false
        personagem.img = plo
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
    if(tecla == "d"){ 
        personagem.x += velocidadex
        personagem.img = personagem_direita
    }
    if(tecla == "a"){ 
        personagem.x -= velocidadex
        personagem.img = personagem_esquerda 
    }
})

//sistema de vida
let coracao = new Image()
coracao.src = "../imagens_jogo/coracao.png"

let vida1 = {
    x : 20,
    y : 20,
    w : 20,
    h : 20,
    img : coracao
}
let vida2 = {
    x : 60,
    y : 20,
    w : 20,
    h : 20,
    img : coracao
}
let vida3 = {
    x : 100,
    y : 20,
    w : 20,
    h : 20,
    img : coracao
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
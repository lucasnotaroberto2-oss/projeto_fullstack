//declaração das variaveis----------------------------------------------
let canvas = document.getElementById("canvas1")
let ctx = canvas.getContext("2d")
//---------imagens------------------------------------------------------

//----------------------------------------------------------------------
function quadrado(qua){
    if(!qua){
        return
    }
    if(qua.img){
        ctx.drawImage(qua.img, qua.x, qua.y, qua.w, qua.h)
    } else {
        ctx.fillStyle = qua.color
        ctx.fillRect(qua.x, qua.y, qua.w, qua.h)
    }
}

function escrevermensagem(mensagem,x,y){
    ctx.font = "30px 'Press Start 2P'";
    ctx.fillStyle = "black";
    ctx.fillText(mensagem, x, y);
}

function hitbox(obs){
    quadrado(obs)
    if(personagem.y + personagem.h >= obs.y && personagem.y + personagem.h <= obs.y + obs.h ){
        if(personagem.x + personagem.w >= obs.x && personagem.x <= obs.x + obs.w){
            vertical = 0
            personagem.y = obs.y - personagem.h 
            chao = true
        }
    }
}
function colisao(a,b){
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    )
}

let dir = 1
function armadilha_subida(obs,y,y2,vel){
    hitbox(obs)
    obs.y += vel * dir
    if(obs.y <= y){dir = 1}
    if(obs.y >= y2){dir = -1}
    if(personagem.x + personagem.w >= obs.x && personagem.x <= obs.x + obs.w){
        if(personagem.y +personagem.h >= obs.y){
            vida -= 1
            personagem.x = 40
        }
    }
}

let direcao = 1
function armadilha_horizontal(obs,x1,x2,vel){
    hitbox(obs)
    obs.x += vel * direcao
    if(obs.x <= x1){direcao = 1}
    if(obs.x >= x2){direcao = -1}
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
function armadilha_dados(obs,z){
    quadrado(obs)
    obs.y += x
    if(obs.y >= z){
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
let z = 0.5
function plataforma_movel(obs,x1,x2){
    quadrado(obs)
    if(obs,colisao(personagem,obs)){
        personagem.y = obs.y - personagem.h
        chao = true
    }
    if(obs.x<=x1){z = 1}
    if(obs.x + obs.w>=x2){z = -1}
    obs.x += 1 * z
}
//------fases----------------------------------------------------------------------
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
            if(flor_templo && colisao(personagem,flor_templo)){
                if(estrelas == 3){
                    flor_templo = null
                    escrevermensagem("voce coletou","a flor do templo!",250,200)
                }
                else{
                    escrevermensagem("faltam","estrelas!",250,200)
                }
            }
        }
        quadrado(personagem)
    }
    else{
        vida = 3
        contador_fases = 0
        personagem.x = 40
    }
    coletar_estrela()
    perda_vida()
    requestAnimationFrame(desenhar)
}
//-------cenario inicial--------------------------------------------------
function cenario_inicial(){
}
//-------cenario1---------------------------------------------------------
function cenario_1(){
    quadrado(background_c1)
    hitbox(p1_c1)
    hitbox(p2_c1)
    hitbox(p3_c1)
    hitbox(p4_c1)
    hitbox(p5_c1)
    armadilha_subida(armadilha_vert_c1,220,400,1)
    armadilha_horizontal(armadilha_hor1_c1,50,450,1)
    armadilha_horizontal(armadilha_hor2_c1,90,530,2)
    quadrado(estrela1)
}
let background_c1 = {
    x : 0,
    y : 0,
    w : 600,
    h : 400,
    color : "orange"
}
let p1_c1 = {
    x : 0,
    y : 300,
    w : 100,
    h : 20,
    color : "brown"
}
let p2_c1 = {
    x : 150,
    y : 240,
    w : 100,
    h : 20,
    color : "brown"
}
let p3_c1 = {
    x : 250,
    y : 190,
    w : 100,
    h : 20,
    color : "brown"
}
let p4_c1 = {
    x : 0,
    y : 90,
    w : 100,
    h : 20,
    color : "brown"
}
let p5_c1 = {
    x : 250,
    y : 90,
    w : 250,
    h : 20,
    color : "brown"
}
let armadilha_vert_c1 = {
    x : 110,
    y : 350,
    w : 30,
    h : 180,
    color: "grey"
}
let armadilha_hor1_c1 = {
    x : 250,
    y : 120,
    w : 40,
    h : 40,
    color : "grey"
}
let armadilha_hor2_c1 = {
    x : 300,
    y : 20,
    w : 40,
    h : 40,
    color : "grey"
}
let estrela1 = {
    x : 380,
    y : 20,
    w : 50,
    h : 50,
    color : "yellow"
}
//-------cenario2---------------------------------------------------------
function cenario_2(){
    quadrado(background_c2)
    quadrado(estrela2)
    armadilha_dados(dardo1_c2,225)
    armadilha_dados(dardo2_c2,170)
    armadilha_dados(dardo3_c2,190)
    hitbox(p1_c2)
    hitbox(p2_c2)
    hitbox(p3_c2)
    hitbox(p4_c2)
    hitbox(p5_c2)
    hitbox(p6_c2)
    hitbox(p7_c2)
    armadilha_subida(armadilha_vert1_c2,340,450,1.1)
    armadilha_subida(armadilha_vert2_c2,340,450,1.2)
    armadilha_subida(armadilha_vert3_c2,340,450,1.3)
}
let estrela2 = {
    x : 40,
    y : 50,
    w : 50,
    h : 50,
    color : "yellow"
}
let background_c2 = {
    x : 0,
    y : 0,
    w : 600,
    h : 400,
    color : "orange"
}
let p1_c2 = {
    x : 0,
    y : 100,
    w : 100,
    h : 20,
    color : "brown"
}
let p2_c2 = {
    x : 150,
    y : 150,
    w : 300,
    h : 100,
    color : "brown"
}
let p3_c2 = {
    x : 450,
    y : 150,
    w : 150,
    h : 20,
    color : "brown"
}
let p4_c2 = {
    x : 500,
    y : 200,
    w : 50,
    h : 20,
    color : "brown"
}
let p5_c2 = {
    x : 500,
    y : 250,
    w : 50,
    h : 20,
    color : "brown"
}
let p6_c2 = {
    x : 500,
    y : 300,
    w : 50,
    h : 20,
    color : "brown"
}
let p7_c2 = {
    x : 500,
    y : 350,
    w : 50,
    h : 20,
    color : "brown"
}
let armadilha_vert1_c2 = {
    x : 175,
    y : 400,
    w : 25,
    h : 60,
    color : "grey"
}
let armadilha_vert2_c2 = {
    x : 275,
    y : 400,
    w : 25,
    h : 60,
    color : "grey"
}
let armadilha_vert3_c2 = {
    x : 375,
    y : 400,
    w : 25,
    h : 60,
    color : "grey"
}
let dardo1_c2 = {
    x : 150,
    y : 0,
    w : 25,
    h : 25,
    color : "green"
}
let dardo2_c2 = {
    x : 250,
    y : 0,
    w : 25,
    h : 25,
    color : "green"
}
let dardo3_c2 = {
    x : 350,
    y : 0,
    w : 25,
    h : 25,
    color : "green"
}
//------cenario3---------------------------------------------------------
function cenario_3(){
    quadrado(background_c3)
    quadrado(estrela3)
    hitbox(p1_c3)
    hitbox(p2_c3)
    hitbox(p3_c3)
    hitbox(p4_c3)
    plataforma_movel(plat_movel,275,550)
}
let background_c3 = {
    x : 0,
    y : 0,
    w : 600,
    h : 400,
    color : "orange"
}
let p1_c3 = {
    x : 0,
    y : 150,
    w : 100,
    h : 20,
    color : "brown"
}
let p2_c3 = {
    x : 550,
    y : 300,
    w : 50,
    h : 100,
    color : "brown"
}
let p3_c3 = {
    x : 150,
    y : 200,
    w : 100,
    h : 20,
    color : "brown"
}
let p4_c3 = {
    x : 350,
    y : 50,
    w : 100,
    h : 20,
    color : "brown"
}
let estrela3 = {
    x : 375,
    y : 5,
    w : 40,
    h : 40,
    color : "yellow"
}
let plat_movel = {
    x : 350,
    y : 150,
    w : 100,
    h : 20,
    color : "brown"
}
//-------cenario4---------------------------------------------------------
function cenario_4(){
    quadrado(background_c4)
    hitbox(plat1)
    hitbox(plat2)
    lava(lava1)
    hitbox(plat3)
    hitbox(plat4)
    armadilha_dados(dardo1,400)
    armadilha_dados(dardo2,400)
    armadilha_dados(dardo3,400)
    armadilha_dados(dardo4,400)
    armadilha_dados(dardo5,400)
}
let background_c4 = {
    x : 0,
    y : 0,
    w : 600,
    h : 400,
    color : "orange"
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
    color : "red"
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
    w : 30,
    h : 30,
    color : "green"
}
let dardo2 = {
    x : 300,
    y : 0,
    w : 30,
    h : 30,
    color : "green"
}
let dardo3 = {
    x : 340,
    y : 0,
    w : 30,
    h : 30,
    color : "green"
}
let dardo4 = {
    x : 380,
    y : 0,
    w : 30,
    h : 30,
    color : "green"
}
let dardo5 = {
    x : 420,
    y : 0,
    w : 30,
    h : 30,
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
    quadrado(background_c5)
    hitbox(p1_c5)
    hitbox(p2_c5)
    hitbox(p3_c5)
    hitbox(p4_c5)
    quadrado(altar)
    quadrado(flor_templo)
}
let background_c5 = {
    x:0,
    y:0,
    w:600,
    h:400,
    color:"orange"
}
let p1_c5 = {
    x : 0,
    y:380,
    w:600,
    h:20,
    color:"brown"
}
let p2_c5 = {
    x : 0,
    y:360,
    w:200,
    h:20,
    color:"brown"
}
let p3_c5 = {
    x : 0,
    y:340,
    w:150,
    h:20,
    color:"brown"
}
let p4_c5 = {
    x : 0,
    y:320,
    w:100,
    h:20,
    color:"brown"
}
let altar = {
    x:400,
    y:330,
    w:100,
    h:50,
    color:"grey"
}
let flor_templo = {
    x : 420,
    y :270,
    w:60,
    h:60,
    color:"cyan"
}
//-------personagens------------------------------------------------------
let personagem = {
    x : 40,
    y : 340,
    w : 40,
    h : 60,
    color : "yellow"
}
//---------movimentação-------------------------------------------------------
let vertical = 0;
let gravidade = 0.1;
let chao = true

function pulo(){ //inicializa o pulo
    if(chao){
        vertical = -5
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
    if(tecla == "d"){ 
        personagem.x += velocidadex
    }
    if(tecla == "a"){ 
        personagem.x -= velocidadex 
    }
})

//---------sistema de vida-------------------------------------------

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
//------sistema de coletaveis--------------------------------------------------------------------------------
let estrela1_hud = {
    x : 560,
    y : 20,
    w : 20,
    h : 20,
    color : "yellow"
}
let estrela2_hud = {
    x : 520,
    y : 20,
    w : 20,
    h : 20,
    color : "yellow"
}
let estrela3_hud = {
    x : 480,
    y : 20,
    w : 20,
    h : 20,
    color : "yellow"
}
estrelas = 0
function coletar_estrela(){
    if(contador_fases == 1){
        if(estrela1 && colisao(personagem,estrela1)){
            estrelas += 1
            estrela1 = null
        }    
    }
    if(contador_fases == 2){
        if(estrela2 && colisao(personagem,estrela2)){
            estrelas += 1
            estrela2 = null
        }
    }
    if(contador_fases == 3){
        if(estrela3 && colisao(personagem,estrela3)){
            estrelas += 1
            estrela3 = null
        }
    }
    if(estrelas >= 1){
        quadrado(estrela1_hud)
    }
    if(estrelas >= 2){
        quadrado(estrela2_hud)
    }
    if(estrelas >= 3){
        quadrado(estrela3_hud)
    }
}
desenhar()
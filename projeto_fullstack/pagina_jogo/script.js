//declaração das variaveis----------------------------------------------
let canvas = document.getElementById("canvas1")
let ctx = canvas.getContext("2d")

function quadrado(ctx,qua){
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.fillStyle = qua.color;
    ctx.fillRect(qua.x,qua.y,qua.w,qua.h);
    ctx.closePath()
}

function desenhar(){
    ctx.clearRect(0,0,600,400)
    hitbox(ctx,obstaculo1)
    hitbox(ctx,obstaculo2)
    quadrado(ctx,personagem)
    requestAnimationFrame(desenhar)
}

function hitbox(ctx,obs){
    quadrado(ctx,obs)
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
//-------personagens------------------------------------------------
let personagem = {
    x : 40,
    y : 340,
    w : 40,
    h : 60,
    color : "yellow",
}
//--------objetos---------------------------------------------------------
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
//---------pulo-------------------------------------------------------
let vertical = 0;
let gravidade = 0.2;
let chao = true

function pulo(){ //inicializa o pulo
    if(chao){
        vertical = -8
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
//pulo----------------------------------------------------------------
document.addEventListener("keydown",function(evento){
    var tecla = evento.key;
    var velocidadey = 5 
    var velocidadex = 5
    //limita o personagem dentro do canvas
    if(personagem.y == 340){velocidadey = 0}
    if(tecla == "a" && personagem.x == 0){velocidadex = 0}
    if(tecla == "d" && personagem.x == 560){velocidadex = 0}
    if(tecla == "w"){ pulo() }
    if(tecla == "d"){ personagem.x += velocidadex }
    if(tecla == "a"){ personagem.x -= velocidadex }
})

desenhar()
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
    quadrado(ctx,personagem)
    requestAnimationFrame(desenhar)// realiza a função a cada 0,5 segundos
}

let personagem = {
    x : 40,
    y : 340,
    w : 40,
    h : 60,
    color : "yellow",
}

let vertical = 0;
let gravidade = 0.1;
let chao = true

function pulo(){ //inicializa o pulo
    if(chao){
        vertical = -6
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
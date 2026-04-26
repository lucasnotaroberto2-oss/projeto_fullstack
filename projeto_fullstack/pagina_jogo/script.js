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
    quadrado(ctx,quadrado_teste)
    requestAnimationFrame(desenhar)// realiza a função a cada 60 frames
}

let quadrado_teste = {
    x : 40,
    y : 340,
    w : 40,
    h : 60,
    color : "yellow"
}
document.addEventListener("keydown",function(evento){
    var tecla = evento.key;
    var velocidadey = 5 
    var velocidadex = 5
    var limite_pulo = 300
    //limita o personagem dentro do canvas
    if(tecla == "s" && quadrado_teste.y == 340){velocidadey = 0}
    if(tecla == "w" && quadrado_teste.y == 0){velocidadey = 0}
    if(tecla == "a" && quadrado_teste.x == 0){velocidadex = 0}
    if(tecla == "d" && quadrado_teste.x == 560){velocidadex = 0}
    //pulo
    if(tecla == "w"){
        while(quadrado_teste.y>=280){
            quadrado_teste.y -= velocidadey
        }
    }
    //movimento
    if(tecla == "d"){ quadrado_teste.x += velocidadex }
    if(tecla == "a"){ quadrado_teste.x -= velocidadex }
    if(tecla == "s"){ quadrado_teste.y += velocidadey }
})


desenhar()
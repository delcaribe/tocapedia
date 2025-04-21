const aniBig_1 = {
    "distancias": [
        134,
        107,
        125,
        116,
        111.5,
        113.3,
        112.4,
        112.85
    ],
    "tiempos": [
        1056,
        700,
        600,
        400,
        500,
        600,
        700,
        1200
    ],
    "tiemposTotal": 3250
}
const aniBig_2 = {
    "distancias": [
        117.5,
        70.25,
        93.875,
        82.0625,
        87.91625,
        85
    ],
    "tiempos": [
        960,
        864,
        432,
        600,
        850,
        1000
    ],
    "tiemposTotal": 3900
}
var archimedes1 = {
    cantidad:3,
    habilitado:true,
    reloadButton:document.getElementById('fluids_5_archimedes_1_reload'),
    botonBolas:{sprite:SVG('#archimedes1_botonBolas'),dom:document.getElementById('archimedes1_botonBolas')},
    status:0,
    textos:[],
    liquidoYenvase:[],
    liquidoB:[],
    tags:[],
    bola:[],
    yBolas:{small:65,big:10},
    yAniBolas:{
        small:{entrada:98.6,final:224},
        big:{entrada:80,final:170},
    },
    xBotonBolas:[280,530,778,-200],
    tiempo:{delayNvoStatus:1300,aire:350,aguaSmall:1600},
    aniBolasBig:[
        {},
        aniBig_1,
        aniBig_2,
    ]

    // draggersYready:167,
    // draggersXready:[90,50,10],
    // draggersXlimits:[448,700,948],
    // draggerSprite:[],
}
const conviertePuntos = (inicial,final,porcentajes,tiempoRef)=>{
    let desplazamiento = final - inicial
    let distancias = []
    let tiempos = []
    let anterior,difPorcentual,otrotiempo
    let tiemposTotal = 0
    for(let i=0;i<porcentajes.length;i++){
        distancias.push(inicial + desplazamiento * porcentajes[i] / 100)
        if(i == 0){
            anterior = 0 
        }else{
            anterior = porcentajes[i-1]
        }
        difPorcentual = Math.abs(porcentajes[i] - anterior)
        otrotiempo = Math.round(tiempoRef * difPorcentual / 100)
        tiempos.push(otrotiempo)
        tiemposTotal += otrotiempo
    }
    return {distancias:distancias,tiempos:tiempos,tiemposTotal:tiemposTotal}
}

for(let i=0;i<archimedes1.cantidad;i++){
    /*let moverBolas =(x,y)=>{
        archimedes1.bola[i].small.x(x+10)
        archimedes1.bola[i].small.y(y+(230.44-167))
        archimedes1.bola[i].big.x(x+40)
        archimedes1.bola[i].big.y(y+8)
    }*/
    archimedes1.textos.push(document.getElementById('archimedes_1_text'+(i+2)))
    archimedes1.liquidoYenvase.push(SVG('#archimedes1_liquidoyEnvase_'+i))
    archimedes1.liquidoB.push(SVG('#archimedes1_liquidoB_'+i))
    archimedes1.bola.push({small:SVG('#archimedes1_ballSmall_'+i),big:SVG('#archimedes1_ballBig_'+i)})
    archimedes1.tags.push(SVG('#archimedes1_elTag_'+i))
    // archimedes1.draggerSprite.push(toDragXY('archimedes1_dragger_'+i,{x:archimedes1.draggersXready[i],x2:archimedes1.draggersXlimits[i],y:0,y2:262},0,moverBolas,false,false,false))
}

// archimedes1.aniBolasBig[1] =  conviertePuntos(archimedes1.yAniBolas.big.entrada,archimedes1.yAniBolas.big.final,[60,55,57.5,56.25,56.87],archimedes1.tiempo.aguaSmall*0.9)
// archimedes1.aniBolasBig[1] =  conviertePuntos(archimedes1.yAniBolas.big.entrada,archimedes1.yAniBolas.big.final,[60,50,40,45],archimedes1.tiempo.aguaSmall*1.1)
// archimedes1.aniBolasBig[1] =  conviertePuntos(archimedes1.yAniBolas.big.entrada,archimedes1.yAniBolas.big.final,[60,30,50,40,35,37,36,36.5],archimedes1.tiempo.aguaSmall*1.1)
// archimedes1.aniBolasBig[2] =  conviertePuntos(archimedes1.yAniBolas.big.entrada-15,archimedes1.yAniBolas.big.final,[50,5,27.5,16.25,21.825],archimedes1.tiempo.aguaSmall*1.2)


// for(let i=0;i<archimedes1.cantidad;i++){archimedes1.draggers[i].sprite.toDragXY()}
archimedes1.reloadButton.addEventListener("click", function(){
    start_archimedes1()
})
archimedes1.botonBolas.dom.addEventListener("click", function(){
    archimedes1_caerBolas()
})
function archimedes1_caerBolas(){
    // let delay = 1300
    // let aire = 350,aguaSmall = 1600
    let proseguir=()=>{
        if(archimedes1.status==2){archimedes1.reloadButton.classList.remove("d-none")}
        if(archimedes1.status < 3){archimedes1.habilitado = true}
        archimedes1.status++
        archimedes1_textos()     
        archimedes1_liquidosyEnvases()
        archimedes1_botonBolas()
        archimedes1.bola[archimedes1.status-1].small.timeline().finish()
        archimedes1.bola[archimedes1.status-1].big.timeline().finish()
    }
    if(archimedes1.habilitado){
        let esperaNuevoStatus = 1
        // let dyBig = (archimedes1.yAniBolas.big.final - archimedes1.yAniBolas.big.entrada)
        let dtPuntos
        archimedes1.habilitado = false
        archimedes1.botonBolas.sprite.x(archimedes1.xBotonBolas[3])
        let big = archimedes1.bola[archimedes1.status].big
        let small = archimedes1.bola[archimedes1.status].small
        if(archimedes1.status == 0){
            // let agua = 1600
            small.animate(archimedes1.tiempo.aire,0,'now').y(archimedes1.yAniBolas.small.entrada).animate(archimedes1.tiempo.aguaSmall,0,'now').y(archimedes1.yAniBolas.small.final)
            big.animate(archimedes1.tiempo.aire,0,'now').y(archimedes1.yAniBolas.big.entrada).animate(archimedes1.tiempo.aguaSmall,0,'now').y(archimedes1.yAniBolas.big.final)
            esperaNuevoStatus = archimedes1.tiempo.delayNvoStatus + archimedes1.tiempo.aire + archimedes1.tiempo.aguaSmall
        }else if(archimedes1.status == 1){
            // let aguaSmall = 1600
            small.animate(archimedes1.tiempo.aire,0,'now').y(archimedes1.yAniBolas.small.entrada).animate(archimedes1.tiempo.aguaSmall*1.2,0,'now').y(archimedes1.yAniBolas.small.final)
            // puntosBig = [
                //     {porcentaje:80,tiempo:archimedes1.tiempo.aguaSmall*0.8},
                //     {porcentaje:20,tiempo:archimedes1.tiempo.aguaSmall*0.6},
                //     {porcentaje:60,tiempo:archimedes1.tiempo.aguaSmall*0.4},
            //     {porcentaje:30,tiempo:archimedes1.tiempo.aguaSmall*0.3},
            //     {porcentaje:55,tiempo:archimedes1.tiempo.aguaSmall*0.25},
            //     {porcentaje:48,tiempo:archimedes1.tiempo.aguaSmall*0.13},
            //     {porcentaje:50,tiempo:archimedes1.tiempo.aguaSmall*0.02},
            // ]
            //distancias,tiempos
            // let losPorcg = [80,30,60,30,55,37.5,52,48,50]
            
            console.log(dtPuntos)
            big.animate(archimedes1.tiempo.aire).y(archimedes1.yAniBolas.big.entrada)
            // big.animate(dtPuntos.tiempos[0],0,'after').y(dtPuntos.distancias[0])
            // big.animate(dtPuntos.tiempos[1],0,'after').y(dtPuntos.distancias[1])
            for(let i=0;i<archimedes1.aniBolasBig[1].tiempos.length;i++){
                big.animate(archimedes1.aniBolasBig[1].tiempos[i],0,'after').y(archimedes1.aniBolasBig[1].distancias[i])
            }
            
            // big.animate(archimedes1.tiempo.aire).y(archimedes1.yAniBolas.big.entrada).animate(dtPuntos.tiempos[0]).y(dtPuntos.distancias[0]).animate(dtPuntos.tiempos[1]).y(dtPuntos.distancias[1]).animate(dtPuntos.tiempos[2]).y(dtPuntos.distancias[2]).animate(dtPuntos.tiempos[3]).y(dtPuntos.distancias[3]).animate(dtPuntos.tiempos[4]).y(dtPuntos.distancias[4]).animate(dtPuntos.tiempos[5]).y(dtPuntos.distancias[5]).animate(dtPuntos.tiempos[6]).y(dtPuntos.distancias[6]).animate(dtPuntos.tiempos[7]).y(dtPuntos.distancias[7]).animate(dtPuntos.tiempos[8]).y(dtPuntos.distancias[8])
            /*
            dtPuntos = conviertePuntos(archimedes1.yAniBolas.big.entrada,archimedes1.yAniBolas.big.final,[80,20],archimedes1.tiempo.aguaSmall)
            
            big.animate(archimedes1.tiempo.aire).y(archimedes1.yAniBolas.big.entrada).animate(dtPuntos.tiempos[0]).y(dtPuntos.distancias[0]).animate(dtPuntos.tiempos[1]).y(dtPuntos.distancias[1])
            */
            
            esperaNuevoStatus = archimedes1.aniBolasBig[1].tiemposTotal + archimedes1.tiempo.delayNvoStatus
        }else if(archimedes1.status == 2){
            small.animate(archimedes1.tiempo.aire,0,'now').y(archimedes1.yAniBolas.small.entrada).animate(archimedes1.tiempo.aguaSmall*1.4,0,'now').y(archimedes1.yAniBolas.small.final)
            big.animate(archimedes1.tiempo.aire).y(archimedes1.yAniBolas.big.entrada)
            for(let i=0;i<archimedes1.aniBolasBig[2].tiempos.length;i++){
                big.animate(archimedes1.aniBolasBig[2].tiempos[i],0,'after').y(archimedes1.aniBolasBig[2].distancias[i])
            }
            esperaNuevoStatus = archimedes1.aniBolasBig[2].tiemposTotal + archimedes1.tiempo.delayNvoStatus
        }
        setTimeout(function() {
            proseguir()
        },esperaNuevoStatus)
    }
}
function archimedes1_liquidosyEnvases(){
    //archimedes1_liquidoyEnvase_0
    // for(let i=0;i<archimedes1.cantidad;i++){
    let laOpacidad = 0.4
    for(let i=0;i<archimedes1.cantidad;i++){
        /*if(archimedes1.status==i){
            archimedes1.draggerSprite[i].x(archimedes1.draggersXready[i])
        }else{
            archimedes1.draggerSprite[i].x(-200)
        }*/
        if(archimedes1.status>=i){
            archimedes1.liquidoYenvase[i].animate(300,0,'now').attr('opacity',1)
            archimedes1.tags[i].animate(300,0,'now').attr('opacity',1)
            archimedes1.liquidoB[i].animate(300,0,'now').attr('opacity',0.4)
            archimedes1.bola[i].small.attr('opacity',1)
            archimedes1.bola[i].big.attr('opacity',1)
        }else{
            archimedes1.liquidoYenvase[i].attr('opacity',laOpacidad)
            archimedes1.tags[i].attr('opacity',laOpacidad)
            archimedes1.liquidoB[i].attr('opacity',0)
            archimedes1.bola[i].small.attr('opacity',laOpacidad)
            archimedes1.bola[i].big.attr('opacity',laOpacidad)
        }
    }
}
function archimedes1_botonBolas(){
    archimedes1.botonBolas.sprite.x(archimedes1.xBotonBolas[archimedes1.status])
}
function archimedes1_bolas(){
    for(let i=0;i<archimedes1.cantidad;i++){
        archimedes1.bola[i].small.y(archimedes1.yBolas.small)
        archimedes1.bola[i].big.y(archimedes1.yBolas.big)
    }
}
function archimedes1_textos(){
    for(let i=0;i<archimedes1.cantidad;i++){
        if(archimedes1.status>i){
            archimedes1.textos[i].classList.remove("d-none")
        }else{
            archimedes1.textos[i].classList.add("d-none")
        }
    }
}
function start_archimedes1(){
    archimedes1.reloadButton.classList.add("d-none")
    archimedes1.status = 0
    archimedes1.habilitado = true
    archimedes1_textos()     
    archimedes1_liquidosyEnvases()     
    archimedes1_bolas()
    archimedes1_botonBolas()
}


//2
var archimedes2 = {
    // slider:SVG('#ach2_sliderView'),
    // slider:toDragY('ach2_sliderPseudo',{x:395,x2:435,y:50,y2:500},0,false),
    sliderView:SVG('#ach2_sliderView'),
    todosLosGlobos:SVG('#ach2_todosLosGlobos'),
    submarino:SVG('#archimedes_2_elSubmarino'),
    elCable:SVG('#ach2_elCable'),
    cantGlobos:14,
    cadaGlobo:[],
    porcentajes:{globo:0,sub:0},
    profundidad:0,
    //la diferencia de porcentajes en la que ya no se mueve el submarino
    limitesSub:{x:655,yMin:8,yMax:192},
    scanSub:{intervalo:60,avance:7,tolerancia:0.1},
    formas:[
        {porcentaje:0,puntos:[0,21,2,9,2,19,6,28,23,14,24,16,71,60,68]},
        {porcentaje:12,puntos:[1,21,2,24,3,31,-9,47,2,30,18,-14,73,41,70]},
        {porcentaje:26,puntos:[2,21,2,18,1,21,-32,46,-22,29.9,18,-2,70,42,67]},
        {porcentaje:39,puntos:[2,21,2,25,1,14,-37.4,42,-36,36.5,2,-5.2,65,47,57]},
        {porcentaje:51,puntos:[2,21,2,25,1,14,-54,42,-52,35,3,3,54,47,51]},
        {porcentaje:63.5,puntos:[1,21,1,34,0,7,-56,34,-61,30,-6,9,48,56,37]},
        {porcentaje:76,puntos:[2,21,2,39,1,-2,-61,28,-72,21,-7,16,29,60,25]},
        {porcentaje:87.5,puntos:[2,21,2,47,0,-2,-65,24,-75,20,-8,20,11,64,7]},
        {porcentaje:100,puntos:[2,21,2,47,0,12,-64,30,-81,12,-11,37,-11,59,-10]},
    ],
    // sliderPseudo:toDragY('ach2_sliderPseudo',{x:395,y:185,y2:252},0,moverView),
}
for(let i=0;i<archimedes2.cantGlobos;i++){
    // archimedes2.cadaGlobo.push(document.getElementById('ach2_globo_'+i))
    archimedes2.cadaGlobo.push(SVG('#ach2_globo_'+i))
}
archimedes2.separacion = 100/(archimedes2.cantGlobos - 1)

let scanProfundidad =()=>{
    let diferencia = archimedes2.porcentajes.globo - archimedes2.porcentajes.sub
    // console.log(diferencia)
    if(Math.abs(diferencia) > archimedes2.scanSub.tolerancia){
        let aumento = (diferencia * archimedes2.scanSub.avance)/100
        let nvoPorcentaje = archimedes2.porcentajes.sub + aumento
        moverSubConGlobo(nvoPorcentaje)
    }
}
let cambiarCable =()=>{
    //archimedes2.porcentajes.sub
    let puntosAcadena=(p)=>{
        //"m 2,97 c 0,0 12,0 21,2 09,2 19,6 28,23 14,24 16,71 60,68"
        let resultado = "m 2,97 c 0,0 12,"+p[0]
        for(let i=1;i<p.length/2;i++){
            resultado += " "+p[(i*2)-1]+","+p[i*2]
        }
        return resultado
    }
    let interpolarPuntos=(p1,p2,inf,sup,actual)=>{
        let resultado = []
        for(let i=0;i<p1.length;i++){
            resultado.push(equation_rect_twoPoints({x:inf,y:p1[i]},{x:sup,y:p2[i]},actual))
        }
        return resultado
    }
    let exacto = -1,inferior = -1, superior = -1,puntos = false
    for(let i=0;i<archimedes2.formas.length;i++){
        if(archimedes2.porcentajes.sub == archimedes2.formas[i].porcentaje){
            exacto = i
            break
        }else if(i < (archimedes2.formas.length - 1)){
            if(archimedes2.porcentajes.sub > archimedes2.formas[i].porcentaje && archimedes2.porcentajes.sub < archimedes2.formas[i+1].porcentaje){
                inferior = i
                superior = i + 1
            }
        }
    }
    if(exacto >= 0){
        puntos = archimedes2.formas[exacto].puntos
    }else if(inferior >= 0){
        puntos = interpolarPuntos(archimedes2.formas[inferior].puntos,archimedes2.formas[superior].puntos,archimedes2.formas[inferior].porcentaje,archimedes2.formas[superior].porcentaje,archimedes2.porcentajes.sub)
    }
    // console.log('exacto:'+exacto+' inferior:'+inferior+' superior:'+superior)
    // console.log(puntos)
    if(puntos){
        let formaCable = puntosAcadena(puntos)
        archimedes2.elCable.attr('d',formaCable)
    }       
}
let moverSubConGlobo =(nvoPorcentaje)=>{
    let profundidad = equation_rect_twoPoints({x:0,y:archimedes2.limitesSub.yMax},{x:100,y:archimedes2.limitesSub.yMin},nvoPorcentaje)
    archimedes2.todosLosGlobos.transform({translateX:archimedes2.limitesSub.x,translateY: profundidad})
    archimedes2.submarino.y(profundidad)
    archimedes2.porcentajes.sub = nvoPorcentaje
    archimedes2.profundidad = profundidad
    cambiarCable()
}
let moverView =(y)=>{
    archimedes2.sliderView.y(y+5)
    let pctg = equation_rect_twoPoints({x:185,y:100},{x:235,y:0},y)
    
    // console.log(y.toFixed(2)+' '+pctg.toFixed(2))
    inflarGlobos(pctg)
    // let posicionNueva = equation_rect_twoPoints({x:0,y:archimedes2.limitesSub.yMax},{x:100,y:archimedes2.limitesSub.yMin},pctg)
    // moverSubConGlobo(posicionNueva)
}
archimedes2.sliderPseudo = toDragY('ach2_sliderPseudo',{x:395,y:185,y2:252},0,moverView)

setInterval(scanProfundidad, archimedes2.scanSub.intervalo)

/*
var mostrar = 2
for(let i=0;i<archimedes2.cantGlobos;i++){
    if(i == mostrar){
        // archimedes2.cadaGlobo[i].className = "d-nonex"
        archimedes2.cadaGlobo[i].opacity(1)
    }else{
        archimedes2.cadaGlobo[i].opacity(0)
        // archimedes2.cadaGlobo[i].className = "d-none"
    }
}
*/

function inflarGlobos(pctg){
    archimedes2.porcentajes.globo = pctg
    let mostrar = 0,inferior,superior
    /*let masCercano =(inf,sup,iter)=>{
        let resultado = iter
        let distInf = pctg - inf
        let distSup = sup - pctg
        if(distSup < distInf){resultado = iter + 1}
        return resultado
    }*/
    for(let i=0;i<(archimedes2.cantGlobos-1);i++){
        inferior = i * archimedes2.separacion
        superior = (i+1) * archimedes2.separacion
        if(pctg == inferior){
            mostrar = i
            break
        }else if(pctg == superior){
            mostrar = i + 1
            break
        }else if(pctg > inferior && pctg < superior){
            // mostrar = masCercano(inferior,superior,i)
            mostrar = closerExtreme(inferior,superior,pctg,i)
            break
        }
    }
    for(let i=0;i<archimedes2.cantGlobos;i++){
        if(i == mostrar){
            archimedes2.cadaGlobo[i].opacity(1)
        }else{
            archimedes2.cadaGlobo[i].opacity(0)
        }
    }
    // console.log('%:'+pctg.toFixed(2)+' separacion: '+archimedes2.separacion+' mostrar:'+mostrar)
}
function start_archimedes2(){    
    inflarGlobos(0)
    cambiarCable()
}


//3
const callbackOnDrag = false,callbackOnStart = false,callbackOnEnd = false,conditionDrag = false
var archimedes3 = {
    reloadButton:document.getElementById('fluids_5_archimedes_3_reload'),
    elMangoDOM:document.getElementById('arch3_mangoPseudo'),
    balanza:SVG('#arch3_balanza'),
    rotables:SVG('#arch3_rotables'),
    rotaCorona:SVG('#arch3_rotaCorona'),
    rotaLingote:SVG('#arch3_rotaLingote'),
    posiciones:{min:5,max:125},
    status:0,
    // elMango:toDragY('arch3_mangoPseudo',{x:745,y:0,y2:100},0,callbackOnDrag,callbackOnStart,callbackOnEnd,conditionDrag),
    text2:document.getElementById('archimedes_3_text2'),
}
console.log(archimedes3.balanza.children())
const archimedes3_bajarBalanza =()=>{
    archimedes3.status = 1
    archimedes3.elMangoDOM.classList.remove("cu_pointer")
    let tiempo = 1200
    let textoyreload =()=>{
        archimedes3.reloadButton.classList.remove("d-none")
        archimedes3.text2.classList.remove("d-none")
    }
    archimedes3.balanza.animate(tiempo).transform({
        // rotate: 125,
        translateX: 663,
        translateY: archimedes3.posiciones.max,
        // scale: 3 
    })
    archimedes3.rotables.animate(tiempo/2,tiempo/2,'now').transform({
        // origin:{x: 115, y: 0},
        translateX: -2,
        translateY: -3,
        rotate:7,
    })
    archimedes3.rotaCorona.animate(tiempo/2,tiempo/2,'now').transform({
        // origin:{x: 115, y: 0},
        translateX: 2.5,
        translateY: 1,
        rotate:-7,
    })
    archimedes3.rotaLingote.animate(tiempo/2,tiempo/2,'now').transform({
        // origin:{x: 115, y: 0},
        translateX: 3.5,
        translateY: 1,
        rotate:-7,
    })
    setTimeout(textoyreload, tiempo*1.25)
}
archimedes3.reloadButton.addEventListener("click", function(){
    start_archimedes3()
})
archimedes3.elMangoDOM.addEventListener("click", function(){
    if(archimedes3.status == 0){
        archimedes3_bajarBalanza()
    }
})
function start_archimedes3(){
    archimedes3.status = 0
    archimedes3.reloadButton.classList.add("d-none")
    archimedes3.text2.classList.add("d-none")
    // archimedes3.elMangoDOM.className = 'cu_pointer'
    archimedes3.elMangoDOM.classList.add("cu_pointer")
    archimedes3.balanza.transform({
        translateX: 663,
        translateY: archimedes3.posiciones.min,
    })
    archimedes3.rotables.transform({
        // origin:{x: 115, y: 0},
        translateX: 0,
        translateY:0,
        rotate:0,
    })
    archimedes3.rotaCorona.transform({
        // origin:{x: 115, y: 0},
        translateX: 0,
        translateY:0,
        rotate:0,
    })
    archimedes3.rotaLingote.transform({
        // origin:{x: 115, y: 0},
        translateX: 0,
        translateY:0,
        rotate:0,
    })
    console.log(archimedes3.rotables.transform())
}
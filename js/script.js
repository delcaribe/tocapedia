// var draw = SVG().addTo('body').size(300, 300)
// var draw = SVG().addTo('#someId').size('100%', '100%')
// var rect = draw.rect(100, 100).attr({ fill: '#f06' })
var cuadrito = SVG('#cuadroPetit').fill('#f06')
cuadrito.x(250)
// cuadrito.opacity(0.5)
var elRealod1 = SVG('#act1_realod')
var pointC = SVG('#pointC')
var controlador1 = SVG('#controlador1')
var controlador2 = SVG('#controlador2')
var controlador3 = SVG('#controlador3')
var controlador4 = SVG('#controlador4')
var pointD3 = SVG('#pointD3')

var slider1 = 0,slider2 = 0,slider3 = 0,slider4 = 0
 
var elTexto = SVG('#elTexto')
// elRealod1.transform({translate: {x: -50, y: -50}})
// let runner = cuadrito.animate()
// cuadrito.animate(5000, 1000, 'now').move(150, 150)
// cuadrito.animate(4000, 1500, 'now').attr({ fill: '#f5e342' })
// cuadrito.animate(8000, 2000, 'now').opacity(1)
cuadrito.draggable()
elRealod1.draggable()
pointC.draggable()
controlador1.draggable()
controlador2.draggable()
controlador3.draggable()
controlador4.draggable()
pointD3.draggable()
puntos_pointD3 = losPuntosDeCurva('laCurva',100)
const stage = document.getElementById('experimento1')
const size = getSVGStageSize(stage)
// Some constraintsGen (x, y, width, height)
// const constraintsGen = new SVG.Box(0, 0, 962, 340)
const constraintsGen = new SVG.Box(0, 0, size.width, size.height)
/*
elRealod1.on('dragmove.namespace', function (event) {
// event.detail.event hold the given data explained below
// this == rect
    document.getElementById("elTexto").innerHTML=Math.round(elRealod1.x())+' '+Math.round(elRealod1.y());
})
*/

/*
const drag_grid = (e,resolucion) => {
    // let resolucion = 10
    const { handler, box } = e.detail
    e.preventDefault()
    let x = box.x - (box.x % resolucion)
    let y = box.y - (box.y % resolucion)
    // handler.move(box.x - (box.x % resolucion), box.y - (box.y % resolucion))
    handler.move(x,y)
}
const drag_grid_box = (e,resolucion,limites) => {
    const { handler, box } = e.detail
    e.preventDefault()
    let x = box.x - (box.x % resolucion)
    let y = box.y - (box.y % resolucion)
    let corregido = corregirXY(x,y,box.x2,box.y2,box.w,box.h,limites)
    handler.move(corregido.x, corregido.y)
}
const corregirXY = (x,y,x2,y2,w,h,limites) => {
    if (x < limites.x) {x = limites.x}
    if (y < limites.y) {y = limites.y}
    if (x2 > limites.x2) {x = limites.x2 - w}
    if (y2 > limites.y2) {y = limites.y2 - h}
    return {x:x,y:y}
}
const drag_box = (e,limites) => {
    const { handler, box } = e.detail
    e.preventDefault()
    let { x, y } = box
    let corregido = corregirXY(x,y,box.x2,box.y2,box.w,box.h,limites)
    handler.move(corregido.x , corregido.y)
}
*/

elRealod1.on('dragmove.namespace', (e) => {
    // In case your dragged element is a nested element,
    // you are better off using the rbox() instead of bbox()
    /*
    const { handler, box } = e.detail
    e.preventDefault()
    let { x, y } = box
    let corregido = corregirXY(x,y,box.x2,box.y2,box.w,box.h,constraintsGen)
    handler.move(corregido.x , corregido.y)
    */
    drag_box(e,constraintsGen)
//   handler.move(x - (x % 50), y - (y % 50))
})
cuadrito.on('dragmove.namespace', (e) => {
    let resolucion = 20
    // drag_box(e,constraintsGen)
    drag_grid_box(e,resolucion,constraintsGen)
    // const { handler, box } = e.detail
    // e.preventDefault()
    // handler.move(box.x - (box.x % resolucion), box.y - (box.y % resolucion))
})
pointC.on('dragmove.namespace', (e) => {drag_box(e,constraintsGen)})
controlador1.on('dragmove.namespace', (e) => {
    // drag_h(e,new SVG.Box(50,50,210,5))
    drag_h(e,{x:50,x2:260,y:50})
    slider1 = variable_dePosicion(controlador1.x(),50,2)
    // document.getElementById('campo1').innerHTML=Math.round((controlador1.x()-50)/2)
    document.getElementById('campo1').innerHTML=Math.round(slider1)
})
controlador2.on('dragmove.namespace', (e) => {
    // drag_h_grid(e,new SVG.Box(50,100,210,5),50)
    drag_h_grid(e,{x:50,x2:260,y:100},50)
    slider2 = variable_dePosicion(controlador2.x(),50,50)
    // document.getElementById('campo2').innerHTML=Math.round((controlador2.x()-50)/50)
    document.getElementById('campo2').innerHTML=Math.round(slider2)
})
controlador3.on('dragmove.namespace', (e) => {
    drag_v(e,{y:145,y2:335,x:50})
    // document.getElementById('campo3').innerHTML=Math.round((controlador3.y()-145)/1.8)
    slider3 = variable_dePosicion(controlador3.y(),145,1.8)
    document.getElementById('campo3').innerHTML=Math.round(slider3)
})
controlador4.on('dragmove.namespace', (e) => {
    drag_v_grid(e,{y:160,y2:340,x:100},20)
    // document.getElementById('campo4').innerHTML=Math.round((controlador4.y()-145)/20)
    slider4 = variable_dePosicion(controlador4.y(),160,20)
    document.getElementById('campo4').innerHTML=Math.round(slider4)
})
pointD3.on('dragmove.namespace', (e) => {
    drag_path(e,puntos_pointD3,{x:5,y:5})
    // slider4 = variable_dePosicion(controlador4.y(),160,20)
    // document.getElementById('campo4').innerHTML=Math.round(slider4)
})

/*
let laCurva = document.getElementById('laCurva')
let longitud = laCurva.getTotalLength()
console.log(longitud)
let cantidadPuntos = 10
let paso = longitud / (cantidadPuntos - 1)
let currentPoint = laCurva.getPointAtLength(10)
console.log(currentPoint)
let puntos = []
let distanciaActual = 0
let elPunto
for (let i=0;i<cantidadPuntos;i++){
    distanciaActual = i*paso
    elPunto = laCurva.getPointAtLength(distanciaActual)
    puntos.push(elPunto)
}
let unPuntoDado = {x:510,y:100}
console.log('punto mas cercano :'+puntoMasCercano(puntos,unPuntoDado))
*/

    

// makeDraggable(document.getElementById('pointD'), 'experimento1', { 
//     type: 'free' 
// });
/*
makeDraggable(document.getElementById('lasBolas'), 'experimento1', { 
    type: 'free' 
    type: 'path', 
    pathId: 'laCurva' 
});
*/

    


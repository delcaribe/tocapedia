function getSVGStageSize(svgElement) {
    if (!svgElement) {return null} // Or throw an error, depending on your needs
    const viewBox = svgElement.getAttribute('viewBox')
    if (viewBox) {
        const viewBoxValues = viewBox.split(' ').map(parseFloat)
        if (viewBoxValues.length === 4) {
            return {
                width: viewBoxValues[2],
                height: viewBoxValues[3],
            }
        }
    }
    // If no viewBox, check for width and height attributes
    const width = svgElement.getAttribute('width')
    const height = svgElement.getAttribute('height')
    if (width && height) {
        //If the values have units, remove them.
        const numericWidth = parseFloat(width)
        const numericHeight = parseFloat(height)
        if(!isNaN(numericWidth) && !isNaN(numericHeight)){
            return {
                width: numericWidth,
                height: numericHeight,
            }
        }
    }

    // If neither viewBox nor width/height are set, return the clientWidth and clientHeight.
    return {
        width: svgElement.clientWidth,
        height: svgElement.clientHeight,
    }

}

const drag_grid = (e,resolucion) => {
    // let resolucion = 10
    const { handler, box } = e.detail
    e.preventDefault()
    let x = box.x - (box.x % resolucion)
    let y = box.y - (box.y % resolucion)
    // handler.move(box.x - (box.x % resolucion), box.y - (box.y % resolucion))
    handler.move(x,y)
}
const corregirUna = (actual,actual2,min,max,dimension) => {
    if (actual < min) {actual = min}
    if (actual2 > max) {actual = max - dimension}
    return actual
}
const corregirXY_bkp = (x,y,x2,y2,w,h,limites) => {
    if (x < limites.x) {x = limites.x}
    if (x2 > limites.x2) {x = limites.x2 - w}
    if (y < limites.y) {y = limites.y}
    if (y2 > limites.y2) {y = limites.y2 - h}
    return {x:x,y:y}
}
const corregirXY = (x,y,x2,y2,w,h,limites) => {
    // if (x < limites.x) {x = limites.x}
    // if (x2 > limites.x2) {x = limites.x2 - w}
    // if (y < limites.y) {y = limites.y}
    // if (y2 > limites.y2) {y = limites.y2 - h}
    return {x:corregirUna(x,x2,limites.x,limites.x2,w),y:corregirUna(y,y2,limites.y,limites.y2,h)}
}
const drag_grid_box = (e,resolucion,limites) => {
    const { handler, box } = e.detail
    e.preventDefault()
    let x = box.x - (box.x % resolucion)
    let y = box.y - (box.y % resolucion)
    let corregido = corregirXY(x,y,box.x2,box.y2,box.w,box.h,limites)
    handler.move(corregido.x, corregido.y)
}
const drag_box = (e,limites) => {
    // console.log(e.detail)
    const { handler, box } = e.detail
    e.preventDefault()
    let { x, y } = box
    let corregido = corregirXY(x,y,box.x2,box.y2,box.w,box.h,limites)
    handler.move(corregido.x , corregido.y)
}
const drag_h = (e,limites) => {
    //limites={x,x2,y}
    // console.log(e.detail)
    const { handler, box } = e.detail
    e.preventDefault()
    let { x, y } = box
    // let corregido = corregirXY(x,y,box.x2,box.y2,box.w,box.h,limites)
    handler.move(corregirUna(x,box.x2,limites.x,limites.x2,box.w) , limites.y)
}
const drag_h_grid = (e,limites,resolucion) => {
    //limites={x,x2,y}
    const { handler, box } = e.detail
    e.preventDefault()
    let { x, y } = box
    // let corregido = corregirXY(x,y,box.x2,box.y2,box.w,box.h,limites)
    let xc = corregirUna(x,box.x2,limites.x,limites.x2,box.w)
    let xd = xc - (xc % resolucion)
    handler.move(xd , limites.y)
}
const drag_v = (e,limites) => {
    //limites={y,y2,x}
    const { handler, box } = e.detail
    e.preventDefault()
    let { x, y } = box
    // let corregido = corregirXY(x,y,box.x2,box.y2,box.w,box.h,limites)
    handler.move(limites.x,corregirUna(y,box.y2,limites.y,limites.y2,box.h))
}
const drag_v_grid = (e,limites,resolucion) => {
    const { handler, box } = e.detail
    e.preventDefault()
    let { x, y } = box
    // let corregido = corregirXY(x,y,box.x2,box.y2,box.w,box.h,limites)
    let yc = corregirUna(y,box.y2,limites.y,limites.y2,box.h)
    let yd = yc - (yc % resolucion)
    handler.move(limites.x,yd)
}
const variable_dePosicion = (posicion,coordInicial,desplazamiento) => {
    let resultado = (posicion-coordInicial)/desplazamiento
    return resultado
    //Math.round()
}

function losPuntosDeCurva(idCurva,cantidadPuntos) {
    let laCurva = document.getElementById(idCurva)
    let longitud = laCurva.getTotalLength()
    let paso = longitud / (cantidadPuntos - 1)
    let puntos = []
    let distanciaActual = 0
    let elPunto
    for (let i=0;i<cantidadPuntos;i++){
        distanciaActual = i*paso
        elPunto = laCurva.getPointAtLength(distanciaActual)
        puntos.push(elPunto)
    }
    return puntos
}
function calcularDistancia(punto1, punto2) {
    const deltaX = punto2.x - punto1.x
    const deltaY = punto2.y - punto1.y
    const distancia = Math.sqrt(deltaX * deltaX + deltaY * deltaY)  
    return distancia
  }
function puntoMasCercano(losPuntos,especimen) {
    let resultado = 0
    let distancias = []
    for (let i=0;i<losPuntos.length;i++){
        distancias.push(calcularDistancia(losPuntos[i],especimen))
    }
    let indiceMenor = 0
    let laMenor = distancias[indiceMenor]
    for (let i=0;i<distancias.length;i++){
        if(distancias[i] < laMenor){
            laMenor = distancias[i]
            indiceMenor = i
        }
    }
    return indiceMenor 
}
const drag_path = (e,losPuntos,correccion) => {
    // let resolucion = 10
    const { handler, box } = e.detail
    e.preventDefault()
    let { x, y } = box
    let indiceCercano = puntoMasCercano(losPuntos,box)
    let crrx = 0,crry = 0
    if(correccion){
        crrx = correccion.x
        crry = correccion.y
    }
    // handler.move(box.x - (box.x % resolucion), box.y - (box.y % resolucion))
    handler.move(losPuntos[indiceCercano].x-crrx,losPuntos[indiceCercano].y-crry)
}
function puntoDentroDeForma(forma, puntoX, puntoY) {
    const punto = forma.ownerSVGElement.createSVGPoint();
    punto.x = puntoX;
    punto.y = puntoY;
    return forma.isPointInFill(punto);
}
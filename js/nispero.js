function closerExtreme(minValue,higherValue,actualValue,smallerExtreme) {
    let resultado = smallerExtreme
    let distInf = actualValue - minValue
    let distSup = higherValue - actualValue
    if(distSup < distInf){resultado = smallerExtreme + 1}
    return resultado
}
function equation_rect_slope(point,b,x) {
    return ((point.y-b)*x/point.x)+b
}
function equation_rect_twoPoints(point1,point2,x) {
    let dP = (point2.y-point1.y)/(point2.x-point1.x)
    return dP*(x-point1.x)+point1.y
}
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
const correctOne = (actual,actual2,min,max,dimension) => {
    if (actual < min) {actual = min}
    if (actual2 > max) {actual = max - dimension}
    return actual
}
const correctXY = (x,y,x2,y2,w,h,limits) => {
    return {x:correctOne(x,x2,limits.x,limits.x2,w),y:correctOne(y,y2,limits.y,limits.y2,h)}
}
const makeItDraggable = (idElement) => {
    let theElement = SVG('#'+idElement)
    theElement.draggable()
    return theElement
}
const drag_grid_and_box = (e,limits,gridSize,callback,conditionDrag) => {
    const { handler, box } = e.detail
    e.preventDefault()
    let { x, y } = box
    if(gridSize){
        x = x - (x % gridSize)
        y = y - (y % gridSize)
    }
    let adjusted = correctXY(x,y,box.x2,box.y2,box.w,box.h,limits)
    if(conditionDrag){
        if(conditionDrag(adjusted.x , adjusted.y)){
            if(callback){
                callback(adjusted.x , adjusted.y)
            }
            handler.move(adjusted.x , adjusted.y)
        }
    }else{
        if(callback){
            callback(adjusted.x , adjusted.y)
        }
        handler.move(adjusted.x , adjusted.y)
    }
}
const toDragXY = (idElement,limits,gridSize,callbackOnDrag,callbackOnStart,callbackOnEnd,conditionDrag) => {
    let theElement = makeItDraggable(idElement)
    theElement.on('dragstart.namespace', function (event) {
        if(callbackOnStart){
            callbackOnStart()
        }
    })
    theElement.on('dragmove.namespace', (e) => {
        drag_grid_and_box(e,limits,gridSize,callbackOnDrag,conditionDrag)

    })
    theElement.on('dragend', (e) => {
        if(callbackOnEnd){
            const { handler, box } = e.detail
            e.preventDefault()
            let { x, y } = box
            callbackOnEnd(x,y)
        }        
    })
    return theElement
}
const drag_x_grid_and_box = (e,limits,gridSize,callback) => {
    const { handler, box } = e.detail
    e.preventDefault()
    let { x, y } = box

    let xx = correctOne(x,box.x2,limits.x,limits.x2,box.w)
    if(gridSize){
        xx = xx - (xx % gridSize)
    }
    if(callback){
        callback(xx)
    }
    handler.move(xx , limits.y)
}
const toDragX = (idElement,limits,gridSize,callback) => {
    let theElement = makeItDraggable(idElement)
    theElement.on('dragmove.namespace', (e) => {
        drag_x_grid_and_box(e,limits,gridSize,callback)
    })
    return theElement
}
const drag_y_grid_and_box = (e,limits,gridSize,callback,conditionDrag) => {
    const { handler, box } = e.detail
    e.preventDefault()
    let { x, y } = box
    let yy = correctOne(y,box.y2,limits.y,limits.y2,box.h)
    if(gridSize){yy = yy - (yy % gridSize)}

    if(conditionDrag){
        if(conditionDrag(yy)){
            if(callback){
                callback(yy)
            }
            handler.move(limits.x, yy)
        }
    }else{
        if(callback){
            callback(yy)
        }
        handler.move(limits.x, yy)
    }
    handler.move(limits.x, yy)
}
const toDragY = (idElement,limits,gridSize,callbackOnDrag,callbackOnStart,callbackOnEnd,conditionDrag) => {
    let theElement = makeItDraggable(idElement)
    theElement.on('dragstart.namespace', function (event) {
        if(callbackOnStart){
            callbackOnStart()
        }
    })
    theElement.on('dragmove.namespace', (e) => {
        drag_y_grid_and_box(e,limits,gridSize,callbackOnDrag,conditionDrag)
    })
    theElement.on('dragend', (e) => {
        if(callbackOnEnd){
            const { handler, box } = e.detail
            e.preventDefault()
            let { x, y } = box
            callbackOnEnd(y)
        }        
    })
    return theElement
}
const varFromPosition = (position,initCoord,maxPosition) => {
    return (position-initCoord)/maxPosition
}
function curvePoints(idCurve,numberPoints) {
    let curve = document.getElementById(idCurve)
    let long = curve.getTotalLength()
    let step = long / (numberPoints - 1)
    let result = []
    let actualDistance = 0
    let thePoint
    for (let i=0;i<numberPoints;i++){
        actualDistance = i*step
        thePoint = curve.getPointAtLength(actualDistance)
        result.push(thePoint)
    }
    return result
}
function distance(point1, point2) {
    const dX = point2.x - point1.x
    const dY = point2.y - point1.y
    return Math.sqrt(dX * dX + dY * dY) 
}
function closestPoint(points,specimen) {
    let resultado = 0
    let distancias = []
    for (let i=0;i<points.length;i++){
        distancias.push(distance(points[i],specimen))
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
const drag_path = (e,points,adjustment,callback) => {
    const { handler, box } = e.detail
    e.preventDefault()
    let closestIndex = closestPoint(points,box)
    let crrx = 0,crry = 0
    if(adjustment){
        crrx = adjustment.x
        crry = adjustment.y
    }
    let x = points[closestIndex].x-crrx
    let y = points[closestIndex].y-crry
    if(callback){callback(x,y)}
    handler.move(x,y)
}
const toDragPath = (idElement,points,adjustment,callback) => {
    let theElement = makeItDraggable(idElement)
    theElement.on('dragmove.namespace', (e) => {
        drag_path(e,points,adjustment,callback)
    })
    return theElement
}

const drag_shape = (e,theShape,adjustment,callback) => {
    const { handler, box } = e.detail
    e.preventDefault()
    let { x, y } = box
    if(isPointInSVGShape(theShape,x, y) && isPointInSVGShape(theShape,box.x2, box.y2)){
        let crrx = 0,crry = 0
        if(adjustment){
            crrx = adjustment.x
            crry = adjustment.y
        }
        if(callback){callback(x-crrx,y-crry)}
        handler.move(x-crrx,y-crry)
    }    
}
const toDragInShape = (idElement,theShape,adjustment,callback) => {
    let theElement = makeItDraggable(idElement)
    theElement.on('dragmove.namespace', (e) => {
        drag_shape(e,theShape,adjustment,callback)
    })
    return theElement
}
function isPointInSVGShape(shape, x, y) {
    const svg = shape.ownerSVGElement
    const pt = svg.createSVGPoint();
    pt.x = x;
    pt.y = y;
    return shape.isPointInFill(pt) || shape.isPointInStroke(pt);
}
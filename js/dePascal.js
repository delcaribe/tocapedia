/*
const pascal1_embolo_toDragY = () => {
    let theElement = makeItDraggable('pascal1_jeringa_embolo')
    theElement.on('dragmove.namespace', (e) => {
        const { handler, box } = e.detail
        const xFix = 356.7
        const yMin = 40
        const y2Max = 215.66
        e.preventDefault()
        let { x, y } = box
        let yy = correctOne(y,box.y2,yMin,y2Max,box.h)

        handler.move(xFix, yy)
    })
    return theElement
}
*/
function pascal1_tamanoGlobo(y){
    const limitesEmbolo = {y1:40,y2:111.768}
    const limitesRadio = {r1:60,r2:42}
    const dCy = limitesRadio.r1 - limitesRadio.r2
    const cy1 = 183
    const cy2 = cy1 + dCy
    const limitesCy = {c1:cy1,c2:cy2}
    // let rg = ((limitesRadio.r2 - limitesRadio.r1) / (limitesEmbolo.y2 - limitesEmbolo.y1)) * (y - limitesEmbolo.y1) + limitesRadio.r1
    let rg = equation_rect_twoPoints({x:limitesEmbolo.y1,y:limitesRadio.r1},{x:limitesEmbolo.y2,y:limitesRadio.r2},y)
    let cy = equation_rect_twoPoints({x:limitesEmbolo.y1,y:limitesCy.c1},{x:limitesEmbolo.y2,y:limitesCy.c2},y)
    pascal1.globo.attr('r', rg)
    pascal1.globo.attr('cy', cy)

    const porcentajetexto2 = 70
    // const dyE = limitesEmbolo.y2 - limitesEmbolo.y1
    // let porcentajeActual = y * 100 / dyE
    let porcentajeActual = equation_rect_twoPoints({x:limitesEmbolo.y1,y:0},{x:limitesEmbolo.y2,y:100},y)
    if(porcentajeActual >= porcentajetexto2 && !pascal1.mostradoTexto2){
        pascal1.text2.classList.remove("d-none")
        pascal1.mostradoTexto2 = true
    }
}
var pascal1 = {
    // reloadButton:document.getElementById('fluids_3_pascal_1_reload'),
    text2:document.getElementById('pascal_1_text2'),
    //embolo:pascal1_embolo_toDragY(), //
    globo:SVG('#pascal1_globo'),
    embolo:toDragY('pascal1_jeringa_embolo',{x:356.7,y:40,y2:215.66},0,pascal1_tamanoGlobo),
    mostradoTexto2:false,
    // emboloDOM:document.getElementById('pascal1_jeringa_embolo'),
    //status:0,//0 en espera, 1 arrastrando sin texto2, 2 arrastrando con texto 2, 3 finalizado
    /*
    llave1:document.getElementById('pascal_1_llave1'),
    llave2:document.getElementById('pascal_1_llave2'),
    pseudoWrench:document.getElementById('pascal_1_pseudoWrench'),
    patchChorros:SVG('#pascal_1_patchChorros'),
    patchWater:SVG('#pascal_1_patchWater'),
    chorros:[document.getElementById('pascal_1_chorro1'),document.getElementById('pascal_1_chorro2'),document.getElementById('pascal_1_chorro3')],
    chorroActual:0,
    chorroFrameActual:0,
    */
}
/*
pascal1.reloadButton.addEventListener("click", function(){
    start_pascal1()
})
    */
function start_pascal1(){
    // pascal1.reloadButton.classList.add("d-none")
    pascal1.text2.classList.add("d-none")
    const posInicial = 40
    // pascal1.embolo.y(posInicial)
    pascal1_tamanoGlobo(posInicial)
    // pascal1.emboloDOM.classList.add("cu_pointer")
}
function pascal1_tamanoGlobo(y){
    const limitesEmbolo = {y1:40,y2:111.768}
    const limitesRadio = {r1:60,r2:42}
    const dCy = limitesRadio.r1 - limitesRadio.r2
    const cy1 = 183
    const cy2 = cy1 + dCy
    const limitesCy = {c1:cy1,c2:cy2}
    let rg = equation_rect_twoPoints({x:limitesEmbolo.y1,y:limitesRadio.r1},{x:limitesEmbolo.y2,y:limitesRadio.r2},y)
    let cy = equation_rect_twoPoints({x:limitesEmbolo.y1,y:limitesCy.c1},{x:limitesEmbolo.y2,y:limitesCy.c2},y)
    pascal1.globo.attr('r', rg)
    pascal1.globo.attr('cy', cy)

    const porcentajetexto2 = 70
    let porcentajeActual = equation_rect_twoPoints({x:limitesEmbolo.y1,y:0},{x:limitesEmbolo.y2,y:100},y)
    if(porcentajeActual >= porcentajetexto2 && !pascal1.mostradoTexto2){
        pascal1.text2.classList.remove("d-none")
        pascal1.mostradoTexto2 = true
    }
}
var pascal1 = {
    text2:document.getElementById('pascal_1_text2'),
    globo:SVG('#pascal1_globo'),
    embolo:toDragY('pascal1_jeringa_embolo',{x:356.7,y:40,y2:215.66},0,pascal1_tamanoGlobo),
    mostradoTexto2:false,
}
function start_pascal1(){
    pascal1.text2.classList.add("d-none")
    const posInicial = 40
    pascal1_tamanoGlobo(posInicial)
}
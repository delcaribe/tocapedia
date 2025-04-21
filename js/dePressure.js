var pressure1 = {
    reloadButton:document.getElementById('fluids_2_pressure_1_reload'),
    whiteWall:SVG('#pressure_1_paredBlanca'),
    whiteWallPseudo:document.getElementById('pressure_1_paredBlancaPseudo'),
    waters:[document.getElementById('pressure_1_agua0'),document.getElementById('pressure_1_agua1')],
    forceValue:document.getElementById('pressure_1_horizontalForceValue'),
    arrows:document.getElementById('pressure_1_arrows'),
    text2:document.getElementById('pressure_1_text2')
}

pressure1.whiteWallPseudo.addEventListener("click", function(){
    pressure1_change(false)
})
pressure1.reloadButton.addEventListener("click", function(){
    pressure1_change(true)
})

function pressure1_change(start){
    if(start){
        pressure1.reloadButton.classList.add("d-none")
        pressure1.forceValue.innerHTML = 0
        pressure1.waters[0].classList.remove("d-none")
        pressure1.waters[1].classList.add("d-none")
        pressure1.whiteWallPseudo.classList.remove("d-none")
        pressure1.arrows.classList.add("d-none")
        pressure1.whiteWall.move(622.66,21.086)
        pressure1.text2.classList.add("d-none")
    }else{
        pressure1.reloadButton.classList.remove("d-none")
        pressure1.forceValue.innerHTML = '23 N'
        pressure1.waters[0].classList.add("d-none")
        pressure1.waters[1].classList.remove("d-none")
        pressure1.whiteWallPseudo.classList.add("d-none")
        pressure1.arrows.classList.remove("d-none")
        pressure1.whiteWall.move(622.66,-250)
        pressure1.text2.classList.remove("d-none")
    }
}
function start_pressure1(){
    pressure1_change(true)      
}

var pressure2 = {
    reloadButton:document.getElementById('fluids_2_pressure_2_reload'),
    text2:document.getElementById('pressure_2_text2'),
    llave1:document.getElementById('pressure_2_llave1'),
    llave2:document.getElementById('pressure_2_llave2'),
    pseudoWrench:document.getElementById('pressure_2_pseudoWrench'),
    patchChorros:SVG('#pressure_2_patchChorros'),
    patchWater:SVG('#pressure_2_patchWater'),
    chorros:[document.getElementById('pressure_2_chorro1'),document.getElementById('pressure_2_chorro2'),document.getElementById('pressure_2_chorro3')],
    chorroActual:0,
    chorroFrameActual:0,
    status:0
}
pressure2.reloadButton.addEventListener("click", function(){
    start_pressure2()
})
function pressure2_wrench(toOpen){
    if(toOpen){
        pressure2.llave1.classList.add("d-none")
        pressure2.llave2.classList.remove("d-none")
        pressure2.pseudoWrench.classList.add("d-none")
        pressure2.pseudoWrench.classList.remove("cu_pointer")
    }else{
        pressure2.llave1.classList.remove("d-none")
        pressure2.llave2.classList.add("d-none")
        pressure2.pseudoWrench.classList.remove("d-none")
    }
}
function mostrarOtroChorro(elSiguiente){
    if(elSiguiente){
        pressure2.chorroActual++
        if(pressure2.chorroActual > 2){pressure2.chorroActual = 0}
    }else{
        pressure2.chorroActual = -1
    }
      
    for(let i=0;i<3;i++){
        if(i == pressure2.chorroActual){
            pressure2.chorros[i].classList.remove("d-none")
        }else{
            pressure2.chorros[i].classList.add("d-none")
        }        
    }
}
function start_pressure2(){
    pressure2.reloadButton.classList.add("d-none")
    pressure2.text2.classList.add("d-none")
    pressure2_wrench(false)
    pressure2.patchWater.y(68)
    pressure2.patchChorros.y(98)
    pressure2.status = 0
    pressure2.pseudoWrench.classList.add("cu_pointer")
    mostrarOtroChorro(false)
}
function moverChorros(tiempoTotal){
    let rate = 80
    let frames = Math.floor(0.9*tiempoTotal / rate)
    console.log(frames)

    let animar =()=>{
        if(pressure2.chorroFrameActual >= 1){
            mostrarOtroChorro(true)
            pressure2.chorroFrameActual++
            if(pressure2.chorroFrameActual >= frames){
                pressure2.chorroFrameActual = 0
                mostrarOtroChorro(false)
                pressure2_wrench(false)
                pressure2.status = 2
                clearInterval(pressure2.aniChorros)
            }
        }else{
            mostrarOtroChorro(false)
        }
    }
    pressure2.chorroFrameActual = 1
    pressure2.aniChorros = setInterval(animar, 80)
}
function mostrarTexto(tiempo){
    let muestralo =()=>{
        pressure2.text2.classList.remove("d-none")
        pressure2.reloadButton.classList.remove("d-none")
    }
    let mostrada = setTimeout(muestralo, tiempo)
}
function openWrench(){
    pressure2.status = 1
    let bajaChorro = 500
    let subeAgua = 15000
    pressure2_wrench(true)
    moverChorros(bajaChorro+subeAgua)
    pressure2.patchChorros.animate(bajaChorro, 0, 'now').y(268)
    pressure2.patchWater.animate(subeAgua, bajaChorro, 'now').y(-37)
    mostrarTexto(subeAgua+bajaChorro)
}
pressure2.pseudoWrench.addEventListener("click", function(){
    if(pressure2.status == 0){openWrench()}    
})
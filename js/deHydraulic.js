const corrSistemaB = 2
var hydraulic1 = {
    reloadButton:document.getElementById('fluids_4_hydraulicPress_1_reload'),
    // status:0,
    habilitado:[true,false],
    pesas:[[],[]],
    // whiteWall:SVG('#pressure_1_paredBlanca'),
    text2:document.getElementById('hydraulicPress_1_text2'),
    text3:document.getElementById('hydraulicPress_1_text3'),
    massLimits:[{x:10,x2:218,y:0,y2:289},{x:410,x2:626,y:0,y2:289}],
    tiempo:{masa:400,embolos:1000,delay0:2000,fade1:1000},
    embolo:[
        {
            A:{
                min:94,max:129,sprite:SVG('#hydraulicPress1_0_emboloA'),xPuesto:168,
                puestos:[
                    {nro:-1,y:73},
                    {nro:-1,y:52},
                    {nro:-1,y:31},
                    {nro:-1,y:10}
                ],
                pseudo:document.getElementById('hydraulicPress1_0_pseudoJeringa')
            },
            // derecho:{min:131.8,max:170,sprite:SVG('#hydraulicPress1_0_emboloB')},
            B:{min:89,max:129,sprite:SVG('#hydraulicPress1_0_masaEmboloB')},
        },
        {
            A:{
                min:94,max:160-corrSistemaB,sprite:SVG('#hydraulicPress1_1_emboloA'),xPuesto:571,
                puestos:[
                    {nro:-1,y:69+4},
                    {nro:-1,y:48+4}
                ],
                pseudo:document.getElementById('hydraulicPress1_1_pseudoJeringa')
            },
            B:{min:120.6-corrSistemaB,max:129,sprite:SVG('#hydraulicPress1_1_masaEmboloB')},
        }
    ],
    parcheDOM:[document.getElementById('hydraulicPress_1_parche_0'),document.getElementById('hydraulicPress_1_parche_1')],
    parcheSprite:[SVG('#hydraulicPress_1_parche_0'),SVG('#hydraulicPress_1_parche_1')]
}

function siguienteEtapa(grupo){
    hydraulic1.habilitado[grupo] = false
    //tiempo:{masa:400,embolos:1000,delay0:2000,fade1:1000},
    let tiempoPrevio = hydraulic1.tiempo.masa + hydraulic1.tiempo.embolos + hydraulic1.tiempo.delay0
    if(grupo == 0){
        hydraulic1.habilitado[1] = true
        //mostrar elementos de sistema 1
        for(let i=0;i<6;i++){
            cambiarMasa(hydraulic1.pesas[1][i].dom,0)
        }
        hydraulic1.parcheDOM[0].classList.remove("d-none")
        hydraulic1.parcheSprite[0].animate(hydraulic1.tiempo.fade1,tiempoPrevio,'now').attr('opacity',0.25)
        hydraulic1.parcheSprite[1].animate(hydraulic1.tiempo.fade1,tiempoPrevio,'now').attr('opacity',0)
        // const myTimeout = setTimeout(()=>{hydraulic1.parcheDOM[1].classList.add("d-none")}), hydraulic1.tiempo.fade1 + tiempoPrevio)
        setTimeout(function() {
            hydraulic1.parcheDOM[1].classList.add("d-none")
        },hydraulic1.tiempo.fade1 + tiempoPrevio)
        /* 
        hydraulic1.parcheDOM[0].classList.add("d-none")
        hydraulic1.parcheSprite[0].attr('opacity',0)
        */
    }else{
        //habilitar boton reload
        hydraulic1.reloadButton.classList.remove("d-none")
        setTimeout(function() {
            //mostrar texto3
            // console.log('texto 3')
            hydraulic1.text3.classList.remove("d-none")
        },hydraulic1.tiempo.masa + hydraulic1.tiempo.embolos)
    }
}
function hydraulic1_massDrag(nro,grupo){
    let idElement = mass25Id(grupo,nro)
    // let tiempo = {masa:400,embolos:1000}
    let balancearEmbolos =()=>{
        let difY = hydraulic1.embolo[grupo].A.max - hydraulic1.embolo[grupo].A.min
        hydraulic1.embolo[grupo].A.sprite.animate(hydraulic1.tiempo.embolos,hydraulic1.tiempo.masa,'now').y(hydraulic1.embolo[grupo].A.max)
        hydraulic1.embolo[grupo].B.sprite.animate(hydraulic1.tiempo.embolos,hydraulic1.tiempo.masa,'now').y(hydraulic1.embolo[grupo].B.min)
        let iMasa
        for(let i=0;i<hydraulic1.embolo[grupo].A.puestos.length;i++){
            iMasa = hydraulic1.embolo[grupo].A.puestos[i].nro
            hydraulic1.pesas[grupo][iMasa].sprite.animate(hydraulic1.tiempo.embolos,hydraulic1.tiempo.masa,'now').dy(difY)
            // hydraulic1.embolo[grupo].A.sprite.animate(tiempo.embolos,tiempo.masa,'now').dy(difY)
        }
    }
    let presenteEnPila =(evaluado)=>{
        let resultado = false
        for(let i=0;i<hydraulic1.embolo[grupo].A.puestos.length;i++){
            if(hydraulic1.embolo[grupo].A.puestos[i].nro == evaluado){resultado = true}
        }
        return resultado
    }
    let apilarOdevolver = (x,y)=>{
        let inhabilitarRezagados =()=>{
            for(let i=0;i<6;i++){
                if(i != nro){
                    if(!presenteEnPila(i)){cambiarMasa(hydraulic1.pesas[grupo][i].dom,2)}
                }
            }
        }
        let laVacante =()=>{
            let disponible = -1
            let ocupados = 0
            for(let i=0;i<hydraulic1.embolo[grupo].A.puestos.length;i++){
                if(hydraulic1.embolo[grupo].A.puestos[i].nro < 0){
                    disponible = i
                    break
                }else{ocupados++}
            }
            return {disponible:disponible,ocupados:ocupados}
        }
        // console.log(idElement+' '+grupo+' x:'+x+' y:'+y)
        if(conditionDrag()){
            let onSyrnge = isPointInSVGShape(hydraulic1.embolo[grupo].A.pseudo,x, y)
            let coord
            let vacante = laVacante()
            if(onSyrnge && vacante.disponible >= 0){
                coord = {x:hydraulic1.embolo[grupo].A.xPuesto,y:hydraulic1.embolo[grupo].A.puestos[vacante.disponible].y}
                // hydraulic1.embolo[grupo].A.puestos[i].idMasa = idElement
                hydraulic1.embolo[grupo].A.puestos[vacante.disponible].nro = nro
                vacante.ocupados++
                cambiarMasa(hydraulic1.pesas[grupo][nro].dom,1)
                if(vacante.ocupados >= hydraulic1.embolo[grupo].A.puestos.length){
                    inhabilitarRezagados()
                    // hydraulic1.habilitado[grupo] = false
                    balancearEmbolos()
                    siguienteEtapa(grupo)
                }
            }else{
                // console.log(x+' '+y)
                coord = hydraulic1.pesas[grupo][nro].origen
            }
            hydraulic1.pesas[grupo][nro].sprite.animate(hydraulic1.tiempo.masa,0,'now').move(coord.x,coord.y)
        }
    }
    let conditionDrag = (x,y)=>{
        let resultado = false
        if(hydraulic1.habilitado[grupo] && !presenteEnPila(nro)){
            resultado = true
        }
        return resultado
    }
    return toDragXY(idElement,hydraulic1.massLimits[grupo],0,false,false,apilarOdevolver,conditionDrag)
}
function mass25Id(series,number){
    return 'hydraulicPress1_'+series+'_25mass_'+number
}
for(let i=0;i<6;i++){
    for(let j=0;j<2;j++){
        hydraulic1.pesas[j].push({sprite:hydraulic1_massDrag(i,j),dom:document.getElementById(mass25Id(j,i))})
    }
}
for(let j=0;j<2;j++){
    for(let i=0;i<6;i++){
        hydraulic1.pesas[j][i].dom.classList.add("act_habilitado")
    } 
}

function cambiarMasa(element,status){
    //status 0 act_habilitado, 1 act_semihabilitado, 2 act_inhabilitado
    switch(status){
        case 0:
            element.classList.add("act_habilitado") 
            element.classList.remove("act_semihabilitado") 
            element.classList.remove("act_inhabilitado") 
        break
        case 1:
            element.classList.remove("act_habilitado") 
            element.classList.add("act_semihabilitado") 
            element.classList.remove("act_inhabilitado") 
        break
        case 2:
            element.classList.remove("act_habilitado") 
            element.classList.remove("act_semihabilitado") 
            element.classList.add("act_inhabilitado") 
        break
    }
    
}
function reset_masas(){
    let iniciales = [{x:12,y:204},{x:414,y:204}]
    let size = {width:35,height:20}
    let separacion = 10,izquierda,derecha,objIzq,objDer,ajusteY,statusMasa
    for(let j=0;j<2;j++){
        for(let i=0;i<3;i++){
            izquierda = i * 2
            derecha = izquierda + 1
            objIzq = hydraulic1.pesas[j][izquierda]
            objDer = hydraulic1.pesas[j][derecha]
            ajusteY = i * (size.height + separacion)

            hydraulic1.pesas[j][izquierda].origen = {x:iniciales[j].x,y:iniciales[j].y+ajusteY}
            objIzq.sprite.move(iniciales[j].x,iniciales[j].y+ajusteY)

            hydraulic1.pesas[j][derecha].origen = {x:iniciales[j].x + separacion + size.width,y:iniciales[j].y+ajusteY}
            objDer.sprite.move(iniciales[j].x + separacion + size.width,iniciales[j].y+ajusteY)
            // objIzq.dom.classList.add("cu_pointer")
            // objIzq.sprite.attr('opacity',1)
            statusMasa = j==0?0:2
            cambiarMasa(objIzq.dom,statusMasa)
            cambiarMasa(objDer.dom,statusMasa)
        }
    }
}
function reset_valores(){
    hydraulic1.habilitado = [true,false]
    for(let grupo=0;grupo<2;grupo++){
        for(let i=0;i<hydraulic1.embolo[grupo].A.puestos.length;i++){
            hydraulic1.embolo[grupo].A.puestos[i].nro = -1
        }
    }
}
function reset_embolos(){
    for(let j=0;j<2;j++){
        hydraulic1.embolo[j].A.sprite.y(hydraulic1.embolo[j].A.min)
        hydraulic1.embolo[j].B.sprite.y(hydraulic1.embolo[j].B.max)
    }
}
hydraulic1.reloadButton.addEventListener("click", function(){
    start_hydraulicPress1()
})
function start_hydraulicPress1(){
    hydraulic1.reloadButton.classList.add("d-none")
    reset_masas()
    reset_embolos()
    hydraulic1.parcheDOM[0].classList.add("d-none")
    hydraulic1.parcheSprite[0].attr('opacity',0)
    hydraulic1.text3.classList.add("d-none")
    hydraulic1.parcheDOM[1].classList.remove("d-none")
    hydraulic1.parcheSprite[1].attr('opacity',1)
    reset_valores()
}
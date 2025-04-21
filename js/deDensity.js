const moveTo =(number,toSource)=>{
    let coord = toSource?density1.specimens[number].coordinates.column:density1.specimens[number].coordinates.balance
    density1.specimens[number].solid.animate(500,0,'now').move(coord.x,coord.y)
}
const density_specimenStatus =(number,status)=>{
    let field_mass = document.getElementById(density1.fields_baseIds.mass+number)
    let field_density = document.getElementById(density1.fields_baseIds.density+number)
    let solid = document.getElementById('solid_'+number)
    let showFields = status>=1?true:false
    let showDimensions = status==1?false:true
    let showPointer = status==2?false:true
    density1_scaleValue.innerHTML = 0
    density1.specimens[number].status = status
    let finished = 0
    for(let i=0;i<4;i++){
        if(density1.specimens[i].status >= 1){finished++}
    }
    
    let duration = 500
    switch(status){
        case 0:
            moveTo(number,true)
        break
        case 1:
            density1_scaleValue.innerHTML = density1.specimens[number].mass+' g'
            moveTo(number,false)
            if(finished == 4){
                density1.reloadButton.classList.remove("d-none")
            }
        break
        case 2:
            moveTo(number,true)
        break
    }
    if(showFields){
        field_mass.classList.remove("d-none")
        field_density.classList.remove("d-none")
    }else{
        field_mass.classList.add("d-none")
        field_density.classList.add("d-none")
    }
    if(showDimensions){
        density1.specimens[number].dimensions.classList.remove("d-none")
    }else{
        density1.specimens[number].dimensions.classList.add("d-none")
    }
    if(showPointer){
        solid.classList.add("act_habilitado")
        solid.classList.remove("act_inhabilitado")
    }else{
        solid.classList.remove("act_habilitado")
        solid.classList.add("act_inhabilitado")
    }
}

const density1_stage = document.getElementById('act_fluids_1_density_1')
const density1_scaleValue = document.getElementById('density_1_scale_value')
const pseudoScale = document.getElementById('density_1_pseudoScale')
const density1_size = getSVGStageSize(density1_stage)
const density1_limits = new SVG.Box(0, 0, density1_size.width, density1_size.height)
const density1_dragZone = {x:0,y:30,x2:370,y2:340}

var density1 = {
    stage:density1_stage,
    size:density1_size,
    limits:density1_limits,
    reloadButton:document.getElementById('fluids_1_density_1_reload'),
    specimens:[
        {mass:7812.5,coordinates:{column:{x:288.514,y:58.615},balance:{x:101.114,y:202.347}}},
        {mass:550,coordinates:{column:{x:276.076,y:131.045},balance:{x:92.259,y:208.638}}},
        {mass:326,coordinates:{column:{x:292.267,y:194.438},balance:{x:105.311,y:199.5}}},
        {mass:992,coordinates:{column:{x:283.354,y:250.467},balance:{x:96,y:177.4}}},
    ],
    fields_baseIds:{mass:'density_1_fields_mass',density:'density_1_fields_den'},
}
let alIniciar,alFinalizar,alArrastrar,condicionador
for(let i=0;i<4;i++){
    condicionador =(x,y)=>{
        if(density1.specimens[i].status == 2){
            return false
        }else{return true}
    }
    alArrastrar =(x,y)=>{
        density1.specimens[i].dimensions.classList.add("d-none")
    }
    alFinalizar =(x,y)=>{
        let onBalance = isPointInSVGShape(pseudoScale,x, y)
        if(density1.specimens[i].status == 0){
            if(onBalance){
                density_specimenStatus(i,1)
            }else{
                moveTo(i,true)
                density1.specimens[i].dimensions.classList.remove("d-none")
            }            
        }else if(density1.specimens[i].status == 1){
            density_specimenStatus(i,2)
        }
    }
    alIniciar =()=>{
        let onbalance = -1
        if(density1.specimens[i].status == 0){            
            for(let j=0;j<4;j++){
                if(density1.specimens[j].status == 1){onbalance = j}
            }
            if(onbalance >= 0 && onbalance != i){
                density_specimenStatus(onbalance,2)
            }
        }
    }
    density1.specimens[i].status = 0
    density1.specimens[i].solid = toDragXY('solid_'+i,density1_dragZone,0,alArrastrar,alIniciar,alFinalizar,condicionador)
    density1.specimens[i].dimensions = document.getElementById('dimensions_'+i)
}
density1.reloadButton.addEventListener("click", function(){
    start_density()
})
function start_density(){
    density1.reloadButton.classList.add("d-none")
    for(let i=0;i<4;i++){density_specimenStatus(i,0)}
}

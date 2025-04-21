let sp_info1 = 'La densidad es una propiedad <span class="concept" data-bs-toggle="modal" data-bs-target="#modal_intrinsic">intrínsica</span> de la materia que indica que tanta masa tiene un material en una unidad de volumen'
sp_info1 += '<span class="formula"> ρ = m/V</span>'
sp_info1 += '<br>Se expresa en unidades como kg/m<sup>3</sup> or g/cm<sup>3</sup>.'
sp_info1 += '<br>Si usamos el peso (<span class="formula">W = mg</span>) en vez de la masa, obtenemos el peso específico: <span class="formula">γ = W/V</span>, por lo tanto <span class="formula"> γ = ρg</span>'
sp_info1 += '<br>Está presente en cualquier tipo de materia, no importa si es un fluido o un sólido.'

let sp_pressure_info1 = 'El movimiento de las moléculas, el peso del fluido y cualquier fuerza externa hace que los fluidos ejerzan fuerzas sobre los objetos que están cercanos a ellos.<br>La presión mide que tanta fuerza está aplicando el fluido por cada unidad de área. <span class="formula">P = F/A </span>,   1 pascal (Pa) = 1 newton por metro cuadrado N/m<sup>2</sup>, Un kilo pascal (kPa) = 1000 Pa, un mega pascal (MPa) = 1000 kPa.'
const content_SP = {
    title:"Fluidos",
    concept:"Materia formada por moléculas cuyas fuerzas de atracción son muy débiles, por lo que no pueden tener una forma estable como los sólidos. Los fluidos más comunes son los líquidos y gases.",
    menu:["Densidad","Presión","Ley de Pascal","Prensa hidráulica","Arquímedes"],
    density:{
        info1:sp_info1,
        modal1:{title:'Intrínsico',info:'Algo inherente o esencial a la naturaleza de una cosa, que proviene del interior y no depende de factores externos.<br>La palabra proviene del latín "intrinsecus", que significa "situado en el interior".'},
        activity1:{
            text1:[
                'Objetos con distintos tamaños',
                'tienen una masa distinta',
                'pero si son del mismo',
                'material, su densidad',
                'es igual.',
                'Envíalos a la balanza',
                'para comprobarlo.',
            ],
            columns:['Masa','Volumen','Densidad'],
            materials:['Madera (sólido)','Agua (fluido)'],
        }
    },
    pressure:{
        info1:sp_pressure_info1,
        activity1:{
            text1:[
                'La pared naranja tiene',
                'instalados dos dinamómetros',
                'para medir la fuerza vertical',
                'y horizontal que ejercerá',
                'el agua sobre ella. Mueve la',
                'compuerta blanca para averiguarlo.'
            ],
            text2:[
                '¿El vertical no registró nada???',
                'La fuerza que ejerce un fluido sobre',
                'las paredes del recipiente, siempre',
                'actúa de forma perpendicular a ellas.'
            ],
        },
        activity2:{
            text1:[
                'Al vertir agua en los recipientes conectados...',
                '¿Cuál se llenará más rápido?',
                '¿Cuál quedará con el nivel de agua más alto?',
                'Abre el grifo para averiguarlo'
            ],
            text2:[
                'La presión no  depende de la forma del',
                'recipiente, solo cambia con la altura, esto',
                'hace que el líquido siempre esté nivelado en',
                'todos los recipientes.'
            ],
        }
    },
    pascal:{
        info1:'Cuando se aplica una presión externa a un fluido incompresible (líquidos) que está dentro de un volumen cerrado, el incremento de la presión se distribuye uniformemente a través de todo su volumen.',
        activity1:{
            text1:[
                'En esta actividad disponemos de:',
                ' - Un frasco de vidrio lleno de agua.',
                ' - Una jeringa con agua conectada al frasco.',
                ' - Un globo lleno de aire atado al fondo.',
                'Mueve el émbolo de la jeringa para',
                'ver de que forma se comprime el globo.',
            ],
            text2:[
                'Ya que el líquido está llegando',
                'desde arriba es fácil creer que',
                'la presión aumentaría de forma',
                'vertical y el globo se iba a achatar,',
                'pero tal como lo dice la ley de',
                'Pascal, la presión aumentó',
                'uniformente en todo el frasco,',
                'por eso el globo conserva',
                'su forma esférica.',
                ' ',
                ' ',
            ],
        },
    },
    hydraulicPress:{
        info1:'Una de la aplicaciones de la ley de Pascal es la prensa hidráulica, ella nos permite multiplicar la fuerza, y es posible levantar o mover objetos muy pesados.',
        activity1:{
            text1:[
                '¿Con cuántas pesas',
                'de 25 g podemos',
                'podemos mover',
                'la carga de 100 g?',
            ],
            text2:[
                '¡Advinaste! 4 x 25 = 100',
                'Ahora intentemos',
                'con una jeringa',
                'que tiene la mitad',
                'del área circular'
            ],
            text3:[
                'En este caso la diferencia',
                'de áreas multiplicó la fuerza',
                'en la segunda jeringa.',
                'Mientras más pequeña',
                'es el área más se multiplica',
                'la fuerza, a cambio de',
                'tener que moverse',
                'en una distancia mayor.'
            ]
        },
    },
    archimedes:{
        info1:'¿Por qué algunos objetos flotan en el agua y otros no? ... ¿Si una bola de metal se va hacia el fondo, cómo puede flotar un barco de metal?<br>Un matemático griego llamado Arquímedes estudió la flotabilidad y observó que <br><span class="amarilloLight">Un objeto que está sumergido en un fluido recibe una fuerza ascendente igual al peso del fluido desplazado.</span>',
        activity1:{
            labels:['Agua pura','Agua salada','Agua muy','salada'],
            text1:[
                'Estas esferas son de acero ',
                '- La pequeña es maciza',
                'su densidad es 7.85 g/cm<tspan class="act_exponente">3</tspan>',
                '- La grande es hueca ',
                'su densidad es 1.2 g/cm<tspan class="act_exponente">3</tspan>',
                'Déjalas caer',
                '',
            ],
            text2:[
                'Se hundieron. La fuerza de',
                'empuje es menor al peso.'
            ],
            text3:[
                'El peso de la bola grande',
                'y su empuje son iguales.',
                ''
            ],
            text4:[
                'La grande flota,',
                'el empuje fue mayor',
                'que el peso' 
            ],
        },
        activity2:{
            text1:[
                '¿Cómo cambia su  profundidad  un submarino?',
                'Esta botella plástica tiene varios agujeros para dejar entrar el agua y',
                'un globo en el centro conectado a un tanque con aire comprimido.',

                'Usa el control remoto para cambiar de profundidad.',

                'Para subir: el globo se infla, todo el submarino',
                'se hace menos denso que el agua y asciende.',
                
                'Para descender: el tanque desinfla el globo',
                'y comprime el aire, ahora entra más agua, el',
                'submarino es más denso y desciende.',
            ],
        },
        info2:'Los barcos tienen espacios llenos de aire dentro de su casco, lo que hace que tengan una densidad promedio menor que el agua y por lo tanto experimenten una fuerza de flotación mayor que su peso. <br>En los globos aerostáticos el aire en su interior es calentado y así se hace menos denso que el aire externo.',
        activity3:{
            text1:[
                '¿Será de oro puro la corona?',
                'Arquímedes ayudó al Rey a determinar la pureza de su nueva corona.',
                'Y lo hizo basándose en el principio de flotación.',
                'Esta anécdota tal vez no ocurrió. Consíderala más bien un cuento científico.',

                'En la balanza tenemos la corona y una muestra de oro con la misma masa.',
                'Observa que la balanza está nivelada mientras está en el aire.',

                'Si la corona es de oro puro, debe tener el mismo volumen que la muestra,',
                'el empuje en el agua debe ser igual y debe quedar nivelada.',

                'Baja la balanza para comprobarlo.'
            ],
            text2:[
                'La corona obtuvo más empuje, debido',
                'a que desplazó más agua, indicando',
                'que tiene mayor volumen,',
                'y por lo tanto no es de oro puro.'
            ],
        },
    }
}
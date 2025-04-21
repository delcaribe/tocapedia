let en_info1 = 'Density is an <span class="concept" data-bs-toggle="modal" data-bs-target="#modal_intrinsic">intrinsic</span> property of matter that indicates how much mass a material has per unit of volume.'
en_info1 += '<span class="formula"> ρ = m/V</span>'
en_info1 += '<br>It\'s expressed in units such as kg/m<sup>3</sup> or g/cm<sup>3</sup>.'
en_info1 += '<br>If we use weight (<span class="formula">W = mg</span>) instead of mass in the relationship, we obtain the specific weight: <span class="formula">γ = W/V</span>, and <span class="formula"> γ = ρg</span>'
en_info1 += '<br>It\'s present in any type of substance, no matter if it is a fluid or a solid.'

let en_pressure_info1 = 'The motion of molecules, the weight of the fluid, and any external force cause fluids to exert forces on objects near them.<br>Pressure measures how much force the fluid is applying per unit area. <span class="formula">P = F/A </span>, 1 pascal (Pa) = 1 newton per square meter N/m<sup>2</sup>, 1 kilopascal (kPa) = 1000 Pa, 1 megapascal (MPa) = 1000 kPa.'
const content_EN = {
    title:"Fluids",
    concept:"Matter formed by molecules whose attractive forces are very weak, so they cannot maintain a stable shape like solids. The most common fluids are liquids and gases.",
    menu:["Density","Pressure","Pascal's Law","Hydraulic press","Archimedes"],
    density:{
        info1:en_info1,
        modal1:{title:'Intrinsic',info:'Something that is inherent or essential to the nature of a thing, coming from within, and not dependent on external factors.<br>The word "intrinsic" comes from the Latin word "intrinsecus," meaning "situated on the inside".'},
        activity1:{
            text1:[
                'Objects of different sizes',
                'have different masses,',
                'but if they\'re made of',
                'the same material,',
                'their density is the same.',
                'Move them to the scale',
                'to check this'
            ],
            columns:['Mass','Volume','Density'],
            materials:['Wood (solid)','Water (fluid)'],
        }
    },
    pressure:{
        info1:en_pressure_info1,
        activity1:{
            text1:[
                'The orange wall has',
                'two dynamometers installed',
                'to measure the vertical and',
                'horizontal forces the water',
                'will exert on it.Move the',
                'white gate to find out.'
            ],
            text2:[
                'The vertical one didn\'t register anything???',
                'The force exerted by a fluid',
                'on the walls of the container',
                'always acts perpendicular to them.'
            ],
        },
        activity2:{
            text1:[
                'When you pour water into the connected containers...',
                'Which one will fill up the fastest?',
                'Which one will have the highest water level?',
                'Turn the water on to find out'
            ],
            text2:[
                'The pressure does not depend on the shape of the',
                'container, it only changes with height. This',
                'causes the liquid to always be level in',
                'all the containers.'
            ],
        }
    },
    pascal:{
        info1:'When external pressure is applied to an incompressible fluid (liquid) that is within a closed volume, the increase in pressure is distributed uniformly throughout its volume.',
        activity1:{
            text1:[
                'In this activity we have:',
                ' - A glass jar filled with water.',
                ' - A syringe with water connected to the jar.',
                ' - A balloon filled with air tied to the bottom.',
                'Move the syringe plunger to',
                'see how the balloon is compressed.',
            ],
            text2:[
                'Since water is coming from',
                'above it\'s easy to believe that',
                'the pressure would increase',
                'vertically and the balloon',
                'would flatten,',
                'but just as Pascal\'s law says,',
                'the pressure increased uniformly',
                'throughout the entire jar,',
                'which is why the balloon retains',
                'its spherical shape.'
            ],
        },
    },
    hydraulicPress:{
        info1:'One of the applications of Pascal\'s law is the hydraulic press, which allows us to multiply force, and it is possible to lift or move very heavy objects.',
        activity1:{
            text1:[
                'How many 25 g',
                'weights do we',
                'need to move',
                'the 100 g load?',
            ],
            text2:[
                'You were right! 4 x 25 = 100',
                'Now let\'s try',
                'the same but with' ,
                'a syringe that has',
                'half the circular area'
            ],
            text3:[
                'In this case, the difference',
                'in area multiplied the force',
                'on the second syringe.',
                'The smaller the area, the more',
                'the force is multiplied,',
                'in exchange for having',
                'to move over a',
                'greater distance.'
            ],
        },
    },
    archimedes:{
        info1:'Why do some objects float in water and others don\'t? ... If a metal ball sinks to the bottom, how can a metal ship float? <br>A Greek mathematician named Archimedes studied buoyancy and observed that <br><span class="amarilloLight">An object that is submerged in a fluid receives an upward force equal to the weight of the fluid displaced</span>',
        activity1:{
            labels:['Pure water','Salty water','Very salty','water'],
            text1:[
                'These balls are made of steel.',
                '- The small one is solid,',
                'its density is 7.85 g/cm<tspan class="act_exponente">3</tspan>.',
                '- The large one is hollow,',
                'its density is 1.2 g/cm<tspan class="act_exponente">3</tspan>.',
                'Drop the balls',
                '',
            ],
            text2:[
                'Both sank. The buoyant force',
                'is less than the weight.',
            ],
            text3:[
                'Big ball\'s weight',
                'and buoyant are equal.',
                ''
            ],
            text4:[
                'The big ball floats,',
                'the buoyant force was greater',
                'than the weight'
            ],
        },
        activity2:{
            text1:[
                'How does a submarine change its depth?',
                'This plastic bottle has several holes to let water in and',
                'a balloon in the center connected to a tank of compressed air.',

                'Use the remote control to change depth.',

                'To ascend: the balloon inflates, the entire submarine',
                'becomes less dense than water and rises.',

                'To descend: the tank deflates the balloon and',
                'compresses the air. Now more water enters,',
                'the submarine is denser and descends.'
            ],
        },
        info2:'Ships have air-filled spaces inside their hulls, which means they have an average density lower than water and therefore experience a buoyant force greater than their weight.<br> In hot air balloons, the air inside is heated, making it less dense than the air outside.',
        activity3:{
            text1: [
                'Is the crown made of pure gold?',
                'Archimedes helped the King determine the purity of his new crown',
                'And he did it based on the principle of buoyancy.',
                'This anecdote probably didn\'t happen. Consider it more of a scientific tale.',
            
                'On the balance scale, we have the crown and a gold\'s sample with the same mass.',
                'You can notice they are balanced while in the air.',
            
                'If the crown is made of pure gold, it must have the same volume as the sample,',
                'the buoyant force in the water must be the same, and it should remain balanced.',
            
                'Lower the balance scale to check.'
            ],
            text2:[
                'The crown gained more upward force',
                'because it displaced more water',
                'indicating that a bigger volume,',
                'and is therefore not pure gold.'
            ],
        },
    }
}
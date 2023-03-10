"use strict";

let nivel = "1";
let raza = "";
let clase = "";
let pvMax = "";
let pv = "";

let valores = [];

//Primer valor: posicion del select,
//Segundo valor, el valor seleccionado
let valoresSeleccionados = [
    [-1, 0],
    [-1, 0],
    [-1, 0],
    [-1, 0],
    [-1, 0],
    [-1, 0],
];

//Primer valor: valor base
//Segundo valor: la suma
let atributos = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
]

function cambioRaza() {
    raza = document.getElementById("razaSelect").value;

    dibujarMejoraRaza();
    
    actualizarAtributos();
}
function cambioClase() {
    clase = document.getElementById("claseSelect").value;

    dibujarEquipo();
    dibujarHabilidades();

    if (atributos[2][0] !== 0 && clase !== "") {
        cambiarPVmax();
    }
}
function cambioNivel() {
    nivel = document.getElementById("levelSelect").value;

    dibujarHabilidades();

    /* if (nivel > 1) {
        mejoraNivel();
    } */
    mejoraNivel();

    actualizarSumaAttr();
    actualizarTotMod();
    
    actualizarAtributos();
}

function lanzarDado8() {
    generarValores();
    generarSuma();

    rellenarValoresSelec();
    dibujarSelects();
}

function generarValores() {
    let valoresInput = document.getElementById("valoresInput");

    valores = [];
    for (let i = 0; i < 7; i++) {
        valores.push(Math.floor(Math.random() * (8 - 1 + 1) + 1));
    }
    valores.sort((a, b) => {
        return a - b;
    })

    valoresInput.value = valores.toString();
}

function generarSuma() {
    let dadoBoton = document.getElementById("dadoBoton");
    let sumaDiv = document.getElementById("sumaDiv");
    sumaDiv.hidden = "";

    valores.splice(0, 1);

    let suma = valores.reduce((a, b) => a + b);
    sumaDiv.innerHTML = "<b>Suma: </b>" + suma;

    if (suma > 23) {
        dadoBoton.disabled = "disabled";
    }
}

function rellenarValoresSelec() {
    for (let i = 0; i < valoresSeleccionados.length; i++) {
        valoresSeleccionados[i][1] = valores[i];
        valoresSeleccionados[i][0] = -1;
    }
}

function dibujarSelects() {
    let selects = document.getElementsByClassName("attrSelect");

    for (let i = 0; i < selects.length; i++) {
        let emptyOption = document.createElement("option");
        emptyOption.value = "";
        emptyOption.innerText = "0";

        selects[i].innerHTML = "";
        selects[i].appendChild(emptyOption);

        for (let e = 0; e < valoresSeleccionados.length; e++) {
            let option = document.createElement("option");
            option.value = valoresSeleccionados[e][1];
            option.innerText = valoresSeleccionados[e][1];

            if (valoresSeleccionados[e][0] != -1) {
                //option.disabled = true;
                option.className = "bg-danger text-white";
            } else {
                option.className = "bg-success text-white";
            }
            if (valoresSeleccionados[e][0] === i) {
                option.selected = true;
            }

            selects[i].appendChild(option);
        }
    }
}

function cambiarSelect(opt) {
    rellenarValoresSelec();
    actualizarValoresSelec(opt);
    dibujarSelects();

    actualizarTotMod();
}

function actualizarValoresSelec(opt) {
    let selects = document.getElementsByClassName("attrSelect");
    selects = [...selects];

    for (let i = 0; i < selects.length; i++) {
        if (selects[i].selectedIndex > 0) {
            if (selects[i] === opt) {
                valoresSeleccionados[selects[i].selectedIndex - 1][0] = i;
            } else if (selects[i] !== opt && selects[i].selectedIndex === opt.selectedIndex) {
                //valoresSeleccionados[selects[i].selectedIndex - 1][1] = -1;
            } else {
                valoresSeleccionados[selects[i].selectedIndex - 1][0] = i;
            }
        }
    }

    actualizarAtributos();
}

function actualizarAtributos() {
    let selects = document.getElementsByClassName("attrSelect");
    selects = [...selects];

    for (let i = 0; i < selects.length; i++) {
        if (selects[i].selectedIndex != 0) {
            atributos[i][0] = valoresSeleccionados[selects[i].selectedIndex - 1][1];
        } else {
            atributos[i][0] = 0;
        }
    }

    if (atributos[2][0] !== 0 && clase !== "") {
        cambiarPVmax();
    }

}

function dibujarMejoraRaza() {
    let mejoraRazaDiv = document.getElementById("mejoraRazaDiv");
    mejoraRazaDiv.innerHTML = "";

    let mejoraRaza = document.createElement("div");
    mejoraRaza.innerHTML =
        '<div class="input-group" style="width: 140px;">' +
        '   <span class="input-group-text" style="width:50px;">+1</span>' +
        '       <select class="form-select raceUpgrade" aria-label="mejoraRaza" onchange="actualizarSumaAttr(), actualizarTotMod(), actualizarAtributos();">' +
        '           <option value=""></option>' +
        '           <option value="FUE">FUE</option>' +
        '           <option value="DES">DES</option>' +
        '           <option value="CON">CON</option>' +
        '           <option value="CAR">CAR</option>' +
        '           <option value="INT">INT</option>' +
        '           <option value="SAB">SAB</option>' +
        '       </select>' +
        '</div>'
        ;

    let newDiv = document.createElement("div");
    switch (raza) {
        case "Humano":
        case "Otra":
            mejoraRazaDiv.className = "mb-2"
            newDiv.innerHTML = '<b>Mejora de Raza: </b>' + mejoraRaza.innerHTML + mejoraRaza.innerHTML;
            break;
        case "Elfo":
            newDiv.innerHTML = "<b>Mejora de Raza: </b> +1 Des, +1 Int";
            break;
        case "Enano":
            newDiv.innerHTML = "<b>Mejora de Raza: </b> +1 Fue, +1 Con";
            break;
        case "Mediano":
            newDiv.innerHTML = "<b>Mejora de Raza: </b> +1 Des, +1 Car";
            break;
        case "Goblin":
            newDiv.innerHTML = "<b>Mejora de Raza: </b> +1 Des, +1 Sab";
            break;
        case "Orco":
            newDiv.innerHTML = "<b>Mejora de Raza: </b> +1 Fue, +1 Con";
            break;
        case "Reptiliano":
            newDiv.innerHTML = "<b>Mejora de Raza: </b> +1 Fue, +1 Car";
            break;

        default:
            newDiv.innerHTML = "<b>Mejora de Raza: </b>";
            break;
    }

    mejoraRazaDiv.appendChild(newDiv);

    actualizarSumaAttr();
    actualizarTotMod();
}

function actualizarSumaAttr() {
    let adds = [0, 0, 0, 0, 0, 0];

    switch (raza) {
        case "Humano":
        case "Otra":
            let selectRaza = document.getElementsByClassName("raceUpgrade");
            selectRaza = [...selectRaza];
            for (let i = 0; i < selectRaza.length; i++) {
                switch (selectRaza[i].value) {
                    case "FUE":
                        adds[0]++;
                        break;
                    case "DES":
                        adds[1]++;
                        break;
                    case "CON":
                        adds[2]++;
                        break;
                    case "CAR":
                        adds[3]++;
                        break;
                    case "INT":
                        adds[4]++;
                        break;
                    case "SAB":
                        adds[5]++;
                        break;

                    default:
                        break;
                }
            }
            break;
        case "Elfo":
            adds[1]++;
            adds[4]++;
            break;
        case "Enano":
            adds[0]++;
            adds[2]++;
            break;
        case "Mediano":
            adds[1]++;
            adds[3]++;
            break;
        case "Goblin":
            adds[1]++;
            adds[5]++;
            break;
        case "Orco":
            adds[0]++;
            adds[2]++;
            break;
        case "Reptiliano":
            adds[0]++;
            adds[3]++;
            break;

        default:
            break;
    }

    let mejorasNivel = document.getElementsByClassName("claseUpgrade");
    for (let i = 0; i < mejorasNivel.length; i++) {
        if (mejorasNivel[i].value !== "") {
            adds[mejorasNivel[i].value - 1]++;
        }
    }

    let sumaSpans = document.getElementsByClassName("attrAddSpan");
    for (let i = 0; i < adds.length; i++) {
        if (adds[i] !== 0) {
            sumaSpans[i].innerText = "+" + adds[i];
        } else {
            sumaSpans[i].innerText = adds[i];
        }
        atributos[i][1] = adds[i];
    }
}

function actualizarTotMod() {
    let totalSpans = document.getElementsByClassName("totalSpan");
    let modSpan = document.getElementsByClassName("modifierSpan");

    for (let i = 0; i < atributos.length; i++) {
        let total = atributos[i][0] + atributos[i][1];
        totalSpans[i].innerText = "Total: " + total;

        if (total <= 6) {
            if (total <= 4) {
                modSpan[i].innerText = "Mod: " + (-3 + (total - 1));
            } else {
                modSpan[i].innerText = "Mod: +" + (-3 + (total - 1));
            }
        } else {
            modSpan[i].innerText = "Mod: +" + (Math.ceil(total / 2) - 1);
        }

    }

}

function dibujarEquipo() {
    let equipoClaseDiv = document.getElementById("equipoClaseDiv");
    equipoClaseDiv.innerHTML = "";

    let divEqi = document.createElement("div");
    let divAst = document.createElement("div");
    divAst.innerHTML = "<b>*</b> Puede usar el objeto pero no dispone de el inicialmente";

    switch (clase) {
        case "Guerrero":
            clase = "Guerrero";

            divEqi.innerHTML = "<b>Equipo de Clase: </b>Espada(1d6+FUE), *Escudo(Bloqueo)";
            equipoClaseDiv.append(divEqi);
            equipoClaseDiv.append(divAst);
            break;
        case "B??rbaro":
            clase = "B??rbaro";

            divEqi.innerHTML = "<b>Equipo de Clase: </b>Hacha de dos manos(1d6+FUE), *Hacha de mano(1d4+FUE | 3 distancia)";
            equipoClaseDiv.append(divEqi);
            equipoClaseDiv.append(divAst);
            break;
        case "P??caro":
            clase = "P??caro";

            divEqi.innerHTML = "<b>Equipo de Clase: </b>Daga(1d6+DES), *Cuchillo arrojadizo(1d4+DES | 3 dis), *Bomba de humo";
            equipoClaseDiv.append(divEqi);
            equipoClaseDiv.append(divAst);
            break;
        case "Bardo":
            clase = "Bardo";

            divEqi.innerHTML = "<b>Equipo de Clase: </b>Espada(1d6+DES), Instrumento(1d4+CAR | 3 dis)";
            equipoClaseDiv.append(divEqi);
            break;
        case "Cazador":
            clase = "Cazador";

            divEqi.innerHTML = "<b>Equipo de Clase: </b>Arco(1d6+DES | 4 dis), Flechas(25), *Flechas marcadoras, *Flechas explosivas, *Flechas empuje";
            equipoClaseDiv.append(divEqi);
            equipoClaseDiv.append(divAst);
            break;
        case "Mago":
            clase = "Mago";

            divEqi.innerHTML = "<b>Equipo de Clase: </b>Bast??n(1d6+INT | 4 dis)";
            equipoClaseDiv.append(divEqi);
            break;
        case "Cl??rigo":
            clase = "Cl??rigo";

            divEqi.innerHTML = "<b>Equipo de Clase: </b>Catalizador(1d6+SAB | 4 dis)";
            equipoClaseDiv.append(divEqi);
            break;

        default:
            clase = "";
            divEqi.innerHTML = "<b>Equipo de Clase: </b>";
            equipoClaseDiv.append(divEqi);
            break;
    }
}

function dibujarHabilidades() {
    let habilidadesDiv = document.getElementById("habilidadesDiv");
    habilidadesDiv.innerHTML = "";

    let divPas = document.createElement("div");
    let divHab = document.createElement("div");

    switch (clase) {
        case "Guerrero":
            divPas.innerHTML =
                '<div class="rounded-1 p-2 mb-2 " style="background: #ececec;" >' +
                '       <b>Pasiva de Clase (Sediento): </b>Al eliminar a un objetivo, gana una acci??n adicional.' +
                '</div>'
                ;
            break;
        case "B??rbaro":
            divPas.innerHTML =
                '<div class="rounded-1 p-2 mb-2 " style="background: #ececec;" >' +
                '       <b>Pasiva de Clase (Ansia): </b>Cuando tiene un arma en cada mano, puede atacar con las dos armas a la vez en el mismo ataque. De esta forma, lanzar??a 2d4+FUE.' +
                '</div>'
                ;
            break;
        case "P??caro":
            divPas.innerHTML =
                '<div class="rounded-1 p-2 mb-2 " style="background: #ececec;" >' +
                '       <b>Pasiva de Clase (Sombra): </b>Puedes gastar una acci??n para entrar en sigilo. Al salir de sigilo, hace un ataque cr??tico.' +
                '</div>'
                ;
            break;
        case "Cazador":
            divPas.innerHTML =
                '<div class="rounded-1 p-2 mb-2 " style="background: #ececec;" >' +
                '       <b>Pasiva de Clase (H??bil tirador): </b>Si atacas sin haberte movido, ganas +1 al da??o.' +
                '</div>'
                ;
            break;
        case "Bardo":
            divPas.innerHTML =
                '<div class="rounded-1 p-2 mb-2 " style="background: #ececec;" >' +
                '       <b>Pasiva de Clase (Canci??n Grupal): </b>Si realizas un hechizo sobre un aliado, puedes aplicar el mismo efecto a otro aliado que se encuentre adyacente al primero.' +
                '</div>'
                ;
            switch (nivel) {
                case "3":
                    divHab.innerHTML +=
                        '<div class="rounded-1 p-2 mb-2 " style="background: #ececec;" >' +
                        '       <b>Melod??a debilitante: </b>1d4+CAR+Debilitado.' +
                        '</div>'
                        ;
                case "2":
                    divHab.innerHTML +=
                        '<div class="rounded-1 p-2 mb-2 " style="background: #ececec;" >' +
                        '       <b>Canci??n motivadora: </b>El aliado tira con ventaja durante su turno.' +
                        '</div>'
                        ;
                case "1":
                    divHab.innerHTML +=
                        '<div class="rounded-1 p-2" style="background: #ececec;" >' +
                        '       <b>Canci??n regenerante: </b>Curaci??n de 1d4+CAR. (3 usos por combate)' +
                        '</div>'
                        ;
                    break;

                default:
                    break;
            }
            break;
        case "Mago":
            divPas.innerHTML =
                '<div class="rounded-1 p-2 mb-2 " style="background: #ececec;" >' +
                '       <b>Pasiva de Clase (Man??): </b>Por cada hechizo lanzado, acumula un punto de man??. Los puntos de man?? se pueden consumir para sumar +1 al da??o de un ataque. Se pueden acumular un m??ximo de siete puntos de man??.' +
                '</div>'
                ;
            switch (nivel) {
                case "3":
                    divHab.innerHTML +=
                        '<div class="rounded-1 p-2 mb-2 " style="background: #ececec;" >' +
                        '       <b>Juntar: </b>1d4+INT en ??rea y junta a los enemigos.' +
                        '</div>'
                        ;
                case "2":
                    divHab.innerHTML +=
                        '<div class="rounded-1 p-2 mb-2 " style="background: #ececec;" >' +
                        '       <b>Aturdir: </b>1d4+INT + Aturdir.' +
                        '</div>'
                        ;
                case "1":
                    divHab.innerHTML +=
                        '<div class="rounded-1 p-2" style="background: #ececec;" >' +
                        '       <b>Explosi??n: </b>1d4+INT en ??rea.' +
                        '</div>'
                        ;
                    break;

                default:
                    break;
            }
            break;
        case "Cl??rigo":
            divPas.innerHTML =
                '<div class="rounded-1 p-2 mb-2 " style="background: #ececec;" >' +
                '       <b>Pasiva de Clase (Mi religi??n me lo permite): </b>Cuando lanza un hechizo, otorga +1 de da??o a un aliado cercano.' +
                '</div>'
                ;
            switch (nivel) {
                case "3":
                    divHab.innerHTML +=
                        '<div class="rounded-1 p-2 mb-2 " style="background: #ececec;" >' +
                        '       <b>Aturdir: </b>1d4+SAB + Aturdir.' +
                        '</div>'
                        ;
                case "2":
                    divHab.innerHTML +=
                        '<div class="rounded-1 p-2 mb-2 " style="background: #ececec;" >' +
                        '       <b>Marca divina: </b>1d4+SAB + Marcado.' +
                        '</div>'
                        ;
                case "1":
                    divHab.innerHTML +=
                        '<div class="rounded-1 p-2 " style="background: #ececec;" >' +
                        '       <b>Curaci??n: </b>Curaci??n de 1d6+SAB. (3 usos por combate)' +
                        '</div>'
                        ;
                    break;

                default:
                    break;
            }
            break;
        case "":
            divPas.innerHTML =
                '<div class="rounded-1 p-2" style="background: #ececec;" >' +
                '       <b>Pasiva de Clase: </b>' +
                '</div>'
                ;
            break;

        default:
            break;
    }

    habilidadesDiv.append(divPas);
    habilidadesDiv.append(divHab);
}

function mejoraNivel() {
    let mejoraClaseDiv = document.getElementById("mejoraClaseDiv");

    mejoraClaseDiv.innerHTML = "";

    let divInput = document.createElement("div");
    //divInput.className = "input-group";
    divInput.innerHTML =
        '<div class="input-group">' +
        '   <span class="input-group-text">+1</span>' +
        '   <select class="form-select claseUpgrade"' +
        '       onchange="actualizarSumaAttr(), actualizarTotMod(), actualizarAtributos();">' +
        '       <option value=""></option>' +
        '       <option value="1">FUE</option>' +
        '       <option value="2">DES</option>' +
        '       <option value="3">CON</option>' +
        '       <option value="4">CAR</option>' +
        '       <option value="5">INT</option>' +
        '       <option value="6">SAB</option>' +
        '   </select>'
    '</div">';

    for (let i = 1; i < nivel; i++) {
        mejoraClaseDiv.innerHTML += divInput.innerHTML + divInput.innerHTML;
    }
    
}

function cambiarPVmax() {
    let pvMaxField = document.getElementById("pvMaxField");
    let pvActuales = document.getElementById("pvActuales");

    let total = atributos[2][0] + atributos[2][1];

    switch (clase) {
        case "Guerrero":
            pvMax = 80 + (total * 5);
            break;
        case "B??rbaro":
            pvMax = 65 + (total * 5);
            break;
        case "P??caro":
            pvMax = 54 + (total * 4);
            break;
        case "Bardo":
            pvMax = 54 + (total * 4);
            break;
        case "Cazador":
            pvMax = 52 + (total * 3);
            break;
        case "Mago":
            pvMax = 52 + (total * 3);
            break;
        case "Cl??rigo":
            pvMax = 43 + (total * 3);
            break;

        default:
            break;
    }


    pvMaxField.innerHTML = "<b>PVmax: </b>" + pvMax;

    pv = pvMax;
    pvActuales.innerText = pv;
}

function actualizarPV(opt) {
    let inputPV = document.getElementById("inputPv");
    let pvActuales = document.getElementById("pvActuales");

    if (pvMax !== "" && inputPV.value !== "") {
        if (opt === "-") {
            if (pv - parseInt(inputPV.value) < 0) {
                pv = 0;
            } else {
                pv -= parseInt(inputPV.value);
            }
        } else if (opt === "+") {
            if (pv + parseInt(inputPV.value) > pvMax) {
                pv = pvMax;
            } else {
                pv += parseInt(inputPV.value);
            }
        }
        pvActuales.innerText = pv;
        inputPV.value = "";
    }
}

function insertarEquipo(boton) {
    let equipoDiv = document.getElementById("equipoDiv");
    let nuevoEquipo = boton.parentNode.parentNode.cloneNode(true);

    boton.parentNode.parentNode.children[0].value = "";

    nuevoEquipo.children[1].children[0].innerText = "-";
    nuevoEquipo.children[1].children[0].onclick = function () {
        eliminarEquipo(this);
    };

    if (nuevoEquipo.children[0].value !== "") {
        equipoDiv.append(nuevoEquipo);
    }
}

function eliminarEquipo(boton) {
    let equipoDiv = document.getElementById("equipoDiv");

    for (let i = 0; i < equipoDiv.children.length; i++) {
        if (equipoDiv.children[i].children[1].children[0] === boton) {
            boton.parentNode.parentNode.remove();
        }
    }
}
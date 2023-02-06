"use strict";

let levelSelect = document.getElementById("levelSelect");
let razaSelect = document.getElementById("razaSelect");
let claseSelect = document.getElementById("claseSelect");
let nivel = levelSelect.value;
let raza = razaSelect.value;
let clase = claseSelect.value;

let dadoBoton = document.getElementById("dadoBoton");
let valoresInput = document.getElementById("valoresInput");
let sumaDiv = document.getElementById("sumaDiv");

let mejoraRazaDiv = document.getElementById("mejoraRazaDiv");
let equipoClaseDiv = document.getElementById("equipoClaseDiv");
let habilidadesDiv = document.getElementById("habilidadesDiv");

let selectRaza;

let valores = [];
function dado() {
    generarValores();
    generarSuma();

    rellenarValoresSelec();
    rellenarSelects();
}

function generarValores() {
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
    valores.splice(0, 1);
    let suma = valores.reduce((a, b) => a + b);
    sumaDiv.hidden = "";
    sumaDiv.innerHTML = "<b>Suma: </b>" + suma;

    if (suma > 23) {
        dadoBoton.disabled = "disabled";
    }
}

let valoresSeleccionados = [
    [0, -1],
    [0, -1],
    [0, -1],
    [0, -1],
    [0, -1],
    [0, -1],
];

function rellenarValoresSelec() {
    for (let i = 0; i < valoresSeleccionados.length; i++) {
        valoresSeleccionados[i][0] = valores[i];
        valoresSeleccionados[i][1] = -1;
    }
}

function rellenarSelects() {
    let selects = document.getElementsByClassName("attrSelect");

    for (let i = 0; i < selects.length; i++) {
        let emptyOption = document.createElement("option");
        emptyOption.value = "";
        emptyOption.innerText = "";

        selects[i].innerHTML = "";
        selects[i].appendChild(emptyOption);

        for (let e = 0; e < valoresSeleccionados.length; e++) {
            let option = document.createElement("option");
            option.value = valoresSeleccionados[e][0];
            option.innerText = valoresSeleccionados[e][0];

            if (valoresSeleccionados[e][1] != -1) {
                //option.disabled = true;
                option.className = "bg-danger text-white";
            } else {
                option.className = "bg-success text-white";
            }
            if (valoresSeleccionados[e][1] === i) {
                option.selected = true;
            }

            selects[i].appendChild(option);
        }
    }
}

function cambiarSelect(opt) {
    rellenarValoresSelec();
    actualizarValoresSelec(opt);
    rellenarSelects();
    actualizarModificador();
}

function actualizarValoresSelec(opt) {
    let selects = document.getElementsByClassName("attrSelect");
    selects = [...selects];

    for (let i = 0; i < selects.length; i++) {
        if (selects[i].selectedIndex > 0) {
            if (selects[i] === opt) {
                valoresSeleccionados[selects[i].selectedIndex - 1][1] = i;
            } else if (selects[i] !== opt && selects[i].selectedIndex === opt.selectedIndex) {
                //valoresSeleccionados[selects[i].selectedIndex - 1][1] = -1;
            } else {
                valoresSeleccionados[selects[i].selectedIndex - 1][1] = i;
            }
        }
    }
}

function actualizarSuma(){
    let sumaSpan = document.getElementsByClassName("attrAddSpan");
    

}

function actualizarModificador() {
    let selects = document.getElementsByClassName("attrSelect");
    let spans = document.getElementsByClassName("modifierSpan");
    raza = razaSelect.value;
    selects = [...selects];
    spans = [...spans];
    let values = [];
    let modifier = [];

    for (let i = 0; i < selects.length; i++) {
        modifier.push(selects[i].value);
    }

    switch (raza) {
        case "Humano":
            selectRaza = document.getElementsByClassName("raceUpgrade");
            selectRaza = [...selectRaza];
            for (let i = 0; i < selectRaza.length; i++) {
                switch (selectRaza[i].value) {
                    case "FUE":
                        modifier[0]++;
                        break;
                    case "DES":
                        modifier[1]++;
                        break;
                    case "CON":
                        modifier[2]++;
                        break;
                    case "CAR":
                        modifier[3]++;
                        break;
                    case "INT":
                        modifier[4]++;
                        break;
                    case "SAB":
                        modifier[5]++;
                        break;

                    default:
                        break;
                }
            }
            break;
        case "Elfo":
            modifier[1]++;
            modifier[4]++;
            break;
        case "Enano":
            modifier[0]++;
            modifier[2]++;
            break;
        case "Mediano":
            modifier[1]++;
            modifier[3]++;
            break;
        case "Goblin":

            modifier[1]++;
            modifier[5]++;
            break;
        case "Orco":

            modifier[0]++;
            modifier[2]++;
            break;
        case "Reptiliano":

            modifier[0]++;
            modifier[3]++;
            break;
        case "Otra":
            selectRaza = document.getElementsByClassName("raceUpgrade");
            selectRaza = [...selectRaza];
            for (let i = 0; i < selectRaza.length; i++) {
                switch (selectRaza[i].value) {
                    case "FUE":
                        modifier[0]++;
                        break;
                    case "DES":
                        modifier[1]++;
                        break;
                    case "CON":
                        modifier[2]++;
                        break;
                    case "CAR":
                        modifier[3]++;
                        break;
                    case "INT":
                        modifier[4]++;
                        break;
                    case "SAB":
                        modifier[5]++;
                        break;

                    default:
                        break;
                }
            }
            break;

        default:
            break;
    }


    for (let i = 0; i < modifier.length; i++) {
        if (modifier[i] <= 6) {
            if(modifier[i]<4){
                values.push("MOD: " + (-3 + (modifier[i] - 1)));
            }else{
                values.push("MOD: +" + (-3 + (modifier[i] - 1)));
            }
        } else {
            values.push("MOD: +" + (Math.ceil(modifier[i] / 2) - 1));
        }

    }

    for (let i = 0; i < spans.length; i++) {
        spans[i].innerText = values[i];
    }

}

function cambioRaza() {
    raza = razaSelect.value;

    let div = document.createElement("div");
    mejoraRazaDiv.innerHTML = "";

    let mejoraRaza = document.createElement("div");
    let mejoraRaza2 = document.createElement("div");

    mejoraRaza.innerHTML =
        '<div class="input-group" style="width: 140px;">' +
        '   <span class="input-group-text" style="width:50px;">+1</span>' +
        '       <select class="form-select raceUpgrade" aria-label="mejoraRaza" onchange="actualizarModificador()">' +
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

    mejoraRaza2.innerHTML =
        '<div class="input-group" style="width: 140px;">' +
        '   <span class="input-group-text" style="width:50px;">+1</span>' +
        '   <select class="form-select raceUpgrade" aria-label="mejoraRaza2" onchange="actualizarModificador()">' +
        '       <option value=""></option>' +
        '       <option value="FUE">FUE</option>' +
        '       <option value="DES">DES</option>' +
        '       <option value="CON">CON</option>' +
        '       <option value="CAR">CAR</option>' +
        '       <option value="INT">INT</option>' +
        '       <option value="SAB">SAB</option>' +
        '   </select>' +
        '</div>'
        ;

    switch (raza) {
        case "Humano":
            div.innerHTML = '<b>Mejora de Raza: </b>' + mejoraRaza.innerHTML + mejoraRaza.innerHTML;
            break;
        case "Elfo":
            div.innerHTML = "<b>Mejora de Raza: </b> +1 Des, +1 Int";
            break;
        case "Enano":
            div.innerHTML = "<b>Mejora de Raza: </b> +1 Fue, +1 Con";
            break;
        case "Mediano":
            div.innerHTML = "<b>Mejora de Raza: </b> +1 Des, +1 Car";
            break;
        case "Goblin":
            div.innerHTML = "<b>Mejora de Raza: </b> +1 Des, +1 Sab";
            break;
        case "Orco":
            div.innerHTML = "<b>Mejora de Raza: </b> +1 Fue, +1 Con";
            break;
        case "Reptiliano":
            div.innerHTML = "<b>Mejora de Raza: </b> +1 Fue, +1 Car";
            break;
        case "Otra":
            div.innerHTML = '<b>Mejora de Raza: </b>' + mejoraRaza.innerHTML + mejoraRaza.innerHTML;
            break;

        default:
            div.innerHTML = "<b>Mejora de Raza: </b>";
            break;
    }

    mejoraRazaDiv.appendChild(div);
    actualizarModificador();
}

function cambioClase() {
    clase = claseSelect.value;

    dibujarEquipo();
    dibujarHabilidades();
}

function dibujarEquipo() {
    let divEqi = document.createElement("div");
    let divAst = document.createElement("div");
    divAst.innerHTML = "<b>*</b> Puede usar el objeto pero no dispone de el inicialmente";

    equipoClaseDiv.innerHTML = "";
    habilidadesDiv.innerHTML = "";

    switch (clase) {
        case "Guerrero":
            clase = "Guerrero";

            divEqi.innerHTML = "<b>Equipo de Clase: </b>Espada(1d6+FUE), *Escudo(Bloqueo)";
            equipoClaseDiv.append(divEqi);
            equipoClaseDiv.append(divAst);
            break;
        case "Bárbaro":
            clase = "Bárbaro";

            divEqi.innerHTML = "<b>Equipo de Clase: </b>Hacha de dos manos(1d6+FUE), *Hacha de mano(1d4+FUE | 3 distancia)";
            equipoClaseDiv.append(divEqi);
            equipoClaseDiv.append(divAst);
            break;
        case "Pícaro":
            clase = "Pícaro";

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

            divEqi.innerHTML = "<b>Equipo de Clase: </b>Bastón(1d6+INT | 4 dis)";
            equipoClaseDiv.append(divEqi);
            break;
        case "Clérigo":
            clase = "Clérigo";

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
    let divPas = document.createElement("div");
    let divHab = document.createElement("div");

    habilidadesDiv.innerHTML = "";

    switch (clase) {
        case "Guerrero":
            divPas.innerHTML =
                '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                '   <div>' +
                '       <b>Pasiva de Clase (Sediento): </b>Al eliminar a un objetivo, gana una acción adicional.' +
                '   </div>' +
                '</div>'
                ;
            break;
        case "Bárbaro":
            divPas.innerHTML =
                '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                '   <div>' +
                '       <b>Pasiva de Clase (Ansia): </b>Cuando tiene un arma en cada mano, puede atacar con las dos armas a la vez en el mismo ataque. De esta forma, lanzaría 2d4+FUE.' +
                '   </div>' +
                '</div>'
                ;
            break;
        case "Pícaro":
            divPas.innerHTML =
                '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                '   <div>' +
                '       <b>Pasiva de Clase (Sombra): </b>Puedes gastar una acción para entrar en sigilo. Al salir de sigilo, hace un ataque crítico.' +
                '   </div>' +
                '</div>'
                ;
            break;
        case "Cazador":
            divPas.innerHTML =
                '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                '   <div>' +
                '       <b>Pasiva de Clase (Hábil tirador): </b>Si atacas sin haberte movido, ganas +1 al daño.' +
                '   </div>' +
                '</div>'
                ;
            break;
        case "Bardo":
            divPas.innerHTML =
                '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                '   <div>' +
                '       <b>Pasiva de Clase (Canción Grupal): </b>Si realizas un hechizo sobre un aliado, puedes aplicar el mismo efecto a otro aliado que se encuentre adyacente al primero.' +
                '   </div>' +
                '</div>'
                ;
            switch (nivel) {
                case "3":
                    divHab.innerHTML +=
                        '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                        '   <div>' +
                        '       <b>Melodía debilitante: </b>1d4+CAR+Debilitado.' +
                        '   </div>' +
                        '</div>'
                        ;
                case "2":
                    divHab.innerHTML +=
                        '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                        '   <div>' +
                        '       <b>Canción motivadora: </b>El aliado tira con ventaja durante su turno.' +
                        '   </div>' +
                        '</div>'
                        ;
                case "1":
                    divHab.innerHTML +=
                        '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                        '   <div>' +
                        '       <b>Canción regenerante: </b>Curación de 1d4+CAR. (3 usos por combate)' +
                        '   </div>' +
                        '</div>'
                        ;
                    break;

                default:
                    break;
            }
            break;
        case "Mago":
            divPas.innerHTML =
                '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                '   <div>' +
                '       <b>Pasiva de Clase (Maná): </b>Por cada hechizo lanzado, acumula un punto de maná. Los puntos de maná se pueden consumir para sumar +1 al daño de un ataque. Se pueden acumular un máximo de siete puntos de maná.' +
                '   </div>' +
                '</div>'
                ;
            switch (nivel) {
                case "3":
                    divHab.innerHTML +=
                        '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                        '   <div>' +
                        '       <b>Juntar: </b>1d4+INT en área y junta a los enemigos.' +
                        '   </div>' +
                        '</div>'
                        ;
                case "2":
                    divHab.innerHTML +=
                        '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                        '   <div>' +
                        '       <b>Aturdir: </b>1d4+INT + Aturdir.' +
                        '   </div>' +
                        '</div>'
                        ;
                case "1":
                    divHab.innerHTML +=
                        '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                        '   <div>' +
                        '       <b>Explosión: </b>1d4+INT en área.' +
                        '   </div>' +
                        '</div>'
                        ;
                    break;

                default:
                    break;
            }
            break;
        case "Clérigo":
            divPas.innerHTML =
                '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                '   <div>' +
                '       <b>Pasiva de Clase (Mi religión me lo permite): </b>Cuando lanza un hechizo, otorga +1 de daño a un aliado cercano.' +
                '   </div>' +
                '</div>'
                ;
            switch (nivel) {
                case "3":
                    divHab.innerHTML +=
                        '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                        '   <div>' +
                        '       <b>Aturdir: </b>1d4+SAB + Aturdir.' +
                        '   </div>' +
                        '</div>'
                        ;
                case "2":
                    divHab.innerHTML +=
                        '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                        '   <div>' +
                        '       <b>Marca divina: </b>1d4+SAB + Marcado.' +
                        '   </div>' +
                        '</div>'
                        ;
                case "1":
                    divHab.innerHTML +=
                        '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                        '   <div>' +
                        '       <b>Curación: </b>Curación de 1d6+SAB. (3 usos por combate)' +
                        '   </div>' +
                        '</div>'
                        ;
                    break;

                default:
                    break;
            }
            break;
        case "":
            divPas.innerHTML =
                '<div class="border border-1 rounded-1 p-2 mb-3 " style="max-width: 95%; background: #f8f8f8;" >' +
                '   <div>' +
                '       <b>Pasiva de Clase: </b>' +
                '   </div>' +
                '</div>'
                ;
            break;

        default:
            break;
    }

    habilidadesDiv.append(divPas);
    habilidadesDiv.append(divHab);
}

function cambioNivel() {
    nivel = levelSelect.value;

    dibujarHabilidades();
}
let palabra_adivinar;
let cant_errores = 0;//cuantes veces me equivoqué
let cant_aciertos = 0;//cuantas letras acerté

const palabras = ["PRESIDENTE", "TELESCOPIO", "PINOCHO", "BICICLETA", "MURCIELAGO", "ORQUIDEA", "VERSICULO", "ASTEROIDE", "PEATON", "COMPUTADORA"];
const btn_letras = document.querySelectorAll("#teclado button");
const imagen = id("base");
const btn = id("nuevo-juego");
const desistir = id("desistir");
const agregarPalabra = id("agregar-palabra");
const guardar = id("guardar")
var cajaTexto = id("ingrese-palabra");
var pasa = true
document.getElementById("juego").style.display = "none"
document.getElementById("agregar").style.display = "none"

//Click para iniciar el juego
btn.addEventListener("click", iniciar);
function iniciar(event){
    for(let i = 0;i < btn_letras.length;i++){
       
        btn_letras[i].style.setProperty("background-color", "white");
    }

    id("juego").style.display = ""
    id("pag-principal").style.display = "none"
    imagen.src = "img/img0.jpg";
    btn.disabled = true;
    id("resultado").innerHTML = "";
    cant_errores = 0;
    cant_aciertos = 0;
    const parrafo = id("guiones")
    parrafo.innerHTML = ""
    const cant_palabras = palabras.length
    const valor_al_azar = obtenerRandom(0,cant_palabras);
    
    palabra_adivinar = palabras[valor_al_azar];
    const cant_letras = palabra_adivinar.length;
    console.log(palabra_adivinar);

    for( let i = 0; i < btn_letras.length; i++ ){
        btn_letras[i].disabled = false;
    } 

    for( let i = 0; i < cant_letras; i++ ){
        const span = document.createElement("span");
        parrafo.appendChild(span);
    }
}

//Click adivinar letra
for(let i = 0;i < btn_letras.length;i++){
    btn_letras[i].addEventListener("click", click_teclado);
    btn_letras[i].addEventListener("mousemove", function(event){
        event.target.style.backgroundColor = "royalblue"
    });
    btn_letras[i].addEventListener("mouseleave", function(event){
        event.target.style.backgroundColor = "white"
    });
}

function click_teclado(event){
    const spans = document.querySelectorAll("#guiones span");
    const button = event.target;//cual de todas las letras, llamó a la función 
    button.disabled = true;
    const letra = button.innerHTML.toUpperCase();
    const palabra = palabra_adivinar.toUpperCase();// .toUpperCase();
    console.log(palabra_adivinar);
    
    let acerto = false
    for ( let i = 0; i < palabra.length; i++){
        if(letra == palabra[i]){
            //la variable i es la posicion de la letra en la palabra.
            //que coincido con el span al que tenemos que mostrarle esta letra...
            spans[i].innerHTML = letra;
            cant_aciertos++;
            acerto = true
            button.style.backgroundColor = "lime"
        }        
    }
    
    if(acerto == false){
        cant_errores++;
            const source = `img/img${cant_errores}.jpg`;
            const imagen = id("base");
            imagen.src = source
            button.style.backgroundColor = "coral"
    }

    if(cant_errores == 7){
        id("resultado").innerHTML ="Perdiste, la palabra era " + palabra_adivinar;
        game_over( );
    }else if(cant_aciertos == palabra_adivinar.length){
        id("resultado").innerHTML ="Ganaste!";
        game_over( );
    }

    console.log("La letra " + letra + " en la palabra " + palabra + " ¿existe?: " + acerto);
}

//Fin del juego
function game_over( ){
    for(let i = 0;i < btn_letras.length;i++){
        btn_letras[i].disabled = true;
        btn_letras[i].style.setProperty("background-color", "white");
    }
    btn.disabled = false;
}

game_over();

//Click para volver
desistir.addEventListener("click", volver);
function volver (){
    id("ingrese-palabra").value=""
    id("juego").style.display = "none"
    id("pag-principal").style.display = ""
    id("agregar").style.display = "none"
}

agregarPalabra.addEventListener("click", ocultar);
function ocultar (){
    id("pag-principal").style.display = "none";
    id("agregar").style.display = "";
}
//Click en guardar palabra
guardar.addEventListener("click", function (e){
    e.preventDefault();
    let reg = new RegExp("^[a-zA-Z ]*$", "g");
    const ingresar = id("ingrese-palabra").value;
    const nuevaPalabra = ingresar.toUpperCase();
    
    if (nuevaPalabra.length < 3 || nuevaPalabra.length > 8) {
        alert("Cantidad de letras no valida", "warning", 1800);
        cajaTexto.value = "";
        pasa = false;
    }
    
    if (!reg.test(nuevaPalabra)) {
        alert("No se permiten numeros o signos", "warning", 1800);
        cajaTexto.value = "";
        pasa = false;
    }
    
    if (palabras.includes(nuevaPalabra)) {
        alert("Esta palabra ya existe", "warning", 1800);
        cajaTexto.value = "";
        pasa = false
    }

    if (pasa == true){
        palabras.push(nuevaPalabra);
        alert("La palabra se ha guardado con éxito!");
        cajaTexto.value = "";
        id("agregar").style.display = "none";
        id("juego").style.display = "";
    }
});
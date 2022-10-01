function id (str){
    return document.getElementById(str);
}

function obtenerRandom(num_min, num_max){
    const amplitud_valores = num_max - num_min; //valor mas alto - valor mas bajo del random (0,4)
    const valor_al_azar = Math.floor(Math.random() * amplitud_valores) + num_min;
    return valor_al_azar;
}
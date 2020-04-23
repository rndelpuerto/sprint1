/**
 * textoDato
 * 
 * Da formato a un dato pasado por parámetro y 
 * devuelve una cadena de texto con el formato 
 * necesario.
 * 
 * @param {Integer} dato 
 * @param {String}  cadenaTipoDato 
 * @param {Boolean} concat 
 * 
 * @return {String}
 */
function textoDato(dato, cadenaTipoDato, concat) 
{
    return (concat ? ', ' : '') 
            + `${ dato } ` 
            + ((dato === 1) ? cadenaTipoDato : (cadenaTipoDato + 's'));
}



/**
 * duracionParaHumanos
 * 
 * Recibe una cantidad de segundos y devuelve 
 * una cadena de texto con una interpretación 
 * más simple del tiempo para un humano.
 * 
 * @param {Integer} segundos 
 * 
 * @return {String}
 */
function duracionParaHumanos(segundos) 
{
    if(segundos === 0) return "ahora";

    let tiempoTranscurrido = "";

    let   minutos = Math.trunc(segundos / 60);
    let   horas   = Math.trunc(minutos  / 60);
    let   dias    = Math.trunc(horas    / 24);
    const anios   = Math.trunc(dias     / 365);

    segundos %= 60;
    minutos  %= 60;
    horas    %= 24;
    dias     %= 365;

    if(anios    > 0) tiempoTranscurrido  = textoDato(anios,    "año",     false);
    if(dias     > 0) tiempoTranscurrido += textoDato(dias,     "día",     !!tiempoTranscurrido);
    if(horas    > 0) tiempoTranscurrido += textoDato(horas,    "hora",    !!tiempoTranscurrido);
    if(minutos  > 0) tiempoTranscurrido += textoDato(minutos,  "minuto",  !!tiempoTranscurrido);
    if(segundos > 0) tiempoTranscurrido += textoDato(segundos, "segundo", !!tiempoTranscurrido);

    // Anteponemos ' y ' al último dato y retornamos el string.
    return tiempoTranscurrido.replace(/, ([^,]*)$/," y $1");
}





/**
 * Debug
 */

console.log(duracionParaHumanos(0));        // "ahora"
console.log(duracionParaHumanos(1));        // "1 segundo"
console.log(duracionParaHumanos(62));       // "1 minuto y 2 segundos"
console.log(duracionParaHumanos(3662));     // "1 hora, 1 minuto y 2 segundos"
console.log(duracionParaHumanos(43424234)); // "1 año, 137 días, 14 horas, 17 minutos y 14 segundos" 
console.log(duracionParaHumanos(4342440));  // "50 días, 6 horas y 14 minutos"
let elementSeconds = document.getElementById("seconds")
let initialSecondsTimer = elementSeconds.innerHTML
let seconds = parseInt(initialSecondsTimer)
let intervalID
// L'input qui incremente/decremente les minutes du timer principal
let elementTotalMinutesTimer = document.getElementById("totalMinutesTimer")
let totalMinutesTimer = parseInt(elementTotalMinutesTimer.value)
let elementMinutes = document.getElementById("minutes")
let initialMinutesTimer = parseInt(elementMinutes.innerHTML)
let initialMinutesBreak = 5
let minutes = initialMinutesTimer
let initialMessage = document.getElementById("message").textContent
let clockState = 'stopped'

// Initialiser le timer, i.e. les minutes et secondes initialisee tel
// que desire (e.g. 25:00 ou 5:00) et arreter setInterval()
// NOTE: on peut initialiser le timer avec des minutes quelconques en passant
// les minutes desirees via le parametre initialMinutes
function initTimer(initialMinutes=null) {
    clearInterval(intervalID)
    // Par defaut, on initialise les minutes du timer aux minutes determinees
    // par l'input qui incremente/decremente les minutes
    if (initialMinutes===null) {
        initialMinutes = parseInt(elementTotalMinutesTimer.value)
    }
    minutes = initialMinutes
    seconds = parseInt(initialSecondsTimer)
    elementMinutes.innerHTML = initialMinutes
    elementSeconds.innerHTML = initialSecondsTimer
}

// Demarrer le timer, i.e. modifier l'affichage des minutes et secondes
// au fur et a mesure que setInterval() appelle la fonction anonyme a chaque seconde
function startTimer(initialMinutes=null) {
    initTimer(initialMinutes)
    startStop.textContent = "STOP"
    intervalID = setInterval(function(){
        // Condition car on commence a 0 sec et lorsquon decremente on ne veut pas
        // se retrouver ds le negatif on veut de 0 on aille a 59 sec
        if (seconds == 0){
            seconds = 60;  // 6 pour debogguer
            if (minutes == 0) {
                // Stop Timer car toutes les minutes et secondes se sont ecoulees
                // c'est-a-dire le timer affiche 0:00
                stopTimer()
                // Si on ne returne pas, on continue avec le reste du code et on
                // aura seconds = 0 -> seconds = 0 - 1 = - 1 (probleme)
                return;
            }
            else {
                // C'est le moment de changer les minute (afficher une minute de moins)
                minutes = minutes - 1
                elementMinutes.innerHTML = minutes
            }
        }
        seconds = seconds - 1
        // pcq les valeurs en bas de 10 n'est pas beau sans un 0 extra alors
        // on rajoute un 0 devant la valeur numerique en bas de 10 donc de 0 a 9
        // ex: 9 sec vs 09
        if (seconds < 10){
            elementSeconds.innerHTML = "0" + seconds;
        }
        else {
            elementSeconds.innerHTML = seconds
        }
    }, 1000)  // 1000 milisecondes = 1 seconde
}

// Arreter le timer, i.e. l'affichage doit etre remis a l'etat initial et le
// texte des bouttons doivent afficher START
function stopTimer() {
    initTimer()
    // Puisque le temps s'est ecoule, il faut remettre le texte des bouttons a START
    message.textContent = initialMessage
    startStop.textContent = "START"
    shortBreak.textContent = "START"
    clockState = 'stopped'
}
// des que la page html load function anonyme attendre que toutes les sources (assets) soit loader
window.onload = function() {
    shortBreak.addEventListener("click", function (){
        console.log("shortBreak Clicked!")
        // Si le timer principal a ete demarre, le bouton shortBreak n'a aucun effet
        if (clockState == 'timerStarted') {
            //une maniere de Stopper ne retourne rien comme bloquer
            return;
        }
        // Changer le texte des bouttons principal et shortBreak a STOP si le timer a demarre
        // Autrement a START si le timer a ete arrete
        if (clockState == 'stopped'){
            // Cas: le timer du break a demarre
            message.textContent = 'STARTING BREAK...'
            shortBreak.textContent = "STOP"
            // Il faut initialiser les minutes du break differemment que pour le timer principal
            // e.g. 5 mins break au lieu de 25 minutes du timer principal
            startTimer(initialMinutesBreak)
            clockState = 'breakStarted'
        }
        else {
            // Cas: le timer du break a ete arrete
            stopTimer()
        }
    })
    startStop.addEventListener("click", function (){
        console.log("startStop Clicked!")
        // Changer le texte du boutton principal a STOP si le timer a demarre
        // Autrement a START si le timer a ete arrete
        if (clockState == 'stopped'){
            // Cas: le timer principal a demarre
            message.textContent = 'STARTING TIMER...'
            startTimer()
            clockState = 'timerStarted'
        }
        else {
            // Cas: le timer principal a ete arrete
            stopTimer()
        }
    })
}

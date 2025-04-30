const squares = document.querySelectorAll('.square');
const score = document.querySelector('#score');
const timeLeft = document.querySelector('#time-left');
const difficultySelector = document.querySelector('#difficulty');

let result = 0;
let currentTime = 60;
let hitPosition;
let timerId;
let emojiSpeed = 1000; // velocità iniziale dell'emoji

// commento da eliminare

function randomSquare() {
    // Puliamo tutti i quadrati
    squares.forEach((square) => {
        square.classList.remove('emoji');
    });
    // Prendiamo un quadrato casuale
    let randomSquare = squares[Math.floor(Math.random() * 9) + 1];
    // Aggiungiamo la classe 'emoji'
    randomSquare.classList.add('emoji');
    // Salviamo la posizione del quadrato giusto
    hitPosition = randomSquare.id;
}

function moveEmoji() {
    timerId = setInterval(randomSquare, 500);
}

function countdown() {
    // Decrementa il tempo rimanente di un secondo
    currentTime--;
    timeLeft.textContent = currentTime; // Aggiorna il tempo rimanente sullo schermo

    // Se il tempo è scaduto, ferma il gioco
    if (currentTime === 0) {
        clearInterval(timerId); // Ferma il timer dell'emoji
        clearInterval(countdownTimerId); // Ferma il timer del countdown
        alert('Game Over! Your score is ' + result); // Mostra il punteggio finale
    }
}

squares.forEach((square) => {
    // Aggiungi un evento di ascolto per il click su ogni quadrato
    square.addEventListener('mousedown', () => {
        // Se il quadrato cliccato è quello giusto
        if (square.id === hitPosition) {
            result++; // Incrementa il punteggio
            score.textContent = result; // Aggiorna il punteggio sullo schermo
            hitPosition = null; // Resetta l'indice dell'emoji
        }
    });
});
difficultySelector.addEventListener('change', () => {
    const difficulty = difficultySelector.value;
    if (difficulty === 'easy') {
        emojiSpeed = 1000; // 1 secondo
    } else if (difficulty === 'medium') {
        emojiSpeed = 500; // 0.7 secondi
    } else if (difficulty === 'hard') {
        emojiSpeed = 400; // 0.4 secondi
    }

    // ricomincia il movimento delle emoji con la nuova velocità
});

function moveEmoji() {
    clearInterval(timerId); // ferma il timer precedente
    timerId = setInterval(randomSquare, emojiSpeed); // usa la velocità aggiornata
}

// Inizializza il gioco
moveEmoji();
let countdownTimerId = setInterval(countdown, 1000);

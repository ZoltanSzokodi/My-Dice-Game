let output = document.querySelector('.output');
const player_1 = document.querySelector('.player-1');
const player_2 = document.querySelector('.player-2');
const player_1_score = document.querySelector('#player-1-score');
const player_2_score = document.querySelector('#player-2-score');
let winner_score = document.querySelector('.winner-score');
const reset_btn = document.querySelector('.reset');
let player_1_ID = document.getElementById('roll-player-1');
let player_2_ID = document.getElementById('roll-player-2');

const dice_1 = document.querySelector('.player-1:first-child');
const dice_2 = document.querySelector('.player-2:first-child');

// Event listeners
player_1_ID.addEventListener('click', rollDice);
player_2_ID.addEventListener('click', rollDice);
//reset_btn.addEventListener('click', resetGame);
reset_btn.onclick = resetGame;
winner_score.oninput = maxMinScores;

// Functions
let current_scores = [0, 0];
player_1_ID.disabled = false;
player_2_ID.disabled = true;
player_1_ID.style.cursor = 'pointer';
player_2_ID.style.cursor = 'not-allowed';

// Roll the dice
function rollDice(event) {
    let roll_array = [roll(6), roll(6)];
    winner_score.disabled = true;
    console.log(roll_array)
    
    if(event.target.id === "roll-player-1") {
        current_scores[0] += Number(roll_array[0][0]);
        player_1_score.innerText = `Score: ${current_scores[0]}`;
        player_1.innerHTML = roll_array[0].slice(roll_array[0].indexOf('&'));
        player_1_ID.disabled = true;
        player_2_ID.disabled = false;
        player_2_ID.style.cursor = 'pointer';
        player_1_ID.style.cursor = 'not-allowed';
    } else {
        current_scores[1] += Number(roll_array[1][0]);
        player_2_score.innerText = `Score: ${current_scores[1]}`;
        player_2.innerHTML = roll_array[1].slice(roll_array[1].indexOf('&'));
        player_2_ID.disabled = true;
        player_1_ID.disabled = false;
        player_1_ID.style.cursor = 'pointer';
        player_2_ID.style.cursor = 'not-allowed';
    }
    checkWinner(current_scores);
}

// Create random numbers between 1 and 6
function roll(number) {
    let roll_number = Math.floor(Math.random() * number + 1);
    return `${roll_number} &#${9855 + roll_number};`;
}

// Check the winner score
function checkWinner(array) {
    return array.forEach(score => {
        if(score >= winner_score.value) {
            output.innerText = score === array[0] ? 'Player 1 wins!' : 'Player 2 wins!';
            player_1_ID.disabled = true;
            player_2_ID.disabled = true;
            player_1_ID.style.cursor = 'not-allowed';
            player_2_ID.style.cursor = 'not-allowed';
        }
    })
}

// Maximize winner score input number
 function maxMinScores() {
     if (this.value.length > 2) {
         this.value = this.value.slice(0, 2);
     } else if (this.value.length < 2) {
         this.value = 10;
     }
 }

// Reset the game
function resetGame() {
    current_scores = [0, 0];
    winner_score.value = 21;
    winner_score.disabled = false;
    player_1_score.innerText = `Score: ${0}`;
    player_2_score.innerText = `Score: ${0}`;
    player_1_ID.disabled = false;
    player_2_ID.disabled = true;
    player_1_ID.style.cursor = 'pointer';
    player_2_ID.style.cursor = 'not-allowed';
    output.innerText = 'The Ultimate Dice Game';
}

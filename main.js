const keyboard_container = document.querySelector(".keyboard_container");
const word_display_ul = document.querySelector(".word_display_ul");
const hint_text = document.querySelector(".hint_text b");
const guess_counts_text = document.querySelector(".guess_counts_text b");
const hangman_pic = document.querySelector(".hangman_pic");
const overlay_notification_container = document.querySelector(".overlay_notification_container");
const playagain_btn = document.querySelector(".playagain_btn");
const result_description = document.querySelector(".result_description");
const winlose_gif = document.querySelector(".winlose_gif");
const winlose_title = document.querySelector(".winlose_title");
let current_word;
let correct_letters_arr;
let total_guess_count = 6;
let wrong_guess_count = 0;

// ========================= resetting all the global variables of game and updating into the DOM as the page loads show it as starting of a new game ========================= 
const Reset_Game = () => {
    wrong_guess_count = 0;
    correct_letters_arr = [];
    guess_counts_text.innerHTML = `${wrong_guess_count} / ${total_guess_count}`;
    overlay_notification_container.classList.remove("show");
    hangman_pic.src = `images/hangman-${wrong_guess_count}.svg`;
    const all_keyboard_btns = keyboard_container.querySelectorAll(".keyboard_btns");
    all_keyboard_btns.forEach((each_keyboard_btn)=>{
        each_keyboard_btn.disabled = false;
    })
}

// =============================== destucturing the word & it's hint from the array of objects generating random word & it's hint from the array of objects ===============================
const generate_Random_hint_text_and_word = () => {
    const {word, hint} = wordlist_database[Math.floor(Math.random() * wordlist_database.length)];
    current_word = word;
    console.log(current_word);
    hint_text.innerText = hint;
    word_display_ul.innerHTML = word.split("").map(()=>`<li class="letters"></li>`).join("");
    Reset_Game();
}

// =============================== show hide & manipulate the overlay notification container's content according to the user's winning or losing state ===============================
const GameOver = (is_userwon) => {
    setTimeout(() => {
        result_description.innerHTML = is_userwon ? `you won the game`:`the correct word was <b>${current_word}</b>`;
        winlose_gif.src = is_userwon ? `images/win.gif`: `images/lose.gif`;
        winlose_title.innerText = is_userwon ? `congratstulations`: `game over`;
        overlay_notification_container.classList.add("show");
    }, 100);
}

playagain_btn.onclick = function() {
    generate_Random_hint_text_and_word();
}

const initialize_game = (clicked_button, clicked_letter_text) => {
    // ========================= includes methods works like our search bar functionality it will check if the text we pass through out the parameter exists in the particular elements then it wil return text conditionally clicked_letter_text is the string.fromcharcode(keybaord_code_into_string) ==========================
    if(current_word.includes(clicked_letter_text)) {
        console.log(`${clicked_letter_text} exists on the word ${current_word}`);
        [...current_word].forEach((each_li_text, index)=>{
        // ================================================== conversion of randomly generated word (string) into an array and using spread operator we got arrays of each letters of randomly generated word e.g word is telescope the resulted array will be like ["t","e","l","e","s","c","o","p","e"]; like that then if the clickedbtn_text is same as the each_li_text means li elements's text then add the particular class and change the particular elements text using [index] indexed element ==================================================
            if(each_li_text === clicked_letter_text) {
                correct_letters_arr.push(each_li_text);
                word_display_ul.querySelectorAll(".letters")[index].innerText = each_li_text;
                word_display_ul.querySelectorAll(".letters")[index].classList.add("guessed_letter");
            }
        })
    }
    else {
        // ========================= increment the guess count whenever user's gueesed the wrong guess & update the hangman pic =========================
        console.log(`${clicked_letter_text} doesn't exists on the word ${current_word}`);
        wrong_guess_count++;
        hangman_pic.src = `images/hangman-${wrong_guess_count}.svg`;
    }
    clicked_button.disabled = true;
    clicked_button.setAttribute("title","Disabled");
    guess_counts_text.innerHTML = `${wrong_guess_count} / ${total_guess_count}`;
    if(wrong_guess_count === total_guess_count) {
        return GameOver(false);
        // ========================= gameover function's parameter true false declares the user won or lost the game by conditions if the user reached the total_guess_count limit which is upto currently 5 then the user lost the game as in current scenario ==================================================
    }
    if(correct_letters_arr.length === current_word.length) {
        // whereas if the correct_letters_arr which is ul>li's elements length is equal to currentword's arr's length from all the randomly generated words then the user won the game as in current scenario ==================================================
        return GameOver(true);
    }
}

for(let index=97;index<=122;index++) {
    // ========================= standard keyboard keys range from 97 to 122 which is used in for loop =========================
    let keyboard_btn = document.createElement("button");
    keyboard_btn.className = "keyboard_btns";
    keyboard_btn.innerText = String.fromCharCode(index);
    keyboard_container.appendChild(keyboard_btn);
    keyboard_btn.addEventListener("click",(e)=>{
        initialize_game(e.target,String.fromCharCode(index));
    })
}
generate_Random_hint_text_and_word();
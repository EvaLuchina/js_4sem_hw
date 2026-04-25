const input = document.getElementById('input');
const inputBtn = document.getElementById('inputBtn');
const resetBtn = document.getElementById('resetBtn');
const invalid = document.getElementById('invalid');
const guesses = document.getElementById('guesses');

const generateNumber = () => {
    let random = Math.floor(Math.random() * 100) + 1;
    return random;
}

const check = (a, b) => {
    if (a > 100 || a < 0 || a === '') {
        return false
    } else if (a < b) {
        return 'Too small';
    } else if (a > b) {
        return 'Too big';
    } else {
        return 'Hooray you guessed it!';
    }
}

let num = generateNumber() 

resetBtn.addEventListener('click', () => {
    num = generateNumber();
    const ul = document.querySelectorAll('li')
    ul.forEach(li => {
        li.remove();
    });
});

inputBtn.addEventListener('click', () => {
    const li = document.createElement('li');
    if (!check(input.value, num)){
        invalid.textContent = 'Invalid number!';
    } else {
        invalid.textContent = '';
        li.innerHTML = `<p>Your guess: ${input.value}. ${check(input.value, num)}</p>`
        guesses.append(li);  
    }

    if (check(input.value, num) === 'Too small') {
        li.classList.add('small');
    } else if (check(input.value, num) === 'Too big') {
        li.classList.add('big');
    } else {
        li.classList.add('correct');
    }

    input.value = '';
});
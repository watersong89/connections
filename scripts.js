const groupOne = ['red', 'blue', 'green', 'pink'];
const groupTwo = ['one', 'two', 'three', 'four'];
const groupThree = ['a', 'b', 'c', 'd'];
const groupFour = ['north', 'south', 'east', 'west'];

let input = [];

function checkMatches(input, group) {
  let correctGuesses = 0;

  for (let i = 0; i < group.length; i++) {
    const element = group[i];
    if (input.includes(element)) {
      correctGuesses++;
    }
  }

  if (correctGuesses === 3) {
    console.log('one away');
  } else if (correctGuesses === 4) {
    console.log('correct');
  } else {
    console.log('incorrect');
  }
}

const boxes = document.querySelectorAll('.box');
let toggledItems = 0;
boxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (box.classList.contains('toggled')) {
      const index = input.indexOf(box.textContent);
      box.classList.remove('toggled');
      toggledItems--;
      input.splice(index, 1);
    } else if(toggledItems === 4) return; 
      else {
      box.classList.add('toggled');
      input.push(box.textContent)
      toggledItems++;
    }
  })
})

function playGame() {
  checkMatches(input, groupOne);
  checkMatches(input, groupTwo);
  checkMatches(input, groupThree);
  checkMatches(input, groupFour);
  input = [];
}

const submitButton = document.querySelector('.submit-button');

submitButton.addEventListener('click', () => {
  playGame();
})
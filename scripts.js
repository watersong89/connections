const groupOne = ['red', 'blue', 'green', 'pink'];
const groupTwo = ['one', 'two', 'three', 'four'];
const groupThree = ['a', 'b', 'c', 'd'];
const groupFour = ['north', 'south', 'east', 'west'];

let input = [];
let toggledItems = 0;

const boxes = document.querySelectorAll('.box');
const submitButton = document.querySelector('.submit-button');
const deselectButton = document.querySelector('.deselect-button');
const shuffleButton = document.querySelector('.shuffle-button')



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

function clearSelection() {
  boxes.forEach((box) => {
    box.classList.remove('toggled')
  })
  input = [];
  toggledItems = 0;
}

function playGame() {
  checkMatches(input, groupOne);
  checkMatches(input, groupTwo);
  checkMatches(input, groupThree);
  checkMatches(input, groupFour);
  input = [];
  clearSelection();
}


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



submitButton.addEventListener('click', () => {
  playGame();
})

deselectButton.addEventListener('click', () => {
  clearSelection();
})
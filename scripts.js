const groupOne = ['red', 'blue', 'green', 'pink'];
const groupTwo = ['one', 'two', 'three', 'four'];
const groupThree = ['a', 'b', 'c', 'd'];
const groupFour = ['north', 'south', 'east', 'west'];

let input = [];
let toggledItems = 0;

const grid = document.querySelector('.grid-container');
const boxes = document.querySelectorAll('.box');
const submitButton = document.querySelector('.submit-button');
const deselectButton = document.querySelector('.deselect-button');
const shuffleButton = document.querySelector('.shuffle-button');
const messageBoard = document.querySelector('.message-board');

function checkMatches(input, group) {
  let correctGuesses = 0;
  for (let i = 0; i < group.length; i++) {
    const element = group[i];
    if (input.includes(element)) {
      correctGuesses++;
    }
  }
  if (correctGuesses === 3) {
    return 'one away';
  } else if (correctGuesses === 4) {
    return 'correct';
  } else {
    return 'incorrect';
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
  const resultGroupOne = checkMatches(input, groupOne);
  const resultGroupTwo = checkMatches(input, groupTwo);
  const resultGroupThree = checkMatches(input, groupThree);
  const resultGroupFour = checkMatches(input, groupFour);

  if (resultGroupOne === 'one away') {
    messageBoard.textContent = 'One Away!';
  } else if (resultGroupOne === 'correct') {
    messageBoard.textContent = 'Correct!';
    handleCorrectMatches('group1');
  } else if (resultGroupOne === 'incorrect') {
    messageBoard.textContent = 'Incorrect!';
  }

  if (resultGroupTwo === 'one away') {
    messageBoard.textContent = 'One Away!';
  } else if (resultGroupTwo === 'correct') {
    messageBoard.textContent = 'Correct!';
    handleCorrectMatches('group2');
  }

  if (resultGroupThree === 'one away') {
    messageBoard.textContent = 'One Away!';
  } else if (resultGroupThree === 'correct') {
    messageBoard.textContent = 'Correct!';
    handleCorrectMatches('group3');
  }

  if (resultGroupFour === 'one away') {
    messageBoard.textContent = 'One Away!';
  } else if (resultGroupFour === 'correct') {
    messageBoard.textContent = 'Correct!';
    handleCorrectMatches('group4');
  }

  input = [];
  clearSelection();
}

function handleCorrectMatches(group) {
  boxes.forEach((box) => {
    if (box.classList.contains(group)) {
      box.classList.add('correct');
      box.classList.remove('on');
      box.classList.add('off');
    }
  });
}

function shuffleGrid() {
  for (let i = grid.children.length; i >= 0; i--) {
    grid.appendChild(grid.children[Math.floor(Math.random() * i) | 0]);
  }
}


boxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (box.classList.contains('off')) return;
    else if (box.classList.contains('toggled')) {
      const index = input.indexOf(box.textContent);
      box.classList.remove('toggled');
      toggledItems--;
      input.splice(index, 1);
    } else if (toggledItems === 4) return;
    else {
      box.classList.add('toggled');
      input.push(box.textContent)
      toggledItems++;
    }
  })
})

submitButton.addEventListener('click', () => {
  messageBoard.textContent = '';
  playGame();
})

deselectButton.addEventListener('click', () => {
  clearSelection();
})

shuffleButton.addEventListener("click", () => {
  shuffleGrid();
});

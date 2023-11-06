const groupOne = ['red', 'blue', 'green', 'pink'];
const groupTwo = ['one', 'two', 'three', 'four'];
const groupThree = ['a', 'b', 'c', 'd'];
const groupFour = ['north', 'south', 'east', 'west'];

let input = [];
let toggledItems = 0;
let remainingGuesses = 4;
let alreadyChosen = false;
let gameSelection = [];
let userHistory = [];

const grid = document.querySelector('.grid-container');
const boxes = document.querySelectorAll('.box');
const submitButton = document.querySelector('.submit-button');
const deselectButton = document.querySelector('.deselect-button');
const shuffleButton = document.querySelector('.shuffle-button');
const messageBoard = document.querySelector('.message-board');
const guessesRemaining = document.querySelector('.guesses-remaining')
const userHistoryElement = document.querySelector('.user-history');


function arraysAreEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
}

function itemiseHistory() {
  alreadyChosen = false;
  gameSelection = [];

  // Loop through boxes to find the toggled ones
  boxes.forEach((box) => {
    if (box.classList.contains('toggled')) {
      gameSelection.push(box);
    }
  });

  // Check for duplicates within userHistory
  for (let i = 0; i < userHistory.length; i++) {
    if (arraysAreEqual(userHistory[i], gameSelection)) {
      alreadyChosen = true;
      break;
    }
  }

  if (alreadyChosen) {
    alert('Already chosen');
  } else {
    userHistory.push([...gameSelection]); // Clone the array to avoid reference issues
  }
}


function displayUserHistory() {
  userHistoryElement.innerHTML = ''; // Clear the user history grid

  userHistory.forEach((selection) => {
    const historyRow = document.createElement('div');
    historyRow.classList.add('history-row');

    selection.forEach((item) => {
      const historySquare = document.createElement('div');
      historySquare.classList.add('history-square', `group${getGroup(item)}`);
      historyRow.appendChild(historySquare);
    });

    userHistoryElement.appendChild(historyRow);
  });
}

function getGroup(item) {
  if (item.classList.contains('group1')) return 1;
  if (item.classList.contains('group2')) return 2;
  if (item.classList.contains('group3')) return 3;
  if (item.classList.contains('group4')) return 4;
  return 0; // Default or no group
}




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

  if (alreadyChosen) {
    clearSelection();
    return;
  }

  if (resultGroupOne === 'one away' || resultGroupTwo === 'one away' || resultGroupThree === 'one away' || resultGroupFour === 'one away') {
    messageBoard.textContent = 'One Away!';
    remainingGuesses--;
    clearSelection();
  } else if (resultGroupOne === 'correct' || resultGroupTwo === 'correct' || resultGroupThree === 'correct' || resultGroupFour === 'correct') {
    messageBoard.textContent = 'Correct!';
    if (resultGroupOne === 'correct') {
      handleCorrectMatches('group1');
    } else if (resultGroupTwo === 'correct') {
      handleCorrectMatches('group2');
    } else if (resultGroupThree === 'correct') {
      handleCorrectMatches('group3');
    } else if (resultGroupFour === 'correct') {
      handleCorrectMatches('group4');
    }
  } else if (resultGroupOne === 'incorrect' || resultGroupTwo === 'incorrect' || resultGroupThree === 'incorrect' || resultGroupFour === 'incorrect') {
    messageBoard.textContent = 'Incorrect!';
    remainingGuesses--;
  }

  input = [];
  clearSelection();
  updateDisplay();
}

function handleCorrectMatches(group) {
  boxes.forEach((box) => {
    if (box.classList.contains(group)) {
      box.classList.add('correct');
      box.classList.remove('on');
      box.classList.add('off');
    }
  });
  solveGroup();
}

function shuffleGrid() {
  const nonCorrectElements = Array.from(grid.children).filter(child => !child.classList.contains('correct'));

  for (let i = nonCorrectElements.length; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    grid.appendChild(nonCorrectElements[randomIndex]);
  }
}


function solveGroup() {
  const correctElements = [];
  for (let i = grid.children.length - 1; i >= 0; i--) {
    const child = grid.children[i];
    if (child.classList.contains('correct')) {
      correctElements.push(child);
      grid.removeChild(child);
    }
  }
  for (const correctElement of correctElements) {
    grid.insertBefore(correctElement, grid.firstChild);
  }
}

function solveWall() {
  boxes.forEach((box) => {
    box.classList.add('correct');
  })
  reorganizeGrid();
  displayUserHistory();
}

function reorganizeGrid() {
  const groupOrder = [groupOne, groupTwo, groupThree, groupFour];
  let currentIndex = 0;

  for (const group of groupOrder) {
    for (const element of group) {
      const box = Array.from(grid.children).find(child => child.textContent === element);
      if (box) {
        grid.appendChild(box);
        currentIndex++;
      }
    }
  }
}

function updateDisplay() {
  if (remainingGuesses > 0) {
    guessesRemaining.textContent = `Guesses remaining...${remainingGuesses}`;
  } else {
    guessesRemaining.textContent = `Guesses remaining...${remainingGuesses}`;
    alert('Game Over!');
    solveWall();
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
  itemiseHistory();
  playGame();
})

deselectButton.addEventListener('click', () => {
  clearSelection();
})

shuffleButton.addEventListener("click", () => {
  shuffleGrid();
});

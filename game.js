export const groups = [
  {
    name: 'groupOne',
    elements: [],
    connection: '',
    backgroundColor: '#F9DF6D',
  },
  {
    name: 'groupTwo',
    elements: [],
    connection: '',
    backgroundColor: '#9FC35A',
  },
  {
    name: 'groupThree',
    elements: [],
    connection: '',
    backgroundColor: '#B1C4EF',
  },
  {
    name: 'groupFour',
    elements: [],
    connection: '',
    backgroundColor: '#BA81C5',
  },
]

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
const alertElement = document.querySelector('.alert');
const defaultMaxFontSize = 24;
const createButton = document.querySelector('.create-button');
const createForm = document.querySelector('.create-form');

//On-page-load functions//
initialShuffle();
adjustTextSize();
//////////////////////


createButton.addEventListener('click', () => {
  createForm.style.display = 'flex';
})





function populateGrid(groups) {

  groups.forEach((group, index) => {
    const boxes = Array.from(grid.querySelectorAll(`.group${index + 1}`));
    group.elements.forEach((element, i) => {
      boxes[i].innerHTML = element;
    });
  });
}

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
    alertElement.innerHTML = `
    <h2>You've already made that selection!</h2>
    `
    alertElement.style.display = 'flex';
    setTimeout(() => {
      alertElement.style.display = 'none';
    }, 2000)
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

function checkMatches(input, groupName) {
  const group = groups.find((group) => group.name === groupName);

  if (!group) {
    console.error(`Group '${groupName}' not found in the groups array.`);
    return 'incorrect';
  }

  let correctGuesses = 0;
  for (let i = 0; i < group.elements.length; i++) {
    const element = group.elements[i];
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
  const results = [];

  for (const group of groups) {
    const result = checkMatches(input, group.name);
    results.push({ group: group.name, result });
  }

  if (alreadyChosen) {
    clearSelection();
    return;
  }

  const correctResults = results.filter((result) => result.result === 'correct');
  const oneAwayResults = results.filter((result) => result.result === 'one away');

  if (correctResults.length > 0) {
    // Handle Correct Guesses
    messageBoard.textContent = 'Correct!';

    for (const correctResult of correctResults) {
      handleCorrectMatches(correctResult.group);
    }

    // Check if the user has made four correct guesses
    if (countCorrectGuesses() === 16) {
      messageBoard.textContent = 'You won! Congratulations!';
      // Handle game ending here, e.g., display a message or perform any end-game actions
      displayUserHistory();
    }
  } else if (oneAwayResults.length > 0) {
    messageBoard.textContent = 'One Away!';
    grid.classList.add('shuffling');
    setTimeout(() => {
      grid.classList.remove('shuffling');
    }, 300);
    remainingGuesses--;
    clearSelection();
  } else {
    messageBoard.textContent = 'Incorrect!';
    grid.classList.add('shuffling');
    setTimeout(() => {
      grid.classList.remove('shuffling');
    }, 300);
    remainingGuesses--;
  }

  input = [];
  clearSelection();
  updateDisplay();
}


function countCorrectGuesses() {
  let correctGuessCount = 0;
  boxes.forEach((box) => {
    if (box.classList.contains('correct')) {
      correctGuessCount++;
    }
  });
  return correctGuessCount;
}


function handleCorrectMatches(groupName) {
  const groupElements = groups.find(group => group.name === groupName).elements;
  boxes.forEach((box) => {
    if (groupElements.includes(box.textContent)) {
      box.classList.remove('on');
      box.classList.add('correct', 'off');
    }
  });
  solveGroup();
}

function initialShuffle() {
  const nonCorrectElements = Array.from(grid.children).filter(child => !child.classList.contains('correct') && !child.classList.contains('connection-div'));

  for (let i = nonCorrectElements.length; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    grid.appendChild(nonCorrectElements[randomIndex]);
  }
}


function shuffleGrid() {
  const nonCorrectElements = Array.from(grid.children).filter(child => !child.classList.contains('correct') && !child.classList.contains('connection-div'));

  grid.classList.add('shuffling');
  setTimeout(() => {
    grid.classList.remove('shuffling');
  }, 300);

  for (let i = nonCorrectElements.length; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    grid.appendChild(nonCorrectElements[randomIndex]);
  }
}




// Initialize a reference to the last connectionDiv as null
let lastConnectionDiv = null;

function solveGroup() {
  const correctElements = [];
  for (let i = grid.children.length - 1; i >= 0; i--) {
    const child = grid.children[i];
    if (child.classList.contains('correct')) {
      correctElements.push(child);
      grid.removeChild(child);
    }
  }

  if (correctElements.length > 0) {
    // Check the first correct element's group
    const groupClass = Array.from(correctElements[0].classList).find(cls => cls.startsWith('group'));
    if (groupClass) {
      const groupId = parseInt(groupClass.replace('group', ''));
      generateConnectionsDiv(groups[groupId - 1]);
    }
  }
}

function generateConnectionsDiv(group) {
  const connectionDiv = document.createElement('div');
  connectionDiv.classList.add('connection-div');
  connectionDiv.innerHTML = `
  <h2 class="connection-div-header">CONNECTION: ${group.connection}</h2> <p class="connection-div-content">${group.elements.join(', ')}</p>
  `;
  connectionDiv.style.textTransform = 'uppercase';
  connectionDiv.style.backgroundColor = group.backgroundColor;

  // If a lastConnectionDiv exists, insert the new connectionDiv after it; otherwise, insert it at the beginning of the grid
  if (lastConnectionDiv) {
    grid.insertBefore(connectionDiv, lastConnectionDiv.nextSibling);
  } else {
    grid.insertBefore(connectionDiv, grid.firstChild);
  }

  // Update the reference to the last connectionDiv
  lastConnectionDiv = connectionDiv;
}

function solveWall() {
  // Determine which groups have been solved
  const solvedGroups = [];
  groups.forEach((group) => {
    const isSolved = group.elements.every((element) => {
      const box = Array.from(boxes).find((box) => box.textContent === element);
      return box && box.classList.contains('correct');
    });

    if (isSolved) {
      solvedGroups.push(group.name);
    }
  });

  // Remove all non-connectionDiv elements from the grid
  removeNonConnectionDivs();

  // Iterate over groups and create connectionDivs for each unsolved group
  groups.forEach((group) => {
    if (!solvedGroups.includes(group.name)) {
      generateConnectionsDiv(group);
    }
  });

  // Display user history
  displayUserHistory();
}

function removeNonConnectionDivs() {
  const nonConnectionDivs = document.querySelectorAll('.box');
  nonConnectionDivs.forEach((div) => {
    if (!div.classList.contains('connection-div')) {
      div.remove();
    }
  });
}

// function reorganizeGrid() {
//   const groupOrder = groups.map(group => group.elements);
//   let currentIndex = 0;

//   for (const groupElements of groupOrder) {
//     for (const element of groupElements) {
//       const box = Array.from(grid.children).find(child => child.textContent === element);
//       if (box) {
//         grid.appendChild(box);
//         currentIndex++;
//       }
//     }
//   }
// }

function updateDisplay() {
  if (remainingGuesses > 0) {
    guessesRemaining.textContent = `Mistakes remaining: ${remainingGuesses}`;
  } else {
    guessesRemaining.textContent = `Mistakes remaining: ${remainingGuesses}`;
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
  if(countCorrectGuesses() === 16) {
    return
  }else if(toggledItems < 4){
    alertElement.innerHTML = `
    <h2>Please make four selections!</h2>
    `
    alertElement.style.display = 'flex';
    setTimeout(() => {
      alertElement.style.display = 'none';
    }, 2000)
  }
else if(countCorrectGuesses() !== 16 && toggledItems === 4) {
  itemiseHistory();
  playGame();
} else return;
})

deselectButton.addEventListener('click', () => {
  clearSelection();
})

shuffleButton.addEventListener("click", () => {
  shuffleGrid();
});

function adjustTextSize() {
  boxes.forEach((box) => {
    let fontSize = defaultMaxFontSize; // Start with the default maximum font size
    const minFontSize = 10; // Set a minimum font size

    // Continuously check for both text overflow and available space
    while (box.scrollWidth > box.offsetWidth && fontSize > minFontSize) {
      // Text is overflowing, decrease font size
      fontSize -= 1;
      box.style.fontSize = `${fontSize}px`;
    }

    while (box.scrollWidth < box.offsetWidth && fontSize < defaultMaxFontSize) {
      // Text is not overflowing, increase font size
      fontSize += 1;
      box.style.fontSize = `${fontSize}px`;
    }
  });
}

// Add an event listener for the 'resize' event
window.addEventListener('resize', () => {
  // Adjust text size when the window is resized
  adjustTextSize();
  // The following loop checks for available space and increases font size if there's room
  boxes.forEach((box) => {
    adjustTextSize(box);
  });
});


const groupOneNo1 = document.getElementById('connectionGrp1No1');
const groupOneNo2 = document.getElementById('connectionGrp1No2');
const groupOneNo3 = document.getElementById('connectionGrp1No3');
const groupOneNo4 = document.getElementById('connectionGrp1No4');
const groupOneConnection = document.querySelector('.connection1')

const groupTwoNo1 = document.getElementById('connectionGrp2No1');
const groupTwoNo2 = document.getElementById('connectionGrp2No2');
const groupTwoNo3 = document.getElementById('connectionGrp2No3');
const groupTwoNo4 = document.getElementById('connectionGrp2No4');
const groupTwoConnection = document.getElementById('connection2')

const groupThreeNo1 = document.getElementById('connectionGrp3No1');
const groupThreeNo2 = document.getElementById('connectionGrp3No2');
const groupThreeNo3 = document.getElementById('connectionGrp3No3');
const groupThreeNo4 = document.getElementById('connectionGrp3No4');
const groupThreeConnection = document.getElementById('connection3')

const groupFourNo1 = document.getElementById('connectionGrp4No1');
const groupFourNo2 = document.getElementById('connectionGrp4No2');
const groupFourNo3 = document.getElementById('connectionGrp4No3');
const groupFourNo4 = document.getElementById('connectionGrp4No4');
const groupFourConnection = document.getElementById('connection4')

const formSubmit = document.querySelector('.form-submit');

formSubmit.addEventListener('click', (event) => {
  event.preventDefault();
  updateGroups();
  createForm.style.display = 'none';
});

function updateGroups() {
  groups[0].elements.push(groupOneNo1.value);
  groups[0].elements.push(groupOneNo2.value);
  groups[0].elements.push(groupOneNo3.value);
  groups[0].elements.push(groupOneNo4.value);
  groups[0].connection = `${connection1.value}`;

  groups[1].elements.push(groupTwoNo1.value);
  groups[1].elements.push(groupTwoNo2.value);
  groups[1].elements.push(groupTwoNo3.value);
  groups[1].elements.push(groupTwoNo4.value);
  groups[1].connection = `${connection2.value}`;

  groups[2].elements.push(groupThreeNo1.value);
  groups[2].elements.push(groupThreeNo2.value);
  groups[2].elements.push(groupThreeNo3.value);
  groups[2].elements.push(groupThreeNo4.value);
  groups[2].connection = `${connection3.value}`;

  groups[3].elements.push(groupFourNo1.value);
  groups[3].elements.push(groupFourNo2.value);
  groups[3].elements.push(groupFourNo3.value);
  groups[3].elements.push(groupFourNo4.value);
  groups[3].connection = `${connection4.value}`;
  
  console.log(groups);
  populateGrid(groups);
}
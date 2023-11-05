const groupOne = ['red', 'blue', 'green', 'pink'];
const groupTwo = ['one', 'two', 'three', 'four'];
const groupThree = ['a', 'b', 'c', 'd'];
const groupFour = ['north', 'south', 'east', 'west'];



function checkGroupOneMatches(input1, input2, input3, input4) {
  let correctGuesses = 0;
  for (let i = 0; i < groupOne.length; i++) {
    const element = groupOne[i];
    if (input1 === element) {
      correctGuesses++;
    }
  }

  for (let i = 0; i < groupOne.length; i++) {
    const element = groupOne[i];
    if (input2 === element) {
      correctGuesses++;
    }
  }

  for (let i = 0; i < groupOne.length; i++) {
    const element = groupOne[i];
    if (input3 === element) {
      correctGuesses++;
    }
  }

  for (let i = 0; i < groupOne.length; i++) {
    const element = groupOne[i];
    if (input4 === element) {
      correctGuesses++;
    }
  }

  if (correctGuesses === 3) {
    console.log('one away');
  } else if (correctGuesses === 4) {
    console.log('correct')
  } else console.log('incorrect')
}

console.log(checkGroupOneMatches('red', 'blue', 'green', 'pink'))


function checkGroupTwoMatches(input1, input2, input3, input4) {
  let correctGuesses = 0;
  for (let i = 0; i < groupTwo.length; i++) {
    const element = groupTwo[i];
    if (input1 === element) {
      correctGuesses++;
    }
  }

  for (let i = 0; i < groupTwo.length; i++) {
    const element = groupTwo[i];
    if (input2 === element) {
      correctGuesses++;
    }
  }

  for (let i = 0; i < groupTwo.length; i++) {
    const element = groupTwo[i];
    if (input3 === element) {
      correctGuesses++;
    }
  }

  for (let i = 0; i < groupTwo.length; i++) {
    const element = groupTwo[i];
    if (input4 === element) {
      correctGuesses++;
    }
  }

  if (correctGuesses === 3) {
    console.log('one away');
  } else if (correctGuesses === 4) {
    console.log('correct')
  } else console.log('incorrect')
}

console.log(checkGroupTwoMatches('one', 'two', 'three', 'four'))

function checkGroupThreeMatches(input1, input2, input3, input4) {
  let correctGuesses = 0;
  for (let i = 0; i < groupThree.length; i++) {
    const element = groupThree[i];
    if (input1 === element) {
      correctGuesses++;
    }
  }

  for (let i = 0; i < groupThree.length; i++) {
    const element = groupThree[i];
    if (input2 === element) {
      correctGuesses++;
    }
  }

  for (let i = 0; i < groupThree.length; i++) {
    const element = groupThree[i];
    if (input3 === element) {
      correctGuesses++;
    }
  }

  for (let i = 0; i < groupThree.length; i++) {
    const element = groupThree[i];
    if (input4 === element) {
      correctGuesses++;
    }
  }

  if (correctGuesses === 3) {
    console.log('one away');
  } else if (correctGuesses === 4) {
    console.log('correct')
  } else console.log('incorrect')
}

console.log(checkGroupThreeMatches('a', 'b', 'c', 'd'))

function checkGroupFourMatches(input1, input2, input3, input4) {
  let correctGuesses = 0;
  for (let i = 0; i < groupFour.length; i++) {
    const element = groupFour[i];
    if (input1 === element) {
      correctGuesses++;
    }
  }

  for (let i = 0; i < groupFour.length; i++) {
    const element = groupFour[i];
    if (input2 === element) {
      correctGuesses++;
    }
  }

  for (let i = 0; i < groupFour.length; i++) {
    const element = groupFour[i];
    if (input3 === element) {
      correctGuesses++;
    }
  }

  for (let i = 0; i < groupFour.length; i++) {
    const element = groupFour[i];
    if (input4 === element) {
      correctGuesses++;
    }
  }

  if (correctGuesses === 3) {
    console.log('one away');
  } else if (correctGuesses === 4) {
    console.log('correct')
  } else console.log('incorrect')
}

console.log(checkGroupFourMatches('north', 'south', 'east', 'west'))
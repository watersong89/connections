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

checkMatches(['red', 'blue', 'green', 'pink'], groupOne);
checkMatches(['one', 'two', 'three', 'four'], groupTwo);
checkMatches(['a', 'b', 'c', 'd'], groupThree);
checkMatches(['north', 'south', 'east', 'west'], groupFour);


const boxes = document.querySelectorAll('.box');
let toggledItems = 0;
boxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (box.classList.contains('toggled')) {
      const index = input.indexOf(box.textContent);
      box.classList.remove('toggled');
      toggledItems--;
      input.splice(index, 1);
      console.log(input);
    } else if(toggledItems === 4) return; 
      else {
      box.classList.add('toggled');
      input.push(box.textContent)
      toggledItems++;
      console.log(input);
    }
  })
})

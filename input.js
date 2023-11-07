import { groups } from './common.js';

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
  window.location.assign('index.html');
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
}
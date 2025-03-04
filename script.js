const form = document.querySelector('form');

let leaderBoard = [];

const leaderBoardDiv = document.querySelector('#leaderBoard');

const elements = Array.from(document.forms[0].elements); // for accessing all child of first form present in page
let btn = elements.pop();
elements.forEach((n)=>{
  n.classList.add('inpt')
})
 
form.addEventListener('submit', (e)=>{
  e.preventDefault();

  const obj = {
    position: leaderBoard.length,
    fname: elements[0].value,
    lname: elements[1].value,
    country: elements[2].value,
    score: elements[3].value
  }


  // adding data into leaderBoard
  leaderBoard.push(obj);
  console.log(leaderBoard);

  // clearing the form
  clearForm();

  // // sorting the leaderBoard
  sortLeaderBoard();

  // // print values on the DOM
  printLeaderBoard();
});

function clearForm() {
  elements[0].value = "";
  elements[0].focus();
  elements[1].value ="";
  elements[2].value ="";
  elements[3].value ="";
}

function sortLeaderBoard() {
  leaderBoard.sort((a,b)=>{
    return b.score - a.score;
  });
}

function printLeaderBoard() {
  leaderBoardDiv.innerHTML = "";
  const fragmrnt = document.createDocumentFragment();
  leaderBoard.forEach((obj)=>{
    const parent = document.createElement('div');
    parent.classList.add('parent');
    const name = document.createElement('p');
    const fullName = document.createElement('span');
    const date = document.createElement('span');

    const country = document.createElement('p');
    const score = document.createElement('p');

    name.classList.add('fullName');
    date.classList.add('dateSpan');
    country.classList.add('pTag');
    score.classList.add('pTag');
  
    const boxSetting = document.createElement('p');
    const del = document.createElement('span');
    const minus5 = document.createElement('span');
    const plus5 = document.createElement('span');

    boxSetting.classList.add('actions', 'actions2');
    del.classList.add('del');
    plus5.classList.add('plus');
    minus5.classList.add('minus');


    del.innerHTML = '<i class="fa-solid fa-trash"></i>';
    minus5.innerText = '-5';
    plus5.innerText = '+5';

    boxSetting.append(del, minus5, plus5);

    fullName.innerText = `${obj.fname} ${obj.lname}`;
    date.innerText = new Date().toDateString();
    
    name.append(fullName, date);

    country.innerText = `${obj.country}`;
    score.innerText = `${obj.score}`;

    del.addEventListener('click', () => deleteData(obj.position));

    minus5.addEventListener('click', ()=> modifyScore(obj.position, "-"));
    plus5.addEventListener('click', ()=> modifyScore(obj.position, "+"));

    parent.append(name, country, score, boxSetting);

    fragmrnt.append(parent);
  });
  leaderBoardDiv.append(fragmrnt);
}

function deleteData(idxToDelete) {
  leaderBoard = leaderBoard.filter((existingData)=>{
    return existingData.position !== idxToDelete;
  });

  printLeaderBoard();
}

function modifyScore(idToModify, sign) {
  leaderBoard.forEach((existingData)=>{
    if(existingData.position === idToModify){
      if(sign === "+"){
        if(existingData.score <300){
          existingData.score = Number(existingData.score) + 5;
        }
        
      }
      else{
        if(existingData.score > 4){
          existingData.score = Number(existingData.score) - 5;
        }
      }
    }
  });

  sortLeaderBoard();

  printLeaderBoard();
}

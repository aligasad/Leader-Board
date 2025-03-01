const form = document.querySelector('form');
// document.forms //It returns HTMLCollection that is not an actual array but we need actual array, so for making actual array we use Array.from() function
const leaderBoardDiv = document.querySelector('#leaderBoard');
let leaderBoard = [];
const elements = Array.from(document.forms[0].elements); // used for taking all elements of form
elements.pop();

elements.forEach((e)=>{
  e.classList.add('inpt');
})


form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const data = {
    id: leaderBoard.length,
    fname: elements[0].value,
    lname: elements[1].value,
    country: elements[2].value,
    score: elements[3].value
  };
  

  // adding data into leaderBoard
  leaderBoard.push(data);
  console.log(leaderBoard);

  // clearing the form
  clearForm();

  // sorting the leaderBoard
  sortLeaderBoard();

  // print values on the DOM
  printLeaderBoard();

});

function clearForm() {
  elements.forEach((elem)=>{
    elem.value = "";
  });
  elements[0].focus();
}

function sortLeaderBoard() {
  leaderBoard.sort((a,b)=>{
    return b.score - a.score;
  });
}

function printLeaderBoard(){
  leaderBoardDiv.innerHTML = "";
  const fragment = document.createDocumentFragment();
  leaderBoard.forEach((obj)=>{
    const parent = document.createElement('div');
    const name = document.createElement('p');
    name.style.width = "25%";
    const country = document.createElement('p');
    country.style.width = "25%";
    const score = document.createElement('p');
    score.style.width = "15%";
    const actions = document.createElement('p');
    const del = document.createElement('span');
    const plus5 = document.createElement('span');
    plus5.classList.add('plus');
    const minus5 = document.createElement('span');
    minus5.classList.add('minus');

    parent.classList.add('parent');
    actions.classList.add('actions');

    name.innerText = `${obj.fname} ${obj.lname}`; //OR obj.fname +" "+ obj.lname
    country.innerText = `${obj.country}`;
    score.innerText = `${obj.score}`;

    del.classList.add("fa-solid", "fa-trash", "del");
    

    //by me
    del.addEventListener('click', (e)=>{
      leaderBoard.splice(e.id , 1);
      e.target.parentElement.parentElement.remove();
    })

    del.addEventListener('click', ()=>deleteData(obj.id));

    plus5.innerText ="+5";
    minus5.innerText = "-5";

    plus5.addEventListener('click', ()=>modifyScore(obj.id, "+"));
    minus5.addEventListener('click', ()=>modifyScore(obj.id, "-"));
    actions.append(del, plus5, minus5);

    parent.append(name, country, score, actions);
    fragment.append(parent);
  }); 
  leaderBoardDiv.append(fragment);
}

// function deleteData(idToDelete){
//   leaderBoard = leaderBoard.filter((existingData)=>{
//     return existingData.id !== idToDelete;
//   });

//   // sorting the leaderBoard
//   sortLeaderBoard();

//   // print values on the DOM
//   printLeaderBoard();
// } 

function modifyScore(idToModify, sign){
  
  // Method 2 (By me)
  leaderBoard.forEach((existingData)=>{
    if(existingData.id === idToModify){
      if(sign === "+"){
        existingData.score = Number(existingData.score) + 5;
      }
      else{
        existingData.score = Number(existingData.score) - 5;
      }
    }
  });

  // sorting the leaderBoard
  sortLeaderBoard();

  // print values on the DOM
  printLeaderBoard();
}
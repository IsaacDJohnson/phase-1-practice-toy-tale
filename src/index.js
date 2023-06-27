//-----------Pre-Coded-----------

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//-----------My Code-----------

//problem 1. FETCH

function fetchToys(){
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(function(data) {
    data.forEach(element => createToy(element))     
  })
}

function createToy(toy){
  const collection = document.getElementById('toy-collection')
  const newToy = document.createElement('div')
  newToy.className = 'card';
  newToy.innerHTML = `
                      <h2>${toy.name}</h2>
                      <img src="${toy.image}" class="toy-avatar"/>
                      <p>${toy.likes} likes</p>
                      <button class="like-btn" id='${toy.id}'>Like ❤️</button>` 
  collection.appendChild(newToy)
  newToy.querySelector('.like-btn').addEventListener('click', function(){
  toy.likes++  
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      "likes": toy.likes
    })
  })
  .then(resp => resp.json())
  .then(data => newToy.querySelector('p').innerText = `${data.likes} likes`)
  })  
}

//Problem 2. POST

document.querySelector('.add-toy-form').addEventListener('submit', (e) => {
  
  e.preventDefault();

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    })
  }
   fetch("http://localhost:3000/toys", configObj)
   .then(resp => resp.json())
   .then(obj => createToy(obj))
   .catch(error => alert(error.message))
})

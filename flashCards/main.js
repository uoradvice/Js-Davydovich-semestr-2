let deck = [];

const frontCard = document.querySelector("#front");
const backCard = document.querySelector("#back");
let addButton = document.querySelector("#addCardButton");

addButton.addEventListener("click", handladdCard);

const tbody = document.querySelector("tbody");

tbody.addEventListener("click", function (event) {
  if (event.target.classList.contains("deleteBtn")) {
    const id = Number(event.target.dataset.id);
    deleteCard(id);
  }

  if (event.target.classList.contains("editBtn")) {
    const id = Number(event.target.dataset.id);
    editCard(id);
  }

  if (event.target.classList.contains("lernedChBx")) {
    const id = Number(event.target.dataset.id);
    toggleCheckBox(id);
  }
  console.log(deck);
});

function handladdCard() {
  const frontValue = frontCard.value;
  const backValue = backCard.value;

  if (!frontValue || !backValue) {
    alert("Enter both fields");
    return;
  }

  const card = {
    id: Date.now(),
    front: frontValue,
    back: backValue,
    learned: false,
  };

  deck.push(card);
  console.log(deck);

  frontCard.value = "";
  backCard.value = "";

  showCards();
  //document.querySelector(".deleteBtn").addEventListener("click", handlDelCard);
}

function showCards() {
  tbody.innerHTML = "";
  deck.forEach((card) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${card.front}</td>
        <td>${card.back}</td>
        <td>
          <input
            type="checkbox"
            class="lernedChBx"
            data-id="${card.id}"
            ${card.learned ? "checked" : ""}
          >
          </input>
        </td>
        <td><button type="button" class="deleteBtn" data-id="${card.id}">Delete</button></td>
        <td><button type="button" class="editBtn" data-id="${card.id}">Edit</button></td>
        `;

    tbody.appendChild(row);
  });
}

function deleteCard(tempId) {
  deck = deck.filter((card) => card.id !== tempId);
  showCards();
}

function editCard(tempId) {
  const card = deck.find((card) => card.id === tempId);
  if (!card) return;
  frontCard.value = card.front;
  backCard.value = card.back;

  deck = deck.filter((card) => card.id !== tempId);

  showCards();
}

function toggleCheckBox(tempId) {
  const card = deck.find((card) => card.id === tempId);
  if (!card) return;
  card.learned = !card.learned;

  showCards();
}



const startGame = document.querySelector("#startBtn");
startGame.addEventListener("click", handlePlay);

const flip = document.querySelector("#flip");
flip.addEventListener("click", hadleFlip)

let currentIndex = 0;
let isFront = true;

let cardDisplay = document.querySelector("#cardDisplay");

function handlePlay() {
  // cardDisplay.innerHTML = "";

  if(deck.length === 0){
    cardDisplay.textContent = "No cards yet";
    return;
  }


  if(isFront === true){
  cardDisplay.textContent = deck[currentIndex].front;
  return;
  }
  cardDisplay.textContent= deck[currentIndex].back;
  



}

function hadleFlip(){
  isFront === !isFront;
  handlePlay();
}

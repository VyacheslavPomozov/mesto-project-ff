"use strict";

let content = document.querySelector(".content");
let placesList = content.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function deleteCard(event) {
  event.target.closest(".places__item").remove();
}

function addCard(cards, deleteFunction) {
  cards.forEach(function (item) {
    const cardElement = cardTemplate
      .querySelector(".places__item")
      .cloneNode(true);
    const deleteButton = cardElement.querySelector(".card__delete-button");

    cardElement.querySelector(".card__image").setAttribute("src", item.link);
    cardElement.querySelector(".card__title").textContent = item.name;
    placesList.append(cardElement);

    deleteButton.addEventListener("click", deleteFunction);
  });
}

addCard(initialCards, deleteCard);

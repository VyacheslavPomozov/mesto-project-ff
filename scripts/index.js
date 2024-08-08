"use strict";

const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function createCard(data, onDelete) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__image").setAttribute("src", data.link);
  cardElement.querySelector(".card__image").setAttribute("alt", `Фотография: ${data.name}`);
  cardElement.querySelector(".card__title").textContent = data.name;

  deleteButton.addEventListener("click", onDelete);
  return cardElement;
}

function handleDeleteCard(event) {
  event.target.closest(".places__item").remove();
}

function renderCard(create) {
  placesList.append(create);
}

initialCards.forEach((card) => {
  renderCard(createCard(card, handleDeleteCard));
});

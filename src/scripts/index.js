"use strict";
import "../pages/index.css";
import { initialCards } from "/src/scripts/cards.js";
import {
  handleDeleteCard,
  createCard,
  likeCard,
  renderCard,
} from "/src/components/card.js";
import { openPopup, closePopup } from "/src/components/modal.js";

const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

const editButton = content.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const editPopupCloseButton = editPopup.querySelector(".popup__close");

const addNewProfileButton = content.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardPopupCloseButton = newCardPopup.querySelector(".popup__close");

const profileTitle = content.querySelector(".profile__title");
const profileDescriprion = content.querySelector(".profile__description");

const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescriprion.textContent;

const editForm = newCardPopup.querySelector(".popup__form");
const newCardName = document.querySelector(".popup__input_type_card-name");
const newCardLink = document.querySelector(".popup__input_type_url");

const popupContentImage = document.querySelector(".popup_type_image");
const popupImage = popupContentImage.querySelector(".popup__image");
const popupImageDescriprion =
  popupContentImage.querySelector(".popup__caption");
const popupImageCloseButton = popupContentImage.querySelector(".popup__close");

initialCards.forEach((card) => {
  renderCard(
    createCard(card, handleDeleteCard, likeCard, openBigImage, cardTemplate),
    placesList
  );
});

editButton.addEventListener("click", function () {
  openPopup(editPopup);
  editButton.removeEventListener("click", openPopup);
});

editPopupCloseButton.addEventListener("click", function () {
  closePopup(editPopup);
  editPopupCloseButton.removeEventListener("click", closePopup);
});

newCardPopupCloseButton.addEventListener("click", function () {
  closePopup(newCardPopup);
  newCardPopupCloseButton.removeEventListener("click", closePopup);
});

addNewProfileButton.addEventListener("click", function () {
  openPopup(newCardPopup);
  addNewProfileButton.removeEventListener("click", openPopup);
});

formElement.addEventListener("submit", handleFormSubmit);

editForm.addEventListener("submit", handleAddCard);

popupImageCloseButton.addEventListener("click", function () {
  closePopup(popupContentImage);
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  profileTitle.textContent = name;
  profileDescriprion.textContent = job;
  closePopup(editPopup);
};

function handleAddCard(evt) {
  evt.preventDefault();
  const addCard = {};
  const name = newCardName.value;
  const link = newCardLink.value;
  addCard.name = name;
  addCard.link = link;
  placesList.prepend(
    createCard(addCard, handleDeleteCard, likeCard, openBigImage, cardTemplate)
  );
  closePopup(newCardPopup);
  editForm.reset();
};

function openBigImage(evt) {
  if (evt.target.classList.contains("card__image")) {
    openPopup(popupContentImage);
    popupImage.setAttribute("src", evt.target.src);
    const description =
      evt.currentTarget.querySelector(".card__title").textContent;
    popupImageDescriprion.textContent = description;
  }
};

"use strict";
import "../pages/index.css";
import {
  handleDeleteCard,
  createCard,
  likeCard,
} from "/src/components/card.js";
import { openPopup, closePopup } from "/src/components/modal.js";
import {
  enableValidation,
  clearValidation,
} from "/src/components/validation.js";

import {
  getUserData,
  getInitialCards,
  deleteCardServer,
  addLikeServer,
  deleteLikeServer,
  patchProfile,
  postCardInServer,
  patchAvatarInServer,
} from "/src/components/api.js";

const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

const editButton = content.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const editPopupCloseButton = editPopup.querySelector(".popup__close");
const editPopupSubmitButton = editPopup.querySelector(".popup__button");

const addNewProfileButton = content.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardPopupCloseButton = newCardPopup.querySelector(".popup__close");
const newCardPopupSubmitButton = newCardPopup.querySelector(".popup__button");

const profileTitle = content.querySelector(".profile__title");
const profileDescriprion = content.querySelector(".profile__description");

const editProfileForm = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const newPlaceForm = document.forms["new-place"];
const newCardName = document.querySelector(".popup__input_type_card-name");
const newCardLink = document.querySelector(".popup__input_type_url");

const popupContentImage = document.querySelector(".popup_type_image");
const popupImage = popupContentImage.querySelector(".popup__image");
const popupImageDescriprion =
  popupContentImage.querySelector(".popup__caption");
const popupImageCloseButton = popupContentImage.querySelector(".popup__close");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};
const profileData = {};
const profileImage = document.querySelector(".profile__image");
const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarPopupSubmitButton = avatarPopup.querySelector(".popup__button");
const avatarCloseButton = avatarPopup.querySelector(".popup__close");
const avatarPopupForm = document.forms.avatar;

Promise.all([getUserData(), getInitialCards()])
  .then(([resUserData, resInitialCards]) => {
    renderUserData(resUserData);
    addInitialCards(resInitialCards);
  })
  .catch((err) => console.log(err));

// Функция загрузки данных о пользователе
function renderUserData(UserData) {
  profileData.name = UserData.name;
  profileData.about = UserData.about;
  profileData.avatar = UserData.avatar;
  profileData.id = UserData._id;
  profileImage.setAttribute(
    "style",
    `background-image: url(${profileData.avatar})`
  );
  profileTitle.textContent = profileData.name;
  profileDescriprion.textContent = profileData.about;
}
// Функция загрузки карточек с сервера
function addInitialCards(cardsData) {
  Array.from(cardsData).forEach((item) => {
    const cards = createCard(
      item,
      deleteCardInServer,
      likeCardInServer,
      openBigImage,
      profileData.id
    );
    placesList.append(cards);
  });
}
// Функция редактирование данных о пользователе
function handleEditProfile(event) {
  event.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  editPopupSubmitButton.textContent = "Сохранение...";

  patchProfile(name, job)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescriprion.textContent = res.about;
      closePopup(editPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => (editPopupSubmitButton.textContent = "Сохранить"));
}
// Функция ручного добавления карточки
function handleAddCard(event) {
  event.preventDefault();
  const name = newCardName.value;
  const link = newCardLink.value;
  newCardPopupSubmitButton.textContent = "Сохранение...";
  const addCard = {};
  addCard.name = name;
  addCard.link = link;
  postCardInServer(addCard)
    .then((res) => {
      const newCard = createCard(
        res,
        deleteCardInServer,
        likeCardInServer,
        openBigImage,
        profileData.id
      );
      placesList.prepend(newCard);
      closePopup(newCardPopup);
      newPlaceForm.reset();
      clearValidation(newPlaceForm, validationConfig);
    })
    .catch((err) => console.log(err))
    .finally(() => (newCardPopupSubmitButton.textContent = "Сохранить"));
}
// Функция удаления карточки с сервера
function deleteCardInServer(event, dataCard) {
  deleteCardServer(dataCard._id)
    .then(() => {
      handleDeleteCard(event);
    })
    .catch((err) => console.log(err));
}
// Функция постановки лайка на сервере
function likeCardInServer(event, dataCard, myId, likesCounter) {
  if (dataCard.likes.some((like) => like._id === myId)) {
    deleteLikeServer(dataCard._id)
      .then((res) => {
        dataCard.likes = res.likes;
        likesCounter.textContent = res.likes.length;
        likeCard(event);
      })
      .catch((err) => console.log(err));
  } else {
    addLikeServer(dataCard._id)
      .then((res) => {
        dataCard.likes = res.likes;
        likesCounter.textContent = res.likes.length;
        likeCard(event);
      })
      .catch((err) => console.log(err));
  }
}
// Функция добавления новой аватарки пользователя
function addNewAvatar(event) {
  event.preventDefault();
  const link = document.forms.avatar.link.value;
  avatarPopupSubmitButton.textContent = "Сохранение...";

  patchAvatarInServer(link)
    .then((res) => {
      profileImage.setAttribute(
        "style",
        `background-image: url(${res.avatar})`
      );
      closePopup(avatarPopup);
      avatarPopupForm.reset();
      clearValidation(avatarPopupForm, validationConfig);
    })
    .catch((err) => console.log(err));
}
// Функция открытия большого изображения карточки
function openBigImage(evt) {
  if (evt.target.classList.contains("card__image")) {
    openPopup(popupContentImage);
    popupImage.setAttribute("src", evt.target.src);
    popupImage.setAttribute("alt", evt.target.alt);
    popupImageDescriprion.textContent = evt.target.alt;
  }
}

profileImage.addEventListener("click", function () {
  openPopup(avatarPopup);
});

avatarCloseButton.addEventListener("click", function () {
  closePopup(avatarPopup);
});

editButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescriprion.textContent;
  clearValidation(editProfileForm, validationConfig);
  openPopup(editPopup);
});

addNewProfileButton.addEventListener("click", function () {
  openPopup(newCardPopup);
});

editPopupCloseButton.addEventListener("click", function () {
  closePopup(editPopup);
});

newCardPopupCloseButton.addEventListener("click", function () {
  clearValidation(newPlaceForm, validationConfig);
  newPlaceForm.reset();
  closePopup(newCardPopup);
});

popupImageCloseButton.addEventListener("click", function () {
  closePopup(popupContentImage);
});

avatarPopupSubmitButton.addEventListener("click", function (event) {
  addNewAvatar(event);
});

editProfileForm.addEventListener("submit", function (event) {
  handleEditProfile(event);
});

newPlaceForm.addEventListener("submit", function (event) {
  handleAddCard(event);
});

enableValidation(validationConfig);

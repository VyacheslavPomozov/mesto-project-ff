const cardTemplate = document.querySelector("#card-template").content;

export function createCard(
  data,
  deleteCardInServer,
  likeCardInServer,
  openBigImage,
  myId
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardElement.querySelector(".card__image").setAttribute("src", data.link);
  cardElement.querySelector(".card__image").setAttribute("alt", data.name);
  cardElement.querySelector(".card__title").textContent = data.name;

  const likesCounter = cardElement.querySelector(".card__likes-counter");
  likesCounter.textContent = data.likes.length;

  if (myId !== data.owner._id) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", function (event) {
      deleteCardInServer(event, data);
    });
  }

  cardElement.addEventListener("click", function (event) {
    openBigImage(event);
  });

  if (data.likes.some((like) => like._id === myId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", function (event) {
    likeCardInServer(event, data, myId, likesCounter);
  });

  return cardElement;
}

export function handleDeleteCard(event) {
  event.target.closest(".places__item").remove();
}

export function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}
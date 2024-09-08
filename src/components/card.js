
export function createCard(data, onDelete, likeCard, openBigImage, cardTemplate) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__image").setAttribute("src", data.link);
  cardElement.querySelector(".card__image").setAttribute("alt", data.name);
  cardElement.querySelector(".card__title").textContent = data.name;

  deleteButton.addEventListener("click", onDelete);
  cardElement.addEventListener("click", likeCard);
  cardElement.addEventListener("click", openBigImage);

  return cardElement;
};

export function renderCard(create, placesList) {
    placesList.append(create);
  };

export function handleDeleteCard(event) {
  event.target.closest(".places__item").remove();
};

export function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
};
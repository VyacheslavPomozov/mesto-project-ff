export function openPopup(evt) {
  evt.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEscape);
  evt.addEventListener("click", closePopupByOverlay);
};

export function closePopup(evt) {
  evt.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEscape);
  evt.removeEventListener("click", closePopupByOverlay);
};

function closePopupByEscape(evt) {
  const openPopup = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape") {
    closePopup(openPopup);
  }
};

function closePopupByOverlay(evt) {
  const openPopup = document.querySelector(".popup_is-opened");
  if (evt.target === evt.currentTarget) {
    closePopup(openPopup);
  }
};

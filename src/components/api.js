const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-23",
  headers: {
    authorization: "a88582ab-55a0-4cf4-80d1-d4d78c6c1b48",
    "Content-Type": "application/json",
  },
};

function checkServerResponse(res, err) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(err);
  }
};

export function getUserData() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then((res) =>
    checkServerResponse(res, `Обнаружена ошибка: ${res.status}`)
  );
};

export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then((res) =>
    checkServerResponse(res, `Обнаружена ошибка: ${res.status}`)
  );
};

export function patchProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) =>
    checkServerResponse(res, `Обнаружена ошибка: ${res.status}`)
  );
};

export function postCardInServer(data) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then((res) =>
    checkServerResponse(res, `Обнаружена ошибка: ${res.status}`)
  );
};

export function deleteCardServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) =>
    checkServerResponse(res, `Обнаружена ошибка: ${res.status}`)
  );
};

export function addLikeServer(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) =>
    checkServerResponse(res, `Обнаружена ошибка: ${res.status}`)
  );
};

export function deleteLikeServer(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) =>
    checkServerResponse(res, `Обнаружена ошибка: ${res.status}`)
  );
};

export function patchAvatarInServer(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((res) =>
    checkServerResponse(res, `Обнаружена ошибка: ${res.status}`)
  );
};

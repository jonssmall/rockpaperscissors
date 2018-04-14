'use strict'

function getElement(selector) {
  return document.querySelector(selector);
}

function getElements(selector) {
  return document.querySelectorAll(selector);
}

function click(element, callback) {
  element.addEventListener('click', callback);
}

function enableButton(buttonElement) {
  buttonElement.disabled = false;
}

export { getElement, getElements, click, enableButton }
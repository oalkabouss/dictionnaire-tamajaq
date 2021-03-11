import card from "./components/card.js";
import { getData } from "./applications/datasource.js";
import { debounce, filter, paginate } from "./applications/utilities.js";

customElements.define(card.NAME, card);

let itemsSource;

(async () => {
  "use strict";

  let pageSize = 20;
  let pageNumber = 0;

  itemsSource = await getData();
  let items = itemsSource;
  renderIntems(paginate(items, pageSize, pageNumber));

  window.addEventListener("scroll", () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight > scrollHeight - 5) {
      pageNumber++;
      renderIntems(paginate(items, pageSize, pageNumber));
    }
  });
  document.querySelector("input").addEventListener(
    "input",
    debounce((e) => {
      pageNumber = 0;
      items = filter(e.target.value, itemsSource);
      renderIntems(paginate(items, pageSize, pageNumber), true);
    }, 800)
  );
})();

const renderIntems = (items, clear) => {
  const itemsElement = document.querySelector(".items");
  if (clear) {
    itemsElement.innerHTML = "";
  }
  items.forEach((item) => {
    let elem = document.createElement(card.NAME);
    elem.setAttribute(card.AttributWord, item.entry);
    elem.setAttribute(card.AttributDescription, item.definitionFr);
    elem.setAttribute(card.AttributCategory, item.categoryLabelFr);
    elem.setAttribute(card.AttributVariantN, item.variantN);
    elem.setAttribute(card.AttributVariantW, item.variantW);
    itemsElement.appendChild(elem);
  });
};

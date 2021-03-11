export default class card extends HTMLElement {
  static NAME = "card-item";

  static AttributWord = "word";
  static AttributDescription = "description";
  static AttributCategory = "category";
  static AttributVariantN = "variant-n";
  static AttributVariantW = "variant-w";

  static IdWord = "card-word";
  static IdCategory = "card-category";
  static IdDescription = "card-description";

  constructor() {
    super();
  }

  connectedCallback() {
    console.log();

    this.innerHTML = `
    <div class="card-item">
        <div class="card-head">
            <h1 class="word">${this.getAttribute(card.AttributWord)}</h1>
            <spam>(${this.getAttribute(card.AttributCategory)})</spam>
        </div>
        ${this.getVariant}
        <p class="description">${this.getAttribute(
          card.AttributDescription
        )}</p>
    </div>
    `;
  }

  get getVariant() {
    let w = this.getAttribute(card.AttributVariantW);
    let n = this.getAttribute(card.AttributVariantN);

    if (w === 'undefined' && n === 'undefined') return '';

    let element = document.createElement("div");
    element.classList.add("variant");

    if(w !== 'undefined'){
      let wElement = document.createElement("p");
      wElement.innerHTML =  `Variant ouest: ${w}`;
      element.appendChild(wElement);
    }

    if(n !== 'undefined'){
      console.log(n,w)
      let nElement = document.createElement("p");
      nElement.innerHTML = `Variant nord: ${n}`;
      element.appendChild(nElement);
    }
    
    return element.outerHTML;
  }
}

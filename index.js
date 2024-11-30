const productListHTML = document.querySelector(".product-list");
const buttonElem = document.querySelector(".button");
const plusMinusElem = document.querySelector(".plusMinus");

const initApp = () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      listProducts = data;
      addDataToHTML();
    });
};

const addDataToHTML = () => {
  productListHTML.innerHTML = "";
  if (listProducts.length > 0) {
    listProducts.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("item");
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = `
      <div class="image">
      <img src="${product["image"]["desktop"]}" alt=""/>
      </div>
      <button class="plusMinus hide">
            <span class="minus">-</span>
            <span class="itemCount">1</span>
            <span class="plus">+</span>
          </button>
      <button class="button">
      <img src="assets/images/icon-add-to-cart.svg">
      <span>Add to Cart</span></button>
      
      <div class="category">${product.category}</div>
      <div class="name">${product.name}</div>
      <div class="price">$${product.price}</div>
      `;
      productListHTML.appendChild(newProduct);
    });
  }
};
productListHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("button") ||
    positionClick.parentElement.classList.contains("button")
  ) {
    let product_id = positionClick.parentElement.dataset.id;
    alert(product_id);
  }
  console.log(positionClick.parentElement.name);
});
initApp();

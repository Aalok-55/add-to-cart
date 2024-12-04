const productListHTML = document.querySelector(".product-list");
const buttonElem = document.querySelector(".button");
const cartListHTML = document.querySelector(".cartList");
const emptySection = document.querySelector(".empty-section");
const cartSection = document.querySelector(".cart-section");
let totalCount = document.querySelector(".totalCount");
let orderTotal = document.querySelector(".order-total");

let listProducts = [];
let cart = [];

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
    listProducts.forEach((product, key) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("item");
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = `
      <div class="image">
      <img src="${product["image"]["desktop"]}" alt=""/>
      </div>
      <div class="plusMinus-section hidden">
      <button class="plusMinus">
            <span class="minus">-</span>
            <span class="itemCount">1</span>
            <span class="plus">+</span>
          </button>
          </div>
          <div class="addToCart-section">
      <button class="button" onClick= "addToCart(${key})">
       <img src="assets/images/icon-add-to-cart.svg " class="img">
       <span class="btn-text">Add to Cart</span>
       </button>
       </div>

      <div class="category">${product.category}</div>
      <div class="name">${product.name}</div>
      <div class="price">$${product.price}</div>
      `;
      productListHTML.appendChild(newProduct);
    });
  }
};

let addToCart = (product_id) => {
  let positionThisProductInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  //if the value doesnt exist, it returns -1
  if (cart.length <= 0) {
    cart = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else {
    cart.push({
      product_id: product_id,
      quantity: 1,
    });
  }
  toggleBtn(product_id);
  cartSection.classList.remove("hidden");
  emptySection.classList.add("hidden");
  addCartToHTML();
};

let addCartToHTML = () => {
  cartListHTML.innerHTML = "";
  if (cart.length > 0) {
    cart.forEach((item) => {
      let newCart = document.createElement("div");
      newCart.classList.add("item");
      newCart.dataset.id = item.product_id;

      let positionProduct = listProducts.findIndex(
        (value) => value.id == item.product_id
      );
      let info = listProducts[positionProduct];
      newCart.innerHTML = `

             <div class="details">
               <div class="name">${info.name}</div>
               <div class="numbers">
                 <span id="times">$${
                   cart[positionProduct].quantity
                 }x</span>&nbsp;
                 <span id="cost">&nbsp;@${info.price}</span>
                 <span id="total-cost">$${
                   cart[positionProduct].quantity * info.price
                 }</span>
               </div>
               </div>
             <div class="cross-sign">
               <div>x</div>
             </div>
   `;
      cartListHTML.appendChild(newCart);
    });
    let totalQuantity = 0;
    cart.forEach((value) => {
      totalQuantity += value.quantity;
    });

    totalCount.textContent = totalQuantity;

    const plusMinusElem = document.querySelector(".plusMinus");
  }
};

productListHTML.addEventListener("click", (e) => {
  positionClick = e.target;

  if (positionClick.classList.contains("plus")) {
    let cartIndex =
      positionClick.parentElement.parentElement.parentElement.dataset.id;
    cart[cartIndex].quantity += 1;
  } else if (positionClick.classList.contains("minus")) {
    let cartIndex =
      positionClick.parentElement.parentElement.parentElement.dataset.id;
    if (cart[cartIndex].quantity > 1) {
      cart[cartIndex].quantity -= 1;
    } else {
    }
  }
  addCartToHTML();
});

const toggleBtn = (product_id) => {
  const itemNodeList = document.querySelectorAll(".item");
  let array = Array.from(itemNodeList);
  const selectedButtonIndex = array.findIndex(
    (value) => value.dataset.id == product_id
  );
  const selectedParentElement = itemNodeList[selectedButtonIndex];

  const addToCartChild = selectedParentElement.querySelector(
    "div.addToCart-section"
  );
  const plusMinusChild = selectedParentElement.querySelector(
    "div.plusMinus-section"
  );
  addToCartChild.classList.toggle("hidden");
  plusMinusChild.classList.toggle("hidden");
};
initApp();

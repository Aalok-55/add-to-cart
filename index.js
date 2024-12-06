const productListHTML = document.querySelector(".product-list");
const cartListHTML = document.querySelector(".cartList");
const emptySection = document.querySelector(".empty-section");
const cartSection = document.querySelector(".cart-section");
let totalCount = document.querySelector(".totalCount");
let orderTotal = document.querySelector(".order-total");
const confirmationSection = document.querySelector(".confirmation-section");
const confirmedProductsHTML = document.querySelector(".confirmed-products");
const submitBtn = document.querySelector("#submit");
const newOrder = document.querySelector("#new-order");
const confirmedTotal = document.querySelector(".confirmed-total");

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
      <div class="plusMinus-section hidden button">
            <button class="minus" onclick="minus(${key})">-</button>
            <span class="itemCount">1</span>
            <button class="plus" onclick="plus(${key})">+</button>
          </div>
          <div class="addToCart-section button">
      <button onClick= "addToCart(${key})">
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
  if (cart.length <= 0) {
    cartSection.classList.add("hidden");
    emptySection.classList.remove("hidden");
  } else {
    totalCost = [];
    cartListHTML.innerHTML = "";
    cart.forEach((item) => {
      let newCart = document.createElement("div");
      newCart.classList.add("cart-item");
      newCart.dataset.id = item.product_id;

      let positionProduct = listProducts.findIndex(
        (value) => value.id == item.product_id
      );
      let info = listProducts[positionProduct];
      newCart.innerHTML = `

             <div class="details">
               <div class="name">${info.name}</div>
               <div class="numbers">
                 <span id="times">$${item.quantity}x</span>&nbsp;
                 <span id="cost">&nbsp;@${info.price}</span>
                 <span id="total-cost">$${item.quantity * info.price}</span>
               </div>
               </div>
             <div class="cross-sign">
               <button onclick="closeTab(${item.product_id})">
               <img src="./assets/images/icon-remove-item.svg" /></button>
             </div>
   `;
      cartListHTML.appendChild(newCart);
      totalCost.push(info.price * item.quantity);
    });
    let totalQuantity = 0;
    cart.forEach((value) => {
      totalQuantity += value.quantity;
    });
    let sum = 0;
    totalCost.forEach((price) => (sum += price));
    totalCount.textContent = totalQuantity;
    orderTotal.textContent = `$${sum}`;
  }
};

const plus = (id) => {
  let cartIndex = cart.findIndex((item) => item.product_id == id);
  cart[cartIndex].quantity += 1;
  changeitemCount(id, cartIndex);
};
const minus = (id) => {
  let cartIndex = cart.findIndex((item) => item.product_id == id);
  if (cart[cartIndex].quantity > 1) {
    cart[cartIndex].quantity -= 1;
    changeitemCount(id, cartIndex);
  } else if (cart[cartIndex].quantity <= 1) {
    console.log(cartIndex);
    removeFromCart(cartIndex);
    toggleBtn(id);
  }
};
const changeitemCount = (id, cartIndex) => {
  const itemCountNode = document.querySelectorAll(".itemCount");
  const itemCountNodeList = Array.from(itemCountNode);

  let itemIndex = itemCountNodeList.findIndex(
    (value) => value.parentElement.parentElement.dataset.id == id
  );

  itemCountNode[itemIndex].textContent = cart[cartIndex].quantity;
  addCartToHTML();
};

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

const removeFromCart = (cartIndex) => {
  cart.splice(cartIndex, 1);
  addCartToHTML();
};

const closeTab = (cart_id) => {
  const cartIndex = cart.findIndex((item) => item.product_id === cart_id);
  const item_id = listProducts.findIndex((item) => item.id === cart_id);
  cart[cartIndex].quantity = 1;
  toggleBtn(item_id);
  changeitemCount(item_id, cartIndex);
  removeFromCart(cartIndex);
};

submitBtn.addEventListener("click", () => {
  confirmationSection.classList.remove("hidden");
  showConfirmation();
});

newOrder.addEventListener("click", () => {
  cart = [];
  confirmationSection.classList.add("hidden");
  cartSection.classList.add("hidden");
  emptySection.classList.remove("hidden");
  addDataToHTML();
});

const showConfirmation = () => {
  let totalCost = [];
  confirmedProductsHTML.innerHTML = "";
  cart.forEach((item) => {
    let newCart = document.createElement("div");
    newCart.classList.add("confirmation-item");

    let positionProduct = listProducts.findIndex(
      (value) => value.id == item.product_id
    );
    let info = listProducts[positionProduct];
    newCart.innerHTML = `

            <img
              src="${info["image"]["thumbnail"]}"
              id="thumbnail"
            />
            <div class="item-details">
              <span>${info.name}</span>
              <div class="numbers">
                <span id="item-number">${item.quantity}x&nbsp;&nbsp;</span>
                <span id="item-price">@&nbsp;$${info.price}</span>
              </div>
            </div>
            <div id="total-price">$${item.quantity * info.price}</div>

   `;

    confirmedProductsHTML.appendChild(newCart);
    totalCost.push(info.price * item.quantity);
  });
  let sum = 0;
  totalCost.forEach((price) => (sum += price));
  confirmedTotal.textContent = `$${sum}`;
};
initApp();

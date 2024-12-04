const productListHTML = document.querySelector(".product-list");
const buttonElem = document.querySelector(".button");
const plusMinusElem = document.querySelector(".plusMinus");
const cartListHTML = document.querySelector(".cartList");

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
      <button class="button">
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

productListHTML.addEventListener("click", (e) => {
  const positionClick = e.target;
  const addToCartSection = document.querySelector(".addToCart-section");
  const plusMinusSection = document.querySelector(".plusMinus-section");
  let parentElem = "";
  if (positionClick.parentElement.classList.contains("button")) {
    parentElem = positionClick.parentElement.parentElement.dataset.id;
  } else {
    parentElem = positionClick.parentElement.datset.id;
  }
  console.log(parentElem);
  console.log(positionClick.parentElement.dataset.id);
  // if (
  //   positionClick.classList.contains("button") ||
  //   positionClick.classList.contains("img") ||
  //   positionClick.classList.contains("btn-text")
  // ) {
  //   document.querySelector(".addToCart-section").classList.toggle("hidden");
  //   document.querySelector(".plusMinus-section").classList.toggle("hidden");
  // }
  // let productIndex = listProducts.findIndex(
  //   (value) => value.id == positionClick.parentElement
  // );
});
// let addToCart = (product_id) => {
//   let positionThisProductInCart = cart.findIndex(
//     (value) => value.product_id == product_id
//   );
//   // if the value doesnt exist, it returns -1
//   if (cart.length <= 0) {
//     cart = [
//       {
//         product_id: product_id,
//         quantity: 1,
//       },
//     ];
//   } else if (positionThisProductInCart < 0) {
//     cart.push({
//       product_id: product_id,
//       quantity: 1,
//     });
//   } else {
//     cart[positionThisProductInCart].quantity =
//       cart[positionThisProductInCart].quantity + 1;
//   }
//   let positionClick = e.target.value;
//   if (positionClick.contains(addToCartSection.childNodes)) {
//     addToCartSection.classList.toggle("hidden");
//     plusMinus.classList.toggle("hidden");
//   }
//   addCartToHTML();
// };
// let addCartToHTML = () => {
//   cartListHTML.innerHTML = "";
//   let totalQuanity = 0;
//   if (cart.length > 0) {
//     cart.forEach((item) => {
//       let newCart = document.createElement("div");
//       newCart.classList.add("item");
//       newCart.dataset.id = item.product_id;

//       let positionProduct = listProducts.findIndex(
//         (value) => value.id == item.product_id
//       );
//       let info = listProducts[positionProduct];
//       cartListHTML.appendChild(newCart);
//       newCart.innerHTML = `

//             <div class="details">
//               <div class="name">${info.name}</div>
//               <div class="numbers">
//                 <span id="times">1x</span>&nbsp;
//                 <span id="cost">&nbsp;@${info.price}</span>
//                 <span id="total-cost">$${info.price}</span>
//               </div>

//             <div class="cross-sign">
//               <div>x</div>
//             </div>
//   `;
//     });
//     cartListHTML.appendChild(newCart);
//   }
// };
initApp();

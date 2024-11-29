const productListHTML = document.querySelector(".product-list");
let listProducts = [];

const addDataToHTML = () => {
  console.log(listProducts);
};

const initApp = () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      listProducts = data;
      console.log(listProducts);
    });
  addDataToHTML();
};

initApp();

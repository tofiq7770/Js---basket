"use strict";

let basket = [];

if (JSON.parse(localStorage.getItem("basket")) == null) {
  localStorage.setItem("basket", JSON.stringify(basket));
} else {
  basket = JSON.parse(localStorage.getItem("basket"));
}

function checkCartForShowDatas(basket) {
  let cartAlert = document.querySelector(".cart-alert");
  let cartTable = document.querySelector(".cart-table");
  if (basket.length == 0) {
    cartAlert.classList.remove("d-none");
    cartTable.classList.add("d-none");
  } else {
    cartAlert.classList.add("d-none");
    cartTable.classList.remove("d-none");
  }
}

checkCartForShowDatas(basket);

getBasketCount(basket);

function getBasketCount(arr) {
  let basketCount = 0;
  if (arr.length != 0) {
    for (const item of arr) {
      basketCount += item.count;
    }
  }
  document.querySelector(".navigation .basket-count").innerText = basketCount;
}

function getBasketDatas() {
  let tableBody = document.querySelector("tbody");

  let datas = "";
  basket.forEach((product) => {
    datas += `<tr>
        <td> <img src="${
          product.image
        }" style="width: 100px; height: 100px;" alt=""></td>
        <td>${product.name}</td>
        <td>${product.description}</td>
        <td data-id="${
          product.id
        }"><i class="fa-solid fa-circle-minus minus" onclick="decrease(this)"></i><span>
        ${product.count}
        </span>
        <i class="fa-solid fa-circle-plus plus" onclick="increase(this)"></i></td>
        <td>${product.price} ₼</td>
        <td>${product.price * product.count} ₼</td>
        <td><i class="fa-solid fa-circle-xmark delete-icon" data-id = ${
          product.id
        }></i></td>
        </tr>`;
  });

  tableBody.innerHTML = datas;
}

getBasketDatas();

function getGrandTotal(datas) {
  let grandTotal = 0;
  datas.forEach((data) => {
    grandTotal += data.price * data.count;
  });

  document.querySelector(".total span").innerText = grandTotal;
}

getGrandTotal(basket);

let deleteIcons = document.querySelectorAll(".delete-icon");

deleteIcons.forEach((deleteIcon) => {
  deleteIcon.addEventListener("click", function () {
    basket = basket.filter(
      (m) => m.id != parseInt(this.getAttribute("data-id"))
    );
    localStorage.setItem("basket", JSON.stringify(basket));
    this.parentNode.parentNode.remove();
    getGrandTotal(basket);
    getBasketCount(basket);
    checkCartForShowDatas(basket);
  });
});

function decrease(btn) {
  const id = btn.parentNode.getAttribute("data-id");
  const findProduct = basket.find((m) => m.id == id);
  if (findProduct != undefined) {
    findProduct.count--;
  }

  if (findProduct.count > 0) {
    btn.nextElementSibling.innerHTML = findProduct.count;
    btn.parentNode.nextElementSibling.nextElementSibling.innerHTML =
      findProduct.price * findProduct.count;
  } else {
    basket = basket.filter((m) => m.id != id);
    btn.parentNode.parentNode.remove();
    localStorage.setItem("basket", JSON.stringify(basket));
    basket = JSON.parse(localStorage.getItem("basket"));
    getGrandTotal(basket);
    checkCartForShowDatas(basket);
  }
}

function increase(btn) {
  const id = btn.parentNode.getAttribute("data-id");
  const findProduct = basket.find((m) => m.id == id);
  if (findProduct != undefined) {
    findProduct.count++;
  }
  btn.previousElementSibling.innerHTML = findProduct.count;
  btn.parentNode.nextElementSibling.nextElementSibling.innerHTML =
    findProduct.price * findProduct.count;
  localStorage.setItem("basket", JSON.stringify(basket));
  basket = JSON.parse(localStorage.getItem("basket"));
  getGrandTotal(basket);
}

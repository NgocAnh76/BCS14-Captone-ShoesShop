import { getProduct } from "../service/shoesService.js";
//hiển thị detail
function showDetail(arr) {
  let contentDetail = "";
  arr.map(function (shoes) {
    let size = shoes.size
      .map((size) => `<button class="size_item">${size}</button>`)
      .join("");
    let shoesDetail = `
    <div class="product_show">
          <div class="product_image">
            <img
              class="image_full"
              src="${shoes.image}"
              alt=""
            />
          </div>
          <div class="product_infor">
            <h3 class="product_name">${shoes.name}</h3>
  
            <p class="product_desc">
            ${shoes.shortDescription}
            </p>
            <div class="product_size">
              <p class="size_title">Available size</p>
              <div class="list_size">
                ${size}
              </div>
            </div>
            <div class="product_price">85$</div>
            <div class="product_quantity">
              <button class="button_quantity">+</button>
              <span class="quantity">1</span>
              <button class="button_quantity">-</button>
            </div>
            <button class="button_add">Add to cart</button>
          </div>
        </div>
    `;
    contentDetail += shoesDetail;
  });
  const product_show = document.querySelector(".product_show");
  if (product_show) product_show.innerHTML = contentDetail;
}

function getDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  getProduct(id)
    .then(function (result) {
      showDetail([result.data.content]);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getDetail();

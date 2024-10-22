// import
import { getListAPI, getProduct } from "../service/shoesService.js";
import { checkLoginStatus } from "./mainRegister.js";
// hiển thị UI
function showUI(arrShoes) {
  let content = "";
  arrShoes.map(function (shoes, index) {
    let shoesItem = `
    <div class="product_item animate__animated animate__zoomIn wow">
          
              <div class="item_image">
                <img
                  class="img_full"
                  src="${shoes.image}"
                  alt=""
                />
              </div>
              <div class="item_content ">
                <h3 class="item_title">${shoes.name}</h3>
                <p class="item_price">${shoes.price.toLocaleString("us-US", {
                  style: "currency",
                  currency: "USD",
                })}</p>

                <div class="item_button">
                  <div class="item_icon">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                  </div>
                  <a href="/view/detail.html?id=${shoes.id}" class="item_buy">
                  Buy Now</a>
                </div>
              </div>
            
          </div>
  `;
    content += shoesItem;
  });
  const product_content = document.querySelector(".product_content");
  if (product_content) product_content.innerHTML = content;
}

// autoplay carousel
function autoPlayCaro() {
  const myCarousel = document.querySelector("#carouselExampleCaptions");
  const carousel = new bootstrap.Carousel(myCarousel, {
    interval: 2000,
    ride: "carousel",
    wrap: true,
  });
}
autoPlayCaro();
// end carousel

// get
function getShoesList() {
  getListAPI()
    .then(function (result) {
      // console.log(result.data.content);
      showUI(result.data.content);
    })
    .catch(function (error) {
      alert("Error");
      console.log(error);
    });
}
getShoesList();
//tìm kiếm
function search() {
  let valueSearch = document.getElementById("valueSearch").value.trim();
  let axiosObj = getListAPI();
  axiosObj
    .then((response) => {
      // console.log(response);
      const products = response.data.content;
      const filterProduct = products.filter((product) => {
        return product.name.toLowerCase().includes(valueSearch.toLowerCase());
      });
      showUI(filterProduct);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      alert("Failed to fetch products.");
    });
}
checkLoginStatus();

// window
window.search = search;

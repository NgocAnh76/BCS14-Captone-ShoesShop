// autoplay carousel
function autoPlayCaro() {
  const myCarousel = document.querySelector("#carouselExampleCaptions");
  const carousel = new bootstrap.Carousel(myCarousel, {
    interval: 1000,
    ride: "carousel",
    wrap: true,
  });
}
autoPlayCaro();
// end carousel
// hiển thị UI
function showUI(arrPhone) {
  let content = "";
  arrPhone.map(function (phone, index) {
    let phoneItem = `
    <div class="product_item">
            <a href="#">
              <div class="item_image">
                <img
                  class="img_full"
                  src="${phone.image}"
                  alt=""
                />
              </div>
              <div class="item_content">
                <h3 class="item_title">${phone.name}</h3>
                <p class="item_price">${phone.price}</p>

                <div class="item_button">
                  <div class="item_icon">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                  </div>
                  <button class="item_buy">Buy Now</button>
                </div>
              </div>
            </a>
          </div>
  `;
    content += phoneItem;
  });
  document.querySelector(".product_content").innerHTML = content;
}

// get
function getPhoneList() {
  let axiosObj = axios({
    method: "get",
    url: "https://shop.cyberlearn.vn/api/Product",
    // nếu kh ghi mặc định là Json
  });
  axiosObj
    .then(function (result) {
      console.log(result);
      console.log(result.data.content);
      showUI(result.data.content);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getPhoneList();

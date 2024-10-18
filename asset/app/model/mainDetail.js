import { getProduct } from "../service/shoesService.js";

// Hiển thị chi tiết sản phẩm
function showDetail(arr) {
  let contentDetail = "";
  arr.map(function (shoes) {
    let size = shoes.size
      .map((size) => `<button class="size_item" data-size="${size}">${size}</button>`)
      .join("");
    let shoesDetail = `
    <div class="product_show" data-id="${shoes.id}">
          <div class="product_image">
            <img class="image_full" src="${shoes.image}" alt="" />
          </div>
          <div class="product_infor">
            <h3 class="product_name">${shoes.name}</h3>
            <p class="product_desc">${shoes.shortDescription}</p>
            <div class="product_size">
              <p class="size_title">Available size</p>
              <div class="list_size">${size}</div>
            </div>
            <div class="product_price">${shoes.price}$</div>
            <div class="product_quantity">
              <button class="button_quantity increase">+</button>
              <span class="quantity">1</span>
              <button class="button_quantity decrease">-</button>
            </div>
            <button class="button_add">Add to cart</button>
          </div>
        </div>
    `;
    contentDetail += shoesDetail;
  });
  const product_show = document.querySelector(".product_show");
  if (product_show) product_show.innerHTML = contentDetail;

  // Gán sự kiện cho nút "Add to cart"
  document.querySelector('.button_add').addEventListener('click', () => {
    addProductToCartFromApi();
  });

  // Gán sự kiện cho các nút kích thước
  const sizeButtons = document.querySelectorAll('.size_item');
  sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
      sizeButtons.forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected');
    });
  });

  // Xử lý nút tăng giảm số lượng
  const increaseBtn = document.querySelector('.increase');
  const decreaseBtn = document.querySelector('.decrease');
  const quantityDisplay = document.querySelector('.quantity');

  increaseBtn.addEventListener('click', () => {
    let currentQuantity = parseInt(quantityDisplay.innerText);
    if (currentQuantity < 100) { // Giới hạn số lượng tối đa
      quantityDisplay.innerText = currentQuantity + 1;
    }
  });

  decreaseBtn.addEventListener('click', () => {
    let currentQuantity = parseInt(quantityDisplay.innerText);
    if (currentQuantity > 1) { // Giới hạn số lượng tối thiểu
      quantityDisplay.innerText = currentQuantity - 1;
    }
  });
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

// Khởi tạo giỏ hàng (mảng lưu trữ các sản phẩm)
let cart = [];

// Hàm khôi phục giỏ hàng từ Local Storage
function loadCart() {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCart(); // Cập nhật giao diện giỏ hàng
  }
}

// Hàm cập nhật giỏ hàng trên giao diện
function updateCart() {
  const cartItems = document.getElementById('cartItems');
  const totalPriceEl = document.getElementById('totalPrice');
  const cartCountEl = document.getElementById('number_cart');

  cartItems.innerHTML = ''; // Xóa nội dung cũ
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    // Tạo danh sách các kích thước dựa trên sản phẩm từ API
    const sizeOptions = item.availableSizes.map(size => {
      return `<option value="${size}" ${size === item.size ? 'selected' : ''}>${size}</option>`;
    }).join('');

    const row = `
      <tr>
        <td>${item.name}</td>
        <td>
          <select class="form-select size-select" data-index="${index}">
            ${sizeOptions}
          </select>
        </td>
        <td>
          <input type="number" min="1" value="${item.quantity}" class="form-control quantity" data-index="${index}" />
        </td>
        <td>${item.price.toFixed(2)}$</td>
        <td>${itemTotal.toFixed(2)}$</td>
        <td>
          <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Xóa</button>
        </td>
      </tr>
    `;
    cartItems.insertAdjacentHTML('beforeend', row);
  });

  totalPriceEl.innerText = `${total.toFixed(2)}$`;
  cartCountEl.innerText = `(${cart.length})`;
}

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(product) {
  const existingIndex = cart.findIndex(item => item.name === product.name && item.size === product.size);
  if (existingIndex !== -1) {
    cart[existingIndex].quantity += product.quantity;
  } else {
    // Lưu danh sách kích thước có sẵn
    product.availableSizes = [32, 33, 34, 35, 36]; // Hoặc lấy từ API nếu có
    cart.push(product);
  }
  localStorage.setItem('cart', JSON.stringify(cart)); // Cập nhật vào Local Storage
  updateCart();
}

// Hàm thêm sản phẩm từ API vào giỏ hàng
function addProductToCartFromApi() {
  const productName = document.querySelector('.product_name').innerText;
  const productPriceText = document.querySelector('.product_price').innerText;
  const productPrice = parseFloat(productPriceText.replace('$', ''));
  const quantityEl = document.querySelector('.quantity');
  let quantity = parseInt(quantityEl.innerText);

  if (isNaN(quantity) || quantity < 1) {
    quantity = 1;
  }

  const selectedSize = getSelectedSize();

  const product = {
    id: Date.now(), // Sử dụng timestamp làm ID đơn giản
    name: productName,
    price: productPrice,
    quantity: quantity,
    size: selectedSize
  };

  addToCart(product);
  alert('Đã thêm sản phẩm vào giỏ hàng!');
}

// Hàm lấy kích thước đã chọn trên trang sản phẩm
function getSelectedSize() {
  const sizeButtons = document.querySelectorAll('.size_item');
  let selectedSize = 39; // Mặc định
  sizeButtons.forEach(button => {
    if (button.classList.contains('selected')) {
      selectedSize = parseInt(button.getAttribute('data-size'));
    }
  });
  return selectedSize;
}

// Xử lý thay đổi số lượng trong giỏ hàng
document.getElementById('cartModal').addEventListener('input', function(e) {
  if (e.target.classList.contains('quantity')) {
    const index = e.target.getAttribute('data-index');
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      cart[index].quantity = newQuantity;
      localStorage.setItem('cart', JSON.stringify(cart)); // Cập nhật vào localStorage
      updateCart();
    }
  }
});

// Xử lý thay đổi kích thước trong giỏ hàng
document.getElementById('cartModal').addEventListener('change', function(e) {
  if (e.target.classList.contains('size-select')) {
    const index = e.target.getAttribute('data-index');
    const newSize = parseInt(e.target.value);
    if (cart[index].availableSizes.includes(newSize)) {
      cart[index].size = newSize; // Cập nhật kích thước trong giỏ hàng
      localStorage.setItem('cart', JSON.stringify(cart)); // Cập nhật vào localStorage
      updateCart();
    }
  }
});

// Xử lý xóa sản phẩm khỏi giỏ hàng
document.getElementById('cartModal').addEventListener('click', function(e) {
  if (e.target.classList.contains('remove-item')) {
    const index = e.target.getAttribute('data-index');
    cart.splice(index, 1); // Xóa sản phẩm khỏi giỏ hàng

    // Cập nhật lại giỏ hàng trong localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCart(); // Cập nhật lại giỏ hàng trên giao diện
    alert('Sản phẩm đã được xóa khỏi giỏ hàng!'); // Thông báo cho người dùng
  }
});

// Khởi tạo giỏ hàng khi tải trang
document.addEventListener('DOMContentLoaded', () => {
  loadCart(); // Khôi phục giỏ hàng từ Local Storage
});

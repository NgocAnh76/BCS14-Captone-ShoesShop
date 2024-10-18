//import
import { postRegister } from "../service/shoesService.js";
import { Client } from "../controllers/client.js";
function postInfor() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let passwordConfirm = document.getElementById("passwordConfirm").value;
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let gender = document.querySelector('input[name="gender"]:checked').value;

  if (password !== passwordConfirm) {
    alert("Mật khẩu không khớp");
    return;
  }
  let newClient = new Client(email, password, name, phone, gender);
  let clientObj = postRegister(newClient);
  clientObj
    .then(function (result) {
      console.log(result.data);
      alert("Đăng ký thành công");
      window.location.href = " logIn.html";
    })
    .catch(function (error) {
      alert(error.response.data.message);
    });
}

// function logIn() {
//   let email = document.getElementById("inputEmail").value;
//   let password = document.getElementById("inputPassword").value;
// }
// function loginUser(username, password) {
//   fetch("https://shop.cyberlearn.vn/api/Users/signin", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email: username, password: password }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.message === "Sign in successfully") {
//         // Nếu đăng nhập thành công, lưu thông tin và hiển thị tên người dùng
//         const { email } = data.content;
//         document.getElementById("loginBtn").textContent = email;
//         document.getElementById("registerBtn").style.display = "none"; // Ẩn nút Register
//         alert("Đăng nhập thành công");
//       } else {
//         alert("Đăng nhập thất bại: " + data.message);
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       alert("Có lỗi xảy ra khi đăng nhập.");
//     });
// }
// document
//   .getElementById("loginForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault(); // Ngăn không cho form tự động submit

//     // Lấy giá trị tên và mật khẩu từ form
//     const username = document.getElementById("inputEmail").value;
//     const password = document.getElementById("inputPassword").value;

//     // Gọi hàm đăng nhập
//     loginUser(username, password);
//   });

window.postInfor = postInfor;

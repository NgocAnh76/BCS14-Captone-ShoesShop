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
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);
  localStorage.setItem("name", name);
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
      window.location.href = "logIn.html";
    })
    .catch(function (error) {
      console.log(error);
      alert(error.response.data.message);
    });
}
function checkLoginStatus() {
  // Kiểm tra trạng thái đăng nhập
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const name = localStorage.getItem("name");

  if (isLoggedIn === "true") {
    document.querySelector("#btnLogIn").style.display = "none";
    document.querySelector("#btnRegister").textContent = name; // Hiển thị tên người dùng
  }
}
checkLoginStatus();
window.postInfor = postInfor;

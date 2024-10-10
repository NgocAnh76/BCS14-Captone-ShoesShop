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
  console.log(newClient);
  let clientObj = postRegister(newClient);
  clientObj
    .then(function (result) {
      console.log(result);
      alert("Đăng ký thành công");
    })
    .catch(function (error) {
      console.log(error);
    });
}

window.postInfor = postInfor;

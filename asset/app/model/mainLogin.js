function loginUser() {
  // Lấy thông tin từ input
  const inputEmail = document.getElementById("inputEmail").value;
  const inputPassword = document.getElementById("inputPassword").value;
  console.log(inputEmail, inputPassword);
  // Lấy thông tin đã lưu từ localStorage
  const storedEmail = localStorage.getItem("email");
  const storedPassword = localStorage.getItem("password");
  const storedName = localStorage.getItem("name");
  console.log(storedEmail, storedName, storedPassword);
  // Kiểm tra email và password
  if (inputEmail == storedEmail && inputPassword == storedPassword) {
    // Lưu trạng thái đăng nhập
    localStorage.setItem("isLoggedIn", "true");
    document.querySelector("#btnLogIn").style.display = "none";
    document.querySelector("#btnRemove").style.display = "inline-block";
    document.querySelector("#btnRegister").textContent = storedName;
  } else {
    alert("Email hoặc mật khẩu không đúng");
  }
}
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.reload(); // Tải lại trang sau khi đăng xuất
}
export { logout };
// loginUser();
window.loginUser = loginUser;
window.logout = logout;

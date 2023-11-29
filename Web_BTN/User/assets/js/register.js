window.addEventListener("scroll", function () {
  var header = document.querySelector(".nav1");
  header.classList.toggle("sticky1", window.scrollY > 0);
});
//doc file
var users = [
  {
    username: "admin",
    password: "H123456789@",
  },
  // thêm các phần tử khác tùy ý
];
const storedUsers = localStorage.getItem("users");
users = storedUsers ? JSON.parse(storedUsers) : [];
//Đăng Ký
const form1 = document.getElementById("regfr");
const nameInput = document.getElementById("fullname");
const addressInput = document.getElementById("address");
const phoneInput = document.getElementById("number_phone");
const emailInput = document.getElementById("email");
const userInput = document.getElementById("Username");
const passInput = document.getElementById("password");
const repassInput = document.getElementById("Re_password");
const checkBox = document.getElementById("gridCheck");

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

form1.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameValue = nameInput.value;
  const addressValue = addressInput.value;
  const phoneValue = phoneInput.value;
  const emailValue = emailInput.value;
  const userValue = userInput.value;
  const passValue = passInput.value;
  const repassValue = repassInput.value;
  const isChecked = checkBox.checked;

  if (nameValue.trim() === "") {
    alert("Vui lòng nhập vào họ và tên ");
    nameInput.focus();
    return;
  }

  if (addressValue.trim() === "") {
    alert("Vui lòng nhập địa chỉ nơi bạn ở");
    addressInput.focus();
    return;
  }
  if (phoneValue === "") {
    alert("Vui lòng nhập Số điện thoại");
    phoneInput.focus();
    return;
  } else if (!/^[0-9]+$/.test(phoneValue)) {
    alert("Số điện thoại không đúng định dạng");
    phoneInput.focus();
    return;
  }
  if (!validateEmail(emailValue)) {
    alert("Email không hợp lệ!");
    emailInput.focus();
    return;
  }
  if (userValue.trim() === "") {
    alert("Vui lòng nhập tên đăng nhập");
    userInput.focus();
    return;
  }
  const temp = users.findIndex((user) => user.username === userValue);
  if (temp !== -1) {
    alert("Tài khoảng đã tồn tại!");
    userInput.focus();
    return;
  }

  if (passValue.trim() === "") {
    alert("Vui lòng nhập mật khẩu");
    passInput.focus();
    return;
  }

  if (passValue.length < 8) {
    alert("Mật khẩu phải có ít nhất 8 ký tự");
    passInput.focus();
    return;
  }

  if (!/[A-Z]/.test(passValue)) {
    alert("Mật khẩu phải chứa ít nhất một chữ cái viết hoa");
    passInput.focus();
    return;
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(passValue)) {
    alert("Mật khẩu phải chứa ít nhất một ký tự đặc biệt");
    passValue.focus();
    return;
  }
  if (repassValue === "") {
    alert("Vui lòng nhập lại Mật khẩu");
    repassValue.focus();
    return;
  } else if (passValue !== repassValue) {
    alert("Mật khẩu không khớp");
    repassValue.focus();
    return;
  }

  if (!isChecked) {
    alert("Vui lòng đồng ý với điều khoản và chính sách của chúng tôi");
    return;
  }
  alert("Bạn đã đăng ký thành công");
  var newUser = {
    username: userValue,
    password: passValue,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  window.location.assign("sign_in.html");
});

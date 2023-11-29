window.addEventListener("scroll", function () {
  var header = document.querySelector(".nav1");
  header.classList.toggle("sticky1", window.scrollY > 0);
});

const storedUsers = localStorage.getItem("users");
var users = storedUsers ? JSON.parse(storedUsers) : [];
const form1 = document.getElementById("regfr");
const userInput = document.getElementById("Username");
const passInput = document.getElementById("password");

form1.addEventListener("submit", (event) => {
  event.preventDefault();

  const userValue = userInput.value;
  const passValue = passInput.value;

  if (userValue.trim() === "") {
    alert("Vui lòng nhập tên đăng nhập");
    userInput.focus();
    return;
  }
  if (passValue.trim() === "") {
    alert("Vui lòng nhập mật khẩu");
    passInput.focus();
    return;
  }
  const temp = users.findIndex(
    (user) => user.username === userValue && user.password === passValue
  );
  var newUser1 = 0;
  if (temp != -1) {
    newUser1 = 1;
    localStorage.setItem("newUser1", JSON.stringify(newUser1));
  }
  if (temp != -1) {
    var newUser = 1;
    alert("Đăng nhập thành công!");
    localStorage.setItem("newUser", JSON.stringify(newUser));
    window.location.assign("product.html");
  } else {
    alert(
      "Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại!"
    );
    userInput.focus();
    return;
  }
});

const storedUsers = localStorage.getItem("newUser1");
const newUser1 = storedUsers ? JSON.parse(storedUsers) : [];
if (newUser1 == 0) {
  if(window.location.pathname == "/Admin/qldonhang.html"){

  }else{
    window.location.assign("sign_in.html");
  }
}
function addCart(code) {
  if (typeof localStorage[code] === "undefined") {
    window.localStorage.setItem(code, 1);
    set_alert_success("Đặt hàng thành công. Tổng số lượng đã đặt là: 1 ");
  } else {
    let current = parseInt(window.localStorage.getItem(code));
    if (current == 100) {
      set_alert("Số lượng sản phẩm đã đạt giới hạn");
    } else {
      if (current + 1 > 100) {
        window.localStorage.setItem(code, 100);
        set_alert("Đã quá giới hạn. Tổng số lượng hiện tại trong giỏ là: 100.");
      } else {
        window.localStorage.setItem(code, current + 1);
        set_alert_success(
          "Đặt hàng thành công. Tổng số lượng đã đặt là: " + (1 + current) + "."
        );

      }
    }
  }
}
function subQuantity(code) {
  let current = parseInt(window.localStorage.getItem(code));
  if (current == 1) {
    set_alert("Số lượng sản phẩm đã đạt mức tối thiểu");
  } else {
    if (current - 1 < 1) {
      window.localStorage.setItem(code, 1);
      set_alert("Số lượng đã đạt mức tối thiểu.");
    } else {
      window.localStorage.setItem(code, current - 1);
    }
  }
  showCart();
}
function addQuantity(code) {
  let current = parseInt(window.localStorage.getItem(code));
  if (current == 100) {
    set_alert("Số lượng sản phẩm đã đạt giới hạn");
  } else {
    if (current + 1 > 100) {
      window.localStorage.setItem(code, 100);
      set_alert("Đã quá giới hạn. Tổng số lượng hiện tại trong giỏ là: 100.");
    } else {
      window.localStorage.setItem(code, current + 1);
    }
    showCart();
  }
}

var product = JSON.parse(localStorage.getItem("itemsArrayAD") || "[]");
function showCart() {
  product.forEach(function (item_product, index) {
  });
  var item_product = {}
  product.push(item_product);
  localStorage.setItem("product", JSON.stringify(product));
  var tbody = document
    .getElementById("cartDetail")
    .getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";
  var formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  var totalPreTax = 0;
  for (let i = 0; i < product.length; i++) {
    if (window.localStorage.getItem(product[i].masp) > 0) {
      var key = product[i].masp;
      var item = product[i];
      var qty = localStorage.getItem(key);
      var photo = document.createElement("td");
      photo.innerHTML = "<img src='" + item.photo + "' width='150px'/>";
      photo.style.textAlign = "center";

      var name = document.createElement("td");
      name.innerHTML = item.name;
      name.style.textAlign = "center";

      var quantity = document.createElement("td");
      quantity.innerHTML =
        "<button type='button' class='btn btn-light p-2 m-2' onclick='subQuantity(\"" +
        key +
        "\")'>-</button>" +
        qty +
        "<button type='button' class='btn btn-light p-2 m-2' onclick='addQuantity(\"" +
        key +
        "\")'>+</button>";
      // quantity.innerHTML = qty;
      quantity.style.textAlign = "center";

      var price = document.createElement("td");
      price.innerHTML = formatter.format(item.price);
      price.style.textAlign = "center";

      var total = document.createElement("td");
      total.innerHTML = formatter.format(item.price * qty);
      total.style.textAlign = "center";
      totalPreTax += item.price * qty;

      var bin = document.createElement("a");
      bin.innerHTML =
        "<button type='button' class='btn btn-danger p-2 m-2' > Xóa </button>";
      bin.setAttribute("href", "#");
      bin.setAttribute("data-code", key);
      bin.onclick = function () {
        removeCart(this.dataset.code);
      };

      var rm = document.createElement("td");
      rm.appendChild(bin);
      rm.style.textAlign = "center";

      var row = document.createElement("tr");
      row.appendChild(photo);
      row.appendChild(name);
      row.appendChild(quantity);
      row.appendChild(price);
      row.appendChild(total);
      row.appendChild(rm);

      tbody.appendChild(row);
    }
    // var discountRate = getDiscountRate()
    // var discount = totalPreTax * discountRate;
    // var tax = 0.1 * (totalPreTax - discount);
    document.getElementById("bill_totalpretax").innerHTML =
      formatter.format(totalPreTax);
    // document.getElementById("bill_discount").innerHTML = discountRate + " x A = " + formatter.format(discount);
    // document.getElementById("bill_tax").innerHTML = formatter.format(tax);
    // document.getElementById("bill_total").innerHTML = formatter.format(totalPreTax - discount + tax);
  }
}
function removeCart(code) {
  if (typeof window.localStorage[code] !== "undefined") {
    window.localStorage.removeItem(code);
    document
      .getElementById("cartDetail")
      .getElementsByTagName("tbody")[0].innerHTML = "";
    showCart();
  }
}
window.onstorage = () => {
  location.reload();
};
var itemArray1 = {};
var test2 = JSON.parse(localStorage.getItem("itemsArray1")) || [];
function set_alert(message) {
  $(document).ready(function () {
    var notice_danger = document.getElementById("alert_danger");

    notice_danger.classList.add("show");

    $("#alert_danger").text(message);
    setTimeout(() => {
      showoff("alert_danger");
    }, 2000);
  });
}
function set_alert_success(message) {
  $(document).ready(function () {
    var notice_danger = document.getElementById("alert_success");

    notice_danger.classList.add("show");

    $("#alert_success").text(message);
    setTimeout(() => {
      showoff_1("alert_success");
    }, 1000);
  });
}


function order() {
  $(document).ready(function () {
    var name = document.getElementById("user_name_cart").value;

    var email = document.getElementById("user_email_cart").value;

    var phone = document.getElementById("phone_cart").value;

    var address = document.getElementById("address_cart").value;
    var total = $("#bill_totalpretax").text();
    var item = [];
    var x = 0;
    for (let i = 0; i < product.length; i++) {
      if (window.localStorage.getItem(product[i].masp) > 0) {
        var key = product[i].masp;
        var sl = localStorage.getItem(key);
        item[x] = key;
        item[x + 1] = sl;
        x += 2;
      }
    }

    if (
      item.length > 1 &&
      isNaN(name) &&
      isNaN(phone) == false &&
      (phone.length == 10 || phone.length == 11)
    ) {
      for (let i = 0; i < product.length; i++) {
        if (window.localStorage.getItem(product[i].masp) > 0) {
          var key1 = product[i].masp;
          removeCart(key1);
        }
      }
      var newItem = {
        user_name: name,
        user_mail: email,
        phone: phone,
        address: address,
        total: total,
        status: "Chờ duyệt",
        itemcode: item,
      };
      // console.log(newItem)
      test2.push(newItem);
      localStorage.setItem("itemsArray1", JSON.stringify(test2));
      var notice_success = document.getElementById("alert_success");
      notice_success.classList.add("show");
      setTimeout(() => {
        location.reload();
      }, 1500);
    } else {
      if (item.length < 1) {
        set_alert("Chưa có sản phẩm nào trong giỏ hàng");
      } else {
        var notice_danger = document.getElementById("alert_danger");
        notice_danger.classList.add("show");
        setTimeout(() => {
          showoff("alert_danger");
        }, 3000);
      }
    }
  });
}

function showoff(code) {
  var notice = document.getElementById(code);
  notice.classList.remove("show");
  if (code == "alert_success") {
    location.reload();
  }
}

function showoff_1(code) {
  var notice = document.getElementById(code);
  notice.classList.remove("show");
  if (code == "alert_success") {
    // location.reload();
  }
}
function show_order_user() {
  var i;
  for (i = 0; i < test2.length; i++) {
    var test = Object.values(test2[i]);
    // console.log(test)
    var user_name = test[0];
    var user_mail = test[1];
    var phone = test[2];
    var address = test[3];
    var total = test[4];
    var status = test[5];
    var tbody = document.createElement("tbody");
    document.getElementById("cartDetail").append(tbody);
    tbody.setAttribute("id", "tbody");
    var tr = document.createElement("tr");
    document.getElementById("tbody").append(tr);
    tr.innerHTML =
      "<td><p>" +
      (i + 1) +
      "</p></td>" +
      "<td><p>" +
      user_name +
      "</p></td>" +
      "<td><p>" +
      user_mail +
      "</p></td>" +
      "<td><p>" +
      phone +
      "</p></td>" +
      "<td><p>" +
      address +
      "</p></td>" +
      "<td><p>" +
      total +
      "</p></td>" +
      "<td><p id='order_status" +
      i +
      "'>" +
      status +
      "</p></td>" +
      "<td><button type='button' class=' btn btn-success' data-bs-toggle='modal' data-bs-target='#myModal2'onclick='show_detail_order(" +
      i +
      ")' >" +
      "Chi tiết" +
      "</button></td>";
   }
}

function show_order() {
 
  var i;
  for (i = 0; i < test2.length; i++) {
    var test = Object.values(test2[i]);
   
    var user_name = test[0];
    var user_mail = test[1];
    var phone = test[2];
    var address = test[3];
    var total = test[4];
    var status = test[5];
 
    var tr = document.createElement("tr");
    document.getElementById("tbody").append(tr);
    tr.innerHTML =
      "<td><p>" +
      (i + 1) +
      "</p></td>" +
      "<td><p>" +
      user_name +
      "</p></td>" +
      "<td><p>" +
      user_mail +
      "</p></td>" +
      "<td><p>" +
      phone +
      "</p></td>" +
      "<td><p>" +
      address +
      "</p></td>" +
      "<td><p>" +
      total +
      "</p></td>" +
      "<td><p id='order_status" +
      i +
      "'>" +
      status +
      "</p></td>" +
      "<td><button type='button' class=' btn btn-success' data-bs-toggle='modal' data-bs-target='#myModal2'onclick='show_detail_order(" +
      i +
      ")' >" +
      "Chi tiết" +
      "</button></td>" +
      "<td><button type='button' class='btn btn-warning' data-bs-toggle='modal' data-bs-target='#myModal' id='order" +
      i +
      "' onclick='change_status(" +
      i +
      ")'>Sửa Trạng Thái</button></td>" +
      "<td><button type='button' class='btn btn-danger' onclick='invoice(" +
      i +
      ")'>Xuất Đơn</button></td>";
    }
}

function show_detail_order(code) {
  var i = 0;
  var tbody1 = document.createElement("tbody");
  document.getElementById("table_detail").append(tbody1);
  tbody1.setAttribute("id", "tbody1");
  while (test2[code].itemcode[i] != undefined) {
    var tr1 = document.createElement("tr");
    document.getElementById("tbody1").append(tr1);
    tr1.setAttribute("id", "detail_order" + i);
    var masp = test2[code].itemcode[i];
    for (let i = 0; i < product.length; i++) {
      if (masp == product[i].masp) {
        var src = product[i].photo;
        var namesp = product[i].name;
      }
    }
    var qty = test2[code].itemcode[i + 1];
    tr1.innerHTML =
      "<td><p>" +
      masp +
      "</p></td>" +
      "<td><img width='150px' src='" +
      src +
      "'/></td>" +
      "<td><p>" +
      namesp +
      "</p></td>" +
      "<td><p>" +
      qty +
      "</p></td>";
    i += 2;
  }
}

function delete_detail_order() {
  $(document).ready(function () {
    $("#tbody1").remove();
  });
}

function change_status(code) {
  $(document).ready(function () {
    var btn_status = document.getElementById("btn_status");
    btn_status.setAttribute("id", code);
  });
}
function apply(code) {
  var btn_status = document.getElementById(code);
  btn_status.setAttribute("id", "btn_status");
  var test = document.getElementById("status").value;
  test2[code].status = test;
  localStorage.setItem("itemsArray1", JSON.stringify(test2));
  location.reload();
}

function invoice(code) {
  if (test2[code].status == "Đã giao") {
    if (code == 0) {
      test2.splice(0, 1);
    } else {
      test2.splice(code, 1);
    }
    localStorage.setItem("itemsArray1", JSON.stringify(test2));
    var notice_success = document.getElementById("alert_success");
    notice_success.classList.add("show");
    setTimeout(() => {
      location.reload();
    }, 1500);
  } else {
    var notice_danger = document.getElementById("alert_danger");
    notice_danger.classList.add("show");
    setTimeout(() => {
      showoff("alert_danger");
    }, 1500);
  }
}

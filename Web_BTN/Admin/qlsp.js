var itemsArrayAD = {};
var test3 = JSON.parse(localStorage.getItem("itemsArrayAD")) || [];

function addItem() {
    var masp = document.getElementById('masp').value
    var tensp = document.getElementById('tensp').value
    var giasp = document.getElementById('giasp').value
    var loaisp = document.getElementById('tinh').value
    var hinhsp = document.getElementById('hinhsp').value
    var ndsp = document.getElementById('ndsp').value
    var check = 0;
    let x
    for (x = 0; x < test3.length; x++) {
        if (test3[x].masp == masp) {
            check = 1;
        }
    }
    if (masp != "" && tensp != "" && giasp != "" && loaisp != "" && hinhsp != "" && ndsp != "") {
        if (check == 0) {
            if (giasp == 0) {
                giasp = 1;
            }
            if (loaisp == "An Giang" || loaisp == "Bạc Liêu" || loaisp == "Bến Tre" || loaisp == "Cà Mau" || loaisp == "Đồng Tháp" || loaisp == "Tiền Giang" || loaisp == "Kiên Giang" || loaisp == "Hậu Giang" || loaisp == "Long An" || loaisp == "Trà Vinh" || loaisp == "Vĩnh Long" || loaisp == "Sóc Trăng") {
                var newItem = {
                    masp: masp,
                    name: tensp,
                    price: giasp,
                    photo: hinhsp,
                    area: loaisp,
                    content: ndsp
                };
                test3.push(newItem);
                localStorage.setItem("itemsArrayAD", JSON.stringify(test3));
                location.reload()
            } else {
                alert("Chọn sai danh mục vui lòng nhập lại")
            }
        } else {
            alert("Sản phẩm đã tồn tại")
        }
    } else {
        alert("Vui lòng nhập lại với đầy đủ thông tin")
    }
}

function show_product() {
    var i;
    for (i = 0; i < test3.length; i++) {
        var test = Object.values(test3[i]);
        var masp = test[0];
        var name = test[1];
        var price = test[2];
        var photo = test[3];
        var area = test[4];
        var content = test[5];

        var tbody = document.createElement("tbody");
        document.getElementById("product").append(tbody);
        tbody.setAttribute("id", "tbody");
        var tr = document.createElement("tr");
        document.getElementById("tbody").append(tr);
        tr.innerHTML = "<td><p id='ma" + masp + "'>" + masp + "</p></td>"
            + "<td><img width='100px' height='100px' id='hinh" + masp + "' src='" + photo + "'></td>"
            + "<td><p id='ten" + masp + "'>" + name
            + "</p></td>" + "<td><p id='gia" + masp + "'>" + price + "</p></td>"
            + "<td><p id='loai" + masp + "'>" + area + "</p></td>"
            + "<td><p id='nd" + masp + "'>" + "<span id='dots"+masp+"'></span><span class='more' id='more"+masp+"'>" + content + "</span></p>"
            + "<button onclick='myFunction(\""+masp+"\")' id='myBtn"+masp+"'>Xem</button></td>"
            + "<td><button type='button' class='btn btn-success' data-bs-toggle='modal' data-bs-target='#myModal2' id='" + masp + "' onclick='editForm(\"" + i + "\")' >" + "Chỉnh sửa" + "</button></td>"
            + "<td><button type='button' class='btn btn-danger' data-bs-dismiss='modal' id='delete" + masp + "' onclick='deleteItem(\"" + i + "\")' >" + "Xóa" + "</button></td>"
    }
}
function reset() {
    $(document).ready(function () {
        $("#masp").val("");
        $("#hinhsp").val("");
        $("#tensp").val("");
        $("#giasp").val("");
        $("#tinh").val("");
        $("#ndsp").val("");
    });
}

function editForm(code) {
    $(document).ready(function () {
        $("#items").text(code)
        $("#maspedit").text(test3[code].masp);
        // $("#hinhspedit").val();
        $("#tenspedit").val(test3[code].name);
        $("#giaspedit").val(test3[code].price);
        $("#loaispedit").val(test3[code].area);
        $("#ndspedit").val(test3[code].content);
    });
}
function editItem(code) {
    $(document).ready(function () {
        var code = $('#items').text()
        var hinhspedit = document.getElementById('hinhspedit').value
        var tenspedit = document.getElementById('tenspedit').value
        var giaspedit = document.getElementById('giaspedit').value
        var loaispedit = document.getElementById('loaispedit').value
        var ndspedit = document.getElementById('ndspedit').value
        if (tenspedit != "" && giaspedit != "" && loaispedit != "" && ndspedit != "") {
            if (loaispedit == "An Giang" || loaispedit == "Bạc Liêu" || loaispedit == "Bến Tre" || loaispedit == "Cà Mau" || loaispedit == "Đồng Tháp" || loaispedit == "Tiền Giang" || loaispedit == "Kiên Giang" || loaispedit == "Hậu Giang" || loaispedit == "Long An" || loaispedit == "Trà Vinh" || loaispedit == "Vĩnh Long" || loaispedit == "Sóc Trăng") {
                test3[code].name = tenspedit
                console.log(test3[code].name)
                test3[code].price = giaspedit
                test3[code].area = loaispedit
                test3[code].content = ndspedit
                if (hinhspedit.length > 0) {
                    test3[code].photo = hinhspedit

                }
                localStorage.setItem("itemsArrayAD", JSON.stringify(test3));
                location.reload()
            } else {
                alert("Danh mục sản phẩm sai")
            }
        } else {
            alert("Vui lòng nhập lại với đầy đủ thông tin cần thiết")
        }
    });
}

function deleteItem(code) {
    if (code == 0) {
        test3.splice(0, 1);
    } else {
        test3.splice(code, 1);
    }
    localStorage.setItem("itemsArrayAD", JSON.stringify(test3));
    location.reload()
}
function areachange(code) {
    if (code == "Tiền Giang") {
        return "tiengiang"
    }
    switch (code) {
        case "An Giang":
            return "angiang";
        case "Tiền Giang":
            return "tiengiang";
        case "Kiên Giang":
            return "kiengiang";
        case "Hậu Giang":
            return "haugiang";
        case "Long An":
            return "longan";
        case "Trà Vinh":
            return "travinh";
        case "Sóc Trăng":
            return "soctrang";
        case "Đồng Tháp":
            return "dongthap";
        case "Vĩnh Long":
            return "vinhlong";
        case "Bạc Liêu":
            return "baclieu";
        case "Cà Mau":
            return "camau";
        case "Bến Tre":
            return "bentre";
    }
}

function show_items() {
    var i
    var formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    for (i = 0; i < test3.length; i++) {
        var area = areachange(test3[i].area)
        var div = document.createElement('div')
        div.setAttribute("class", "col-12 col-md-6")
        document.getElementById(area + "row").append(div)
        div.innerHTML = '<div class="py-3 border-bottom">'
            + '  <div class="row">'
            + '    <div class="col-3 align-self-center" id="' + i + '" data-bs-toggle="modal"data-bs-target="#myModal"'
            + '    onclick="show_detail_product(this.id)">'
            + '              <div class="ratio ratio-1x1">'
            + '      <img class="object-fit-cover" src="' + test3[i].photo + '" alt="..." />'
            + '    </div></div><div class="col-6">'
            + '              <h5 class="mb-2">' + test3[i].name + '</h5>'
            // + '              <p class="mb-0">' + test3[i].content + '</p>'
            + '    </div>'
            + '<div class="col-3">'
            + '              <div class="fs-4 font-serif text-center text-black">' + formatter.format(test3[i].price)
            + '       <button type="button" class="btn btn-danger p-2" onclick="addCart(\'' + test3[i].masp + '\')">'
            + '           Đặt hàng</button>'
            + '    </div>'
            + '  </div>'
            + '</div>'
            + '</div>'
        // var div1 = document.createElement('div')
    }
}

function show_detail_product(code) {
    $(document).ready(function () {
        var formatter = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        });
        document
            .getElementById("img_detail")
            .setAttribute("src", test3[code].photo);
        $("#name_detail").text(test3[code].name);
        $("#price_detail").text("Giá: " + formatter.format(test3[code].price));
        $("#content_detail").text(test3[code].content);
        document.getElementById("btn_detail").setAttribute("name", test3[code].masp);
    });
}


function myFunction(code) {

    var dots = document.getElementById("dots"+code);
    var moreText = document.getElementById("more"+code);
    var btnText = document.getElementById("myBtn"+code);
    console.log(dots)
    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Xem";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Đóng";
        moreText.style.display = "inline";
    }
}
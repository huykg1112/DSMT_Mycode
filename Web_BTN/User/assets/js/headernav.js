window.addEventListener("scroll", function () {
    var header = document.querySelector(".navheader");
    header.classList.toggle("sticky", window.scrollY > 0);
  });
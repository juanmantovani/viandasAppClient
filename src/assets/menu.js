let menuHamburguesa = document.querySelector(".nav__logo");

menuHamburguesa.addEventListener("click", () => {
  let menu = document.querySelector(".list");

  menu.classList.toggle("list--show");
});

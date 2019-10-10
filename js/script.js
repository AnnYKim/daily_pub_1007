(function () {
  console.log("!");

  var headerElem = document.querySelector(".header");
  var dimElem = headerElem.querySelector(".dim");
  var menuBtn = document.querySelector(".menu-btn");

  var scrollHandler = function () {
    var scrollY = window.scrollY;

    var winH = window.innerHeight;
    var eventPos = winH * 0.15;

    scrollY >= eventPos ?
      headerElem.classList.add("header--minimized") :
      headerElem.classList.remove("header--minimized");

  };

  var menuClickHandler = function () {
    headerElem.classList.toggle("header--opened");
    // dimElem.classList.toggle("visible");
  };

  var init = function () {
    // dimElem.classList.toggle("visible-hidden");
  };
  window.addEventListener("load", init);
  window.addEventListener("scroll", scrollHandler);
  menuBtn.addEventListener("click", menuClickHandler);
}())
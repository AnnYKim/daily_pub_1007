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
  };

  var dimClickHandler = function () {
    menuClickHandler();
  }



  function cursorEvt() {
    const cursor = document.querySelector('.cursor');
    const link = document.querySelector('.loader__link');

    cursor.style.top = 0;
    cursor.style.left = 0;

    link.addEventListener('mouseenter', function () {
      // cursor.style.setProperty("opacity", 1);
      cursor.classList.add('show');
    });

    link.addEventListener('mouseleave', function () {

      // cursor.style.setProperty("opacity", 0);
      cursor.classList.remove('show');
    });

    link.addEventListener('mousemove', function (e) {
      var mousePos = {};
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;

      cursor.style.top = mousePos.y + 'px';
      cursor.style.left = mousePos.x + "px";
    });

    link.addEventListener('mousedown', function () {
      cursor.classList.add('clicked');
    });
    link.addEventListener('mouseup', function () {
      cursor.classList.remove('clicked');
    });

  }


  var init = function () {
    cursorEvt();
  };




  window.addEventListener("load", init);
  window.addEventListener("scroll", scrollHandler);
  menuBtn.addEventListener("click", menuClickHandler);
  dimElem.addEventListener("click", dimClickHandler);
}())
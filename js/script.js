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

  // var cursorEvent = function () {
  //   var cursor = document.querySelector('.cursor');
  //   cursor.style.top = 0;
  //   cursor.style.left = 0;

  //   document.addEventListener('mousemove', function (e) {
  //     cursor.style.setProperty("opacity", 1); //opacity 0으로 숨겨져 있던 걸 드러냄
  //     var mousePos = {
  //       x: e.clientX,
  //       y: e.clientY
  //     }
  //     cursor.style.top = mousePos.y + 'px';
  //     cursor.style.left = mousePos.x + "px";
  //   });

  // };


  function cursorEvt() {
    const cursor = document.querySelector('.cursor'); //커서 모양이 될 하트 요소
    const link = document.querySelector('.loader__link'); //푸터 링크

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
    // cursorEvent();
    cursorEvt();
  };




  window.addEventListener("load", init);
  window.addEventListener("scroll", scrollHandler);
  menuBtn.addEventListener("click", menuClickHandler);
}())
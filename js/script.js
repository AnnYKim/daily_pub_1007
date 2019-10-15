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


  var fish01 = document.querySelector(".hello__fish--one"),
    fish02 = document.querySelector(".hello__fish--two")
  path = [{
      x: 0,
      y: 0
    }, {
      x: 125,
      y: -40,
      rotation: 30,
      scale: 2
    }, {
      x: 250,
      y: 0
    }],
    path2 = [{
      x: 0,
      y: 0
    }, {
      x: 125,
      y: 80
    }, {
      x: 250,
      y: 0
    }]
  tl = new TimelineMax({
    repeat: -1,
    yoyo: true
  });


  // tl.to(fish01, 1, {
  //   bezier: {
  //     curviness: 1,
  //     values: path
  //   },
  //   ease: Power1.easeInOut
  // })
}())
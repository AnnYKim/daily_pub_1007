document.addEventListener("DOMContentLoaded", function () {
  Barba.Pjax.init();
  var transEffect = Barba.BaseTransition.extend({
    start: function () {
      console.log("start");
      // this.newContainerLoading.then(this.fadeIn.bind(this));
      Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.fadeIn.bind(this));
    },
    fadeOut: function () {
      var oc = this.oldContainer;
      var _this = this;
      // oc.style.display == "none";
      TweenMax.to(oc, 0.3, {
        opacity: 0,
        onComplete: function () {
          console.log("tween complete");
          // _this.promise();
        }
      })
    },
    fadeIn: function () {
      console.log("finish");
      var _this = this;
      var oc = this.oldContainer;
      var nc = this.newContainer;
      oc.style.display = "none";
      oc.style.visibility = "hidden";
      nc.style.visibility = "visible";
      TweenMax.from(nc, 2, {
        opacity: 0,
        onComplete: function () {
          console.log("tween complete");
          _this.done();
        }
      })
    }
    // finish: function () {
    //   console.log("finish");
    //   var nc = this.newContainer;
    //   var _this = this;
    //   nc.style.display == "none";
    //   this.oldContainer.promise().done(() => {
    //     nc.style.visibility = "visible";
    //     TweenMax.from(nc, 0.3, {
    //       opacity: 0,
    //       onComplete: function () {
    //         console.log("tween complete");
    //         _this.done();
    //       }
    //     })
    //   });
    //   // this.done();
    // }
  });
  Barba.Pjax.getTransition = function () {
    return transEffect;
  };
  Barba.Pjax.start();
});
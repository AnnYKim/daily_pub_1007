document.addEventListener("DOMContentLoaded", function () {
  Barba.Pjax.init();
  
  console.log("fadeInOut.js!")
  // 애니메이션이 재생 중인지 판단
  var is_animating = false;


  var transEffect = Barba.BaseTransition.extend({
    start: function () {
      console.log("start");
      Promise
      .all([this.newContainerLoading, this.fadeOut()])
      .then(this.fadeIn.bind(this));
    },
    
    fadeOut: function() {
      // return $(this.oldContainer).animate({ opacity: 0 }).promise();
      var bg = document.querySelector("#bg");
      var deferred = Barba.Utils.deferred();
      var nc = this.newContainer;


      TweenMax.to(bg, 2, {
        opacity: 0,
        onComplete: function () {
          console.log("fadeOUt complete");
          // $(_this).remove();
          deferred.resolve();
        }
      })
      return deferred.promise;
    },
  
    fadeIn: function() {
      var _this = this;
      var $el = $(this.newContainer);
  
      $(this.oldContainer).hide();
  
      $el.css({
        visibility : 'visible',
        opacity : 0
      });
  
      $el.animate({ opacity: 1 }, 400, function() {
        _this.done();
      });
    }
  });
  
    Barba.Pjax.getTransition = function () {
      return transEffect;
    };
  });
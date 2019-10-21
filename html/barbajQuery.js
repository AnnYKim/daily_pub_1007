document.addEventListener("DOMContentLoaded", function () {

  var is_animating = false;
  // Prevent current url to reload page
  // $('a[href]').on('click', function (e) {
  //   if (e.currentTarget.href === window.location.href) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //   }
  // });

  // Default Transition
  var FadeTransition = Barba.BaseTransition.extend({
    start: function () {
      console.log("!");
      // if (is_animating) return;
      // is_animating = true;
      Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.fadeIn.bind(this));
    },

    fadeOut: function () {
      var _this = this;
      var bg = document.querySelector("#bg");
      var deferred = Barba.Utils.deferred();
      var current_url = Barba.Utils.getCurrentUrl();
      var $old_dom = $(this.oldContainer);
      var nc = this.newContainer;
      // var $old_page = $old_dom.find('#page_content');
      // var name = $old_page.attr('data-namespace');
      var win_w = $(window).width();
      var win_h = $(window).height();


      TweenMax.from(nc, 2, {
        opacity: 0,
        onComplete: function () {
          console.log("fadein complete");
          $(_this).remove();
          deferred.resolve();
          //  _this.done(); 
        }
      })
      return deferred.promise;
    },

    fadeIn: function () {

      var _this = this;
      var $el = $(this.newContainer);

      $(this.oldContainer).hide();

      $el.css({
        visibility: 'visible',
        opacity: 0
      });

      $el.animate({
        opacity: 1
      }, 400, function () {
        /**
         * Do not forget to call .done() as soon your transition is finished!
         * .done() will automatically remove from the DOM the old Container
         */

        _this.done();
      });
    }
  });

  /**
   * Next step, you have to tell Barba to use the new Transition
   */

  Barba.Pjax.getTransition = function () {
    /**
     * Here you can use your own logic!
     * For example you can use different Transition based on the current page or link...
     */

    return FadeTransition;
  };
});
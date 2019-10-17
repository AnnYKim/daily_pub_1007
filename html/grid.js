document.addEventListener("DOMContentLoaded", function () {
  var lastElementClicked;
  Barba.Pjax.init();
  Barba.Prefetch.init();

  Barba.Dispatcher.on('linkClicked', function (el) {
    //https://barba.js.org/v1/docs/Barba.Dispatcher.html
    lastElementClicked = el;
    console.log(lastElementClicked);
  });

  var ExpandTransition = Barba.BaseTransition.extend({
    start: function () {
      this.originalThumb = lastElementClicked;

      Promise
        .all([this.newContainerLoading, this.enlargeThumb()])
        .then(this.showNewPage.bind(this));
    },

    enlargeThumb: function () {
      var deferred = Barba.Utils.deferred();
      var thumbPosition = this.originalThumb.getBoundingClientRect();

      this.cloneThumb = this.originalThumb.cloneNode(true);
      this.cloneThumb.style.position = 'absolute';
      this.cloneThumb.style.top = thumbPosition.top + 'px';

      this.oldContainer.appendChild(this.cloneThumb);

      TweenLite.to("#test", 0.3, {
        top: 0,
        height: window.innerHeight,
        onComplete: function () {
          deferred.resolve();
        }
      });
      // TweenLite.to(this.cloneThumb, 0.3, {
      //   top: 0,
      //   height: window.innerHeight,
      //   onComplete: function () {
      //     deferred.resolve();
      //   }
      // });

      return deferred.promise;
    },

    showNewPage: function () {
      this.newContainer.style.visibility = 'visible';
      this.done();
    }
  });


  var ShrinkTransition = Barba.BaseTransition.extend({
    start: function () {
      this.newContainerLoading.then(this.shrinkImage.bind(this));
    },

    shrinkImage: function () {
      var _this = this;

      this.oldContainer.style.zIndex = '10';
      this.newContainer.style.visibility = 'visible';

      var href = Barba.HistoryManager.prevStatus().url.split('/').pop();
      var destThumb = this.newContainer.querySelector('a[href="' + href + '"]');
      var destThumbPosition = destThumb.getBoundingClientRect();
      var fullImage = this.oldContainer.querySelector('.full');

      TweenLite.to(this.oldContainer.querySelector('.back'), 0.2, {
        opacity: 0
      });

      TweenLite.to("#test", 0.3, {
        top: "100%",
        width: "100%",
        onComplete: function () {
          _this.done();
        }
      });
    }
  });

  Barba.Pjax.getTransition = function () {
    var transitionObj = ExpandTransition;

    if (Barba.HistoryManager.prevStatus().namespace === 'detail') {
      transitionObj = ShrinkTransition;
    }

    return transitionObj;
  };



});
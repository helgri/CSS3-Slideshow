  var Slideshow = function($node) {

    var $items = $node.find("li"),
        active = "active",
        click  = "click",
        currentIdx = 0,
        max = $items.length-1,
        go = function(back) {
          $items.eq( back ? (currentIdx-1 <0 ? max : --currentIdx) : (currentIdx+1 > max ? 0 : ++currentIdx) ).trigger(click);
        };

    $node.on(click, "li", function(e){
      var $this = $(this);
      $this.siblings( [".",active].join("") ).andSelf().toggleClass(active);
      currentIdx = $this.index();
    }).on(click, "img", function(e){
      e.stopPropagation();
      go();
    });

    if (Modernizr.touch) {
      var startX, startY, deltaX, deltaY, isswipe,

      start = function(e) {
        if (e.originalEvent.touches.length === 1) {
          startX = e.originalEvent.touches[0].pageX;
          startY = e.originalEvent.touches[0].pageY;

          $node.on("touchmove", move).one("touchend", end);
        }
      },

      move = function(e) {
        deltaX = startX - e.originalEvent.touches[0].pageX;
        deltaY = startY - e.originalEvent.touches[0].pageY;

        if ( Math.abs(deltaX) >= 20 && Math.abs(deltaX) > Math.abs(deltaY) ) {
          e.preventDefault();
          e.stopPropagation();
          isswipe = true;
        } else {
          isswipe = false;
        }
      },

      end = function(e) {
        isswipe && go(deltaX < 0);

        isswipe = false;
        $doc.off("touchmove", move);
      };

      $node.on("touchstart", start);
    }


  };

  $(document).ready(function(e) {
    $(".js_slide").each(function() {
      new Slideshow($(this));
    });
  });




/** Modernizr Tests ************************************************/

// developer.mozilla.org/en/CSS/pointer-events
// github.com/ausi/Feature-detection-technique-for-pointer-events
Modernizr.addTest('pointerevents', function(){
    var element = document.createElement('div'),
        documentElement = document.documentElement,
        getComputedStyle = window.getComputedStyle,
        supports;
    if(!('pointerEvents' in element.style)){
        return false;
    }
    element.style.pointerEvents = 'auto';
    element.style.pointerEvents = 'x';
    documentElement.appendChild(element);
    supports = getComputedStyle &&
        getComputedStyle(element, '').pointerEvents === 'auto';
    documentElement.removeChild(element);
    return !!supports;
});

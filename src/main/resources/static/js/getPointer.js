var getPointer = (function() {
    return {
      init: function() {
        console.info('initialized');
        var canvas = document.getElementById("blueprintCanvas");

        if (window.PointerEvent) {
          canvas.addEventListener("pointerdown", function(event) {
            alert('pointerdown at ' + event.pageX + ',' + event.pageY);
          });
        } else {
          canvas.addEventListener("mousedown", function(event) {
            alert('mousedown at ' + event.clientX + ',' + event.clientY);
          });
        }
      }
    };
  })();

  
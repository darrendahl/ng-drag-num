angular.module('ngDragNum',[])

.directive('ngDragNum', ['$compile', '$timeout', function($compile, $timeout){
  return {
      restrict : 'AE',
      template: '<div class="drag-num">{{num}}</div>',
      scope: {
          num: '=',
          onChange: '='
      },
      link: function(scope, elem, attrs){   
        elem.bind('mousedown touchstart', function(event){
          scope.down = true;
          document.body.style.cursor = "ns-resize";
          event.stopPropagation();
        });
        
        angular.element(document).bind('mouseup touchend', function(event){
          scope.down = false;
          document.body.style.cursor = "default";
          event.stopPropagation();
        });
        
        function subtractNum(){
          scope.num -= 1;
          $timeout(scope.onChange, 0);
        }
        
        function addNum(){
          scope.num += 1;
          $timeout(scope.onChange, 0);
        }
        
        var last_position = {}
        angular.element(document).bind('mousemove', function(event){

          if(scope.down){
            document.body.style.cursor = "ns-resize";
            //check to make sure there is data to compare against
            if (typeof(last_position.x) != 'undefined') {

                //get the change from last position to this position
                var deltaX = last_position.x - event.clientX,
                    deltaY = last_position.y - event.clientY;

                //check which direction had the highest amplitude and then figure out direction by checking if the value is greater or less than zero
                if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
                    //left
                    return;
                } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
                    //right
                     return;
                } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
                    //up
                    $timeout(addNum, 0);
                } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) {
                    //down
                    $timeout(subtractNum, 0);
                }
            }

            //set the new last position to the current for next time
            last_position = {
                x : event.clientX,
                y : event.clientY
            };
            
          }
        });
      }
  };
}]);


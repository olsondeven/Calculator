calcApp.directive('calcDirect', ['$document', function($document) {
    var inputOne = [];
    var inputTwo = [];
    var secondNum = false;
    var opt = '';

    function clear() {
        inputOne = [];
        inputTwo = [];
        secondNum = false;
    };

    function inputAdd(num) {
        if (!secondNum) {
            inputOne.push(num);
            var str = inputOne.join('');
            console.log('one', inputOne);
        } else {
            inputTwo.push(num);
            var str = inputTwo.join('');
            console.log('two', inputTwo);
        }
        return str;
    };
    return {
        //restrict causes the directive to be used as either a Element or an attribute
        restrict: 'EA',
        //templateUrl path is from index
        templateUrl: './templates/calcTemp.html',
        link: function(scope, element, attrs) {
            scope.input = 0;
            // scope.inputAdd = inputAdd;
            scope.inputAdd = function(num) {
                scope.input = inputAdd(num);
            };
            scope.fnPress = function(btn) {
                if (btn === 'c') {
                    opt = 'c';
                    clear();
                    scope.input = 0;
                }
                if (btn === '\+') {
                    opt = '\+';
                    secondNum = true;
                    scope.input = '\+';
                }
                if (btn === '\-') {
                    opt = '\-';
                    secondNum = true;
                    scope.input = '\-';
                }
                if (btn === '\*') {
                    opt = '\*';
                    secondNum = true;
                    scope.input = '\*';
                }
                if (btn === '/') {
                    opt = '/';
                    secondNum = true;
                    scope.input = '/';
                }
                //------enter-------------------//
                if (btn === 'enter') {
                    var num1 = parseInt(inputOne.join(''));
                    var num2 = parseInt(inputTwo.join(''));
                    if (opt === "\+") {
                        scope.input = num1 + num2;
                        clear();
                    }
                    if (opt === "\-") {
                        scope.input = num1 - num2;
                        clear();
                    }
                    if (opt === "\*") {
                        scope.input = num1 * num2;
                        clear();
                    }
                    if (opt === "/") {
                        scope.input = num1 / num2;
                        clear();
                    }
                }
                //enter----------------------------//
            };
            // -------------------------------------------------------------------------drag-start-------------------------------------------------------------------
            var startX = 0,
                startY = 0,
                x = 0,
                y = 0;

            element.css({
                position: 'relative',
                cursor: 'pointer'
            });

            element.on('mousedown', function(event) {
                // Prevent default dragging of selected content
                event.preventDefault();
                startX = event.pageX - x;
                startY = event.pageY - y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            function mousemove(event) {
                y = event.pageY - startY;
                x = event.pageX - startX;
                element.css({
                    top: y + 'px',
                    left: x + 'px'
                });
            }

            function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
            }
            // ----------------------------------------------------------------------drag-end-----------------------------------------------------------------------------------
            $('#hide-calc').on('click', function() {
                $('calc-direct').slideToggle(400);
            });

        }
    };
}]); //

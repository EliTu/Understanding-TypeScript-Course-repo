"use strict";
// Namespace files (lecture 72)
var MyMath;
(function (MyMath) {
    function calculate(diameter) {
        return diameter * PI;
    }
    MyMath.calculate = calculate;
})(MyMath || (MyMath = {}));

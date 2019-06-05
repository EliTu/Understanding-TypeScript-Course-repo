"use strict";
var MyMath;
(function (MyMath) {
    var PI = 3.14;
    function calculate(diameter) {
        return diameter * PI;
    }
    MyMath.calculate = calculate;
})(MyMath || (MyMath = {}));

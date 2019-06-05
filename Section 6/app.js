// Namespace files (lecture 72)
var MyMath;
(function (MyMath) {
    function calculateRectangle(width, length) {
        return width * length;
    }
    MyMath.calculateRectangle = calculateRectangle;
})(MyMath || (MyMath = {}));
var MyMath;
(function (MyMath) {
    var PI = 3.14;
    function calculate(diameter) {
        return diameter * PI;
    }
    MyMath.calculate = calculate;
})(MyMath || (MyMath = {}));
///<reference path="rectangleMath.ts" />
///<reference path="circleMath.ts" />
// Namespaces (Lecture 71)
console.log(MyMath.calculateRectangle(10, 20));
console.log(MyMath.calculate(3));

define("Math/circle", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.PI = 3.14;
    function calculateCircumference(diameter) {
        return diameter & exports.PI;
    }
    exports.calculateCircumference = calculateCircumference;
});
define("Math/rectangle", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function calculateRectangle(width, length) {
        return width * length;
    }
    exports.calculateRectangle = calculateRectangle;
});
define("app", ["require", "exports", "Math/circle"], function (require, exports, circle_1) {
    "use strict";
    exports.__esModule = true;
    console.log(circle_1.PI);
    console.log(circle_1.calculateCircumference(5));
    console.log();
});

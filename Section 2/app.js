"use strict";
// String
var myName = 'Eliad';
// Number
var myAge = 27;
// Boolean
var lovesToCode = true;
// Assign types
var year;
year = 2019;
// year = '2019';
// Arrays
var hobbies = ['Cooking', 'Sports'];
// hobbies = [100];
// hobbies = 100;
// Tuples
var address = ['Superstreet', 99];
console.log(address);
// Enums
var Color;
(function (Color) {
    Color[Color["Gray"] = 0] = "Gray";
    Color[Color["Green"] = 100] = "Green";
    Color[Color["Blue"] = 101] = "Blue";
})(Color || (Color = {}));
var myColor = Color.Green;
console.log(myColor);
// Any
var myCar = 'BMW';
console.log(myCar);
myCar = { brand: 'BMW', series: 3 };
console.log(myCar);

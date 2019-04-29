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
// Functions
var returnMyName = function () { return myName; };
console.log(returnMyName());
// Void
var sayHello = function () { return console.log('Hello'); };
sayHello();
// Argument types
var multiply = function (a, b) { return a * b; };
console.log(multiply(10, 10));
// function types
var myMultiply;
// myMultiply = sayHello;
// myMultiply();
myMultiply = multiply;
console.log(myMultiply(5, 10));
// Objects
var userData = {
    name: 'Eliad',
    age: 27,
};
// userData = {
//     a: 'Hello',
//     b: 22
// };
// Complex object
var complex = {
    data: [10, 20, 30],
    output: function (all) {
        return this.data;
    },
};
var complex2 = {
    data: [10, 20, 30],
    output: function (all) {
        return this.data;
    },
};
// Union types
var myRealRealAge = 27;
myRealRealAge = '27';
// myRealRealAge = [27];
// Checking types
var finalValue = 20;
if (typeof finalValue === 'number')
    console.log('final value is a number');
// Never
var neverReturns = function () {
    throw new Error('Error!');
};
// Nullable types
var canBeNull = 12;
canBeNull = null;
var canAlsoBeNull;
canAlsoBeNull = null;
var canBeAny = null;
var bankAccount = {
    money: 2000,
    deposit: function (value) {
        this.money += value;
    },
};
var myself = {
    name: 'Max',
    bankAccount: bankAccount,
    hobbies: ['Sports', 'Cooking'],
};
myself.bankAccount.deposit(3000);
console.log(myself);

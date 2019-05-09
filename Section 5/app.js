var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    function Person(name, userName) {
        this.userName = userName;
        this.age = 27;
        this.name = name;
    }
    Person.prototype.printAge = function () {
        console.log(this.age);
        this.setType('1991');
    };
    Person.prototype.setType = function (type) {
        this.type = type;
        console.log(type);
    };
    return Person;
}());
var person = new Person('Yoda', 'yod5');
console.log(person);
person.printAge();
// person.setType('TS!!');
// * Inheritance:
var Eliad = /** @class */ (function (_super) {
    __extends(Eliad, _super);
    function Eliad(userName) {
        var _this = _super.call(this, 'Eliad', userName) || this;
        _this.age = 27.5;
        return _this;
        // console.log(this.type);
    }
    return Eliad;
}(Person));
var eliad = new Eliad('eliad');
console.log(eliad); // Eliad {userName: "eliad", age: 27, name: "Eliad"}
// * Getters & Setters
var Plant = /** @class */ (function () {
    function Plant() {
        this._species = 'Default';
    }
    Object.defineProperty(Plant.prototype, "species", {
        get: function () {
            return this._species;
        },
        set: function (value) {
            value.length > 3
                ? (this._species = value)
                : (this._species = 'Default');
        },
        enumerable: true,
        configurable: true
    });
    return Plant;
}());
var plant = new Plant();
console.log(plant.species); // Default
plant.species = 'AB';
console.log(plant.species); // Default
plant.species = 'Green plant';
console.log(plant.species); // Green plant

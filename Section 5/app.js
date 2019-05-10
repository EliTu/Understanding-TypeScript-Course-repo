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
// * Static properties and methods
var Helpers = /** @class */ (function () {
    function Helpers() {
    }
    Helpers.calcCircumference = function (diameter) {
        return this.PI * diameter;
    };
    Helpers.PI = Math.PI;
    return Helpers;
}());
console.log(2 * Helpers.PI);
console.log(Helpers.calcCircumference(8));
// * Abstract classes
var Project = /** @class */ (function () {
    function Project() {
        this.projectName = 'Default';
        this.budget = 1000;
    }
    Project.prototype.calcBudget = function () {
        return this.budget * 2;
    };
    return Project;
}());
var ITProject = /** @class */ (function (_super) {
    __extends(ITProject, _super);
    function ITProject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ITProject.prototype.changeName = function (name) {
        this.projectName = name;
    };
    return ITProject;
}(Project));
var newProject = new ITProject();
console.log(newProject);
newProject.changeName('Super IT Project');
console.log(newProject);
// * Private CConstructor & Singletons
var OnlyOne = /** @class */ (function () {
    function OnlyOne(name) {
        this.name = name;
    }
    OnlyOne.getInstance = function () {
        if (!OnlyOne.instace) {
            OnlyOne.instace = new OnlyOne('The only one');
        }
        return OnlyOne.instace;
    };
    return OnlyOne;
}());
// let wrong = new OnlyOne('The only one'); // Error - constructor is private!
var right = OnlyOne.getInstance();
// * readonly Properties
// Look up for the code
// * Module exercise
// Exercise 1 - How was your TypeScript Class?
var Car = /** @class */ (function () {
    function Car(name) {
        this.acceleration = 0;
        this.name = name;
    }
    Car.prototype.honk = function () {
        console.log('Toooooooooot!');
    };
    Car.prototype.accelerate = function (speed) {
        this.acceleration = this.acceleration + speed;
    };
    return Car;
}());
var car = new Car('BMW');
car.honk();
console.log(car.acceleration);
car.accelerate(10);
console.log(car.acceleration);
// Exercise 2 - Two objects, based on each other ...
var BaseObject = /** @class */ (function () {
    function BaseObject() {
        this.width = 0;
        this.length = 0;
    }
    return BaseObject;
}());
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rectangle.prototype.calcSize = function () {
        return this.width * this.length;
    };
    return Rectangle;
}(BaseObject));
var rectangle = new Rectangle();
console.log(rectangle.calcSize());
rectangle.width = 15;
rectangle.length = 25;
console.log(rectangle.calcSize());
// Exercise 3 - Make sure to compile to ES5 (set the target in tsconfig.json)
var Person2 = /** @class */ (function () {
    function Person2() {
        this._firstName = 'Default name';
    }
    Object.defineProperty(Person2.prototype, "firstName", {
        get: function () {
            return this._firstName;
        },
        set: function (value) {
            value.length > 3
                ? (this._firstName = value)
                : (this._firstName = 'Default name');
        },
        enumerable: true,
        configurable: true
    });
    return Person2;
}());
var person2 = new Person2();
console.log(person2.firstName);
person2.firstName = 'Ma';
console.log(person2.firstName);
person2.firstName = 'Maximilian';
console.log(person2.firstName);

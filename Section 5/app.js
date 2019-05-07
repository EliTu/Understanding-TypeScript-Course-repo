var Person = /** @class */ (function () {
    function Person(name, userName) {
        this.userName = userName;
        this.name = name;
    }
    return Person;
}());
var person = new Person('Yoda', 'yod5');
console.log(person);
console.log(person.type, person.age, person.name);

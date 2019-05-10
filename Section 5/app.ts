class Person {
	name: string;
	private type: string;
	protected age: number = 27;

	constructor(name: string, public userName: string) {
		this.name = name;
	}

	printAge() {
		console.log(this.age);
		this.setType('1991');
	}

	private setType(type: string) {
		this.type = type;
		console.log(type);
	}
}

const person = new Person('Yoda', 'yod5');
console.log(person);
person.printAge();
// person.setType('TS!!');

// * Inheritance:

class Eliad extends Person {
	constructor(userName: string) {
		super('Eliad', userName);
		this.age = 27.5;
		// console.log(this.type);
	}
}
const eliad = new Eliad('eliad');
console.log(eliad); // Eliad {userName: "eliad", age: 27, name: "Eliad"}

// * Getters & Setters

class Plant {
	private _species: string = 'Default';

	get species() {
		return this._species;
	}

	set species(value: string) {
		value.length > 3
			? (this._species = value)
			: (this._species = 'Default');
	}
}

let plant = new Plant();
console.log(plant.species); // Default
plant.species = 'AB';
console.log(plant.species); // Default
plant.species = 'Green plant';
console.log(plant.species); // Green plant

// * Static properties and methods

class Helpers {
	static PI: number = Math.PI;
	static calcCircumference(diameter: number): number {
		return this.PI * diameter;
	}
}
console.log(2 * Helpers.PI);
console.log(Helpers.calcCircumference(8));

// * Abstract classes

abstract class Project {
	projectName: string = 'Default';
	budget: number = 1000;

	calcBudget() {
		return this.budget * 2;
	}

	abstract changeName(name: string): void;
}

class ITProject extends Project {
	changeName(name: string): void {
		this.projectName = name;
	}
}

let newProject = new ITProject();
console.log(newProject);
newProject.changeName('Super IT Project');
console.log(newProject);

// * Private CConstructor & Singletons

class OnlyOne {
	private static instace: OnlyOne;
	public readonly name: string;

	private constructor(name: string) {
		this.name = name;
	}
	static getInstance() {
		if (!OnlyOne.instace) {
			OnlyOne.instace = new OnlyOne('The only one');
		}
		return OnlyOne.instace;
	}
}
// let wrong = new OnlyOne('The only one'); // Error - constructor is private!
let right = OnlyOne.getInstance();

// * readonly Properties

// Look up for the code

// * Module exercise

// Exercise 1 - How was your TypeScript Class?
class Car {
	name: string;
	acceleration: number = 0;
	constructor(name: string) {
		this.name = name;
	}

	honk(): void {
		console.log('Toooooooooot!');
	}

	accelerate(speed: number): void {
		this.acceleration = this.acceleration + speed;
	}
}
let car = new Car('BMW');
car.honk();
console.log(car.acceleration);
car.accelerate(10);
console.log(car.acceleration);

// Exercise 2 - Two objects, based on each other ...
abstract class BaseObject {
	width: number = 0;
	length: number = 0;
}

class Rectangle extends BaseObject {
	calcSize(): number {
		return this.width * this.length;
	}
}
const rectangle = new Rectangle();
console.log(rectangle.calcSize());
rectangle.width = 15;
rectangle.length = 25;
console.log(rectangle.calcSize());

// Exercise 3 - Make sure to compile to ES5 (set the target in tsconfig.json)
class Person2 {
	private _firstName: string = 'Default name';

	get firstName() {
		return this._firstName;
	}

	set firstName(value: string) {
		value.length > 3
			? (this._firstName = value)
			: (this._firstName = 'Default name');
	}
}

let person2 = new Person2();
console.log(person2.firstName);
person2.firstName = 'Ma';
console.log(person2.firstName);
person2.firstName = 'Maximilian';
console.log(person2.firstName);

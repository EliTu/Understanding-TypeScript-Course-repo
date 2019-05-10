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

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

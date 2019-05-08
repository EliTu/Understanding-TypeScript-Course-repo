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

// String
let myName: string = 'Eliad';

// Number
let myAge: number = 27;

// Boolean
let lovesToCode: boolean = true;

// Assign types
let year: number;
year = 2019;
// year = '2019';

// Arrays
let hobbies: any[] = ['Cooking', 'Sports'];
// hobbies = [100];
// hobbies = 100;

// Tuples
let address: [string, number] = ['Superstreet', 99];
console.log(address);

// Enums
enum Color {
	Gray, // 0
	Green = 100, // 1
	Blue, // 2
}

let myColor: Color = Color.Green;
console.log(myColor);

// Any
let myCar: any = 'BMW';
console.log(myCar);
myCar = { brand: 'BMW', series: 3 };
console.log(myCar);

// Functions
const returnMyName = (): string => myName;
console.log(returnMyName());

// Void
const sayHello = (): void => console.log('Hello');
sayHello();

// Argument types
const multiply = (a: number, b: number): number => a * b;
console.log(multiply(10, 10));

// function types
let myMultiply: (val1: number, val2: number) => number;
// myMultiply = sayHello;
// myMultiply();
myMultiply = multiply;
console.log(myMultiply(5, 10));

// Objects
let userData: { name: string; age: number } = {
	name: 'Eliad',
	age: 27,
};
// userData = {
//     a: 'Hello',
//     b: 22
// };

// Complex object

let complex: { data: number[]; output: (all: boolean) => number[] } = {
	data: [10, 20, 30],
	output: function(all: boolean): number[] {
		return this.data;
	},
};

// Custom types

type Complex = { data: number[]; output: (all: boolean) => number[] };

let complex2: Complex = {
	data: [10, 20, 30],
	output: function(all: boolean): number[] {
		return this.data;
	},
};

// Union types

let myRealRealAge: number | string = 27;
myRealRealAge = '27';
// myRealRealAge = [27];

// Checking types
let finalValue = 20;
if (typeof finalValue === 'number') console.log('final value is a number');

// Never
const neverReturns = (): never => {
	throw new Error('Error!');
};

// Nullable types
let canBeNull: number | null = 12;
canBeNull = null;
let canAlsoBeNull;
canAlsoBeNull = null;
let canBeAny = null;
// canBeAny = 12;

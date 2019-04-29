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

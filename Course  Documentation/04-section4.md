<!-- markdownlint-disable MD010 -->

# Section 4 - TypeScript and ES6

## `let` and `const` (Section 4, lecture 41)

Just the regular explanation of the ES6 addition of `let` and `const`, and how they compare with `var`, and with each other, nothing new really.

## Block Scope (Section 4, lecture 42)

With `let` and `const` give us block scoped variables, in comparison with `var`, which is a function scoped variable.

```js
let variable = 'Some value';
function reset() {
	console.log(variable); // undefined
	let variable = 'Different value';
	console.log(variable); // Different value
}
reset();
console.log(variable); // Some value
```

## Arrow Functions (Section 4, lecture 43)

Regular function:

```ts
const addNumbers = function(number1: number, number2: number): number {
	return number1 + number2;
};
console.log(addNumbers(10 + 3)); // 13
```

Arrow function (single line shorthand):

```ts
const multiply = (number1: number, number2: number): number =>
	number1 * number2;
console.log(multiply(10, 3)); // 30
```

## Arrow Functions - Variations (Section 4, lecture 44)

Arrow function without arguments:

```ts
const greet = (): string => console.log('Hello!');
greet(); // Hello!
```

Arrow function with one parameter (No parantheses):
In this case, we cannot state the type of the parameter, i.e `const greetFriend = friend: string =>...`, as this kind of syntax will throw a syntax error, and so in this case we will do without typing, although it is always recommended to try and explicitly type our code.

```ts
const greetFriend = friend => console.log(`Hi, ${friend}!`);
greetFriend('Thor'); // Hi, Thor!
```

## Functions and Default Parameters (Section 4, lecture 45)

Without setting default parameters, if we will try to compile the code without setting an argument, we will encounter warnings stating no arguments were passed to the function, and we will actually get an `undefined` assigned as an argument. As we input a default parameter value to the `start` parameter, the errors goes away and we have an output.

```ts
const countDown = (start: number = 10): void => {
	while (start > 0) {
		start--;
	}
	console.log('Done!', start);
};
countDown(); // No error for not providing an argument. Output: Done! 0
```

## The Spread Operator (Section 4, lecture 46)

We cannot pass an object of variables, like an array or object into a function that requires a list of values, like the `Math.max` function for example, as it won't accept objects. So, we use the spread operator to spread out an array or function values outside of the array or object into a list of values.

```ts
const numbers = [1, 3, 66, -34, 76, 20];
console.log(Math.max(33, 22, 10, -5, 44)); // 44
console.log(Math.max(numbers)); // ERROR
console.log(Math.max(...numbers)); // 76
```

## The Rest Operator (Section 4, lecture 47)

Without Rest parameters we get a very strict and limited parameter structure, which forces us to manually assign a specified amount of parameters, which is of course not flexible and won't work in a situation where we don't know how many arguments we might actually have.

```ts
function makeArray(arg1: number, arg2: number): object {
	return [arg1, arg2];
}
console.log(makeArray(1, 2)); // [1, 2]
```

Rest parameters solves this issue by allowing us to pass an unspecified amount of arguments. When we pass the rest parameters operator, we're basically turining the arguments that are being passed in the function call into an array, and so the type should be `*type*[]`, and in our case its an array of numbers `number[]`. Basically it's the opposite of what the spread operator does. The result, by just passing on the arguments, will be an array that contains all the arguments that were passed at the function call.

```ts
function makeArray(...args: number[]): object {
	return args;
}
console.log(makeArray(1, 2, 3)); // [1, 2, 3]
console.log(makeArray(1, 2, 3, 4, 5, 6)); // [1, 2, 3, 4, 5, 6]
```

In the case we have other parameters that we don't want to be grouped with the ones we pass in the spread operator, we will need to handle them first and separately from the spread parameter arguments.

```ts
function makeArray(name: string, ...args: number[]): object {
	return args;
}
console.log(makeArray('Eliad', 1, 2, 3)); // ['Eliad', 1, 2, 3]
```

## Rest Parameters & Tuples (Section 4, lecture 48)

Since TypeScript 3, you can also use tuples as types for rest expressions.

For example, these two function signatures are equal:

```ts
function printInfo(name: string, age: number) {
	console.log('My name is ' + name + ' and I am ' + age + ' years old!');
}
function printInfo(...info: [string, number]) {
	console.log(
		'My name is ' + info[0] + ' and I am ' + info[1] + ' years old!'
	);
}
```

## Destructuring Arrays (Section 4, lecture 49)

Without destructuring, assigning elements of an array into individual variables is very tedious and a lot of code.

```ts
const myHobbies = ['Sports', 'Coding'];
console.log(myHobbies[0], myHobbies[1]); // Sports Coding
const hobby1 = myHobbies[0];
const hobby2 = myHobbies[1];
console.log(hobby1, hobby2); // Sports Coding
```

Destructuring allows us to write a shorter syntax for achieving just that. It works with creating an array notation [] or object notation {} on the left side of the declaration. On the left side, inside the notation, we assign the elements that were extracted from the array or object and will be assigned into individual named variables.

```ts
const myHobbies = ['Sports', 'Coding'];
const [hobby1, hobby2] = myHobbies;
console.log(hobby1, hobby2); // Sports Coding
```

## Destructuring Objects (Section 4, lecture 50)

Destructuring could also be done with objects. Although traditionally we could extract details from an object in a very straightforward way.

```ts
const userData = {
	userName: 'Eliad',
	age: 27,
};
const userName: string = userdata.userName;
const age: number = useData.age;
console.log(username, age); // Eliad 27
```

But the destructuring allows us a more cleaner and shorter syntax to perfrom the same thing. We do that the same way we extract values fom an array, and once again it is important to remember to match the destructured variables with the same name as the keys in the object we're destructuring from, since that is the way for the JavaScript to know how to pair the variables with the keys.

```ts
const userData = {
	userName: 'Eliad',
	age: 27,
};
const { username, age } = userData;
console.log(username, age); // Eliad 27
```

If we would like to assign a different name to the destructured variables than the keys in the object, we could do this with the ':' notation, and then pass on an alias.

```ts
const userData = {
	userName: 'Eliad',
	age: 27,
};
const { username: myUserName, age: myAge } = userData;
console.log(myUserName, myAge); // Eliad 27
```

## Template Literals (Section 4, lecture 51)

`Template strings are awesome!`.

## Module Exercise: Problem (Section 4, lecture 52)

Re-write the below Code using the ES6 Features you learned throughout this Module.

```ts
// Exercise 1 - Maybe use an Arrow Function?
var double = function(value) {
	return value * 2;
};
console.log(double(10));

// Exercise 2 - If only we could provide some default values...
var greet = function(name) {
	if (name === undefined) {
		name = 'Max';
	}
	console.log('Hello, ' + name);
};
greet();
greet('Anna');

// Exercise 3 - Isn't there a shorter way to get all these Values?
var numbers = [-3, 33, 38, 5];
console.log(Math.min.apply(Math, numbers));

// Exercise 4 - I have to think about Exercise 3 ...
var newArray = [55, 20];
Array.prototype.push.apply(newArray, numbers);
console.log(newArray);

// Exercise 5 - That's a well-constructed array.
var testResults = [3.89, 2.99, 1.38];
var result1 = testResults[0];
var result2 = testResults[1];
var result3 = testResults[2];
console.log(result1, result2, result3);

// Exercise 6 - And a well-constructed object!
var scientist = { firstName: 'Will', experience: 12 };
var firstName = scientist.firstName;
var experience = scientist.experience;
console.log(firstName, experience);
```

My Solution:

```ts
// Exercise 1
const double: (val1: number) => number = value => value * 2;

console.log(double(10)); // 20

// Exercise 2
const greet: (val1: string) => void = (name = 'Luke') =>
	console.log(`Hello, ${name}`);

greet(); // Luke
greet('Anna'); // Anna

// Exercise 3
const numbers: number[] = [-3, 33, 38, 5];

console.log(Math.min(...numbers)); // -3

// Exercise 4
let newArray: number[] = [55, 20];
newArray = [...newArray, ...numbers];
console.log(newArray); // [55, 20, -3, 33, 38, 5]

// Exercise 5
const testResults: number[] = [3.89, 2.99, 1.38];
const [result1, result2, result3] = testResults;
console.log(result1, result2, result3); // 3.89, 2.99, 1.38

// Exercise 6
const scientist: { fistName: string; experience: number } = {
	firstName: 'Will',
	experience: 12,
};
const { firstName, experience } = scientist;
console.log(firstName, experience);
```

**_Finished Module_**

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

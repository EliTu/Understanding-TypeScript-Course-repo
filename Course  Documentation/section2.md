<!-- markdownlint-disable MD010 -->

# Section 2 - Using Types for Better Code

## Assigning Types Explicitly (Section 2, lecture 11)

How can we be more explicit about the types we want to assign? Right now we're always infering them, but what if we want to assign them explicitly on our own? In vanilla JavaScript, we can always declare a variable, but we can also override it later with ease. Sometimes, we want to declare a variable but not assign a value right away. When it happens in TypeScript, an empty variable gets the type of `any`, which means it can be of any type, and so if we will later reassign it with a number, and then afterwards with a string, tsc will not throw us an error when compiling.

```js
let year; // (: any)
year = 2019;
year = '2019';
```

This kind of behavior brings us back to JavaScript world, when we don't assume the type and let me whatever it will be decalred last. This negates all the benefits TypeScript is bringing to the table, we don't get the IDE support.

In order to fix this, we need to be explicit about the types when writing code in TypeScript. When creating a variable we can assign the type manually, by adding ':' and then passing on the type that should be assigned, like: `number`, `string`, `boolean`, `object` etc.

```ts
// String
let myName: string = 'Eliad';

// Number
let myAge: number = 27;

// Boolean
let lovesToCode: boolean = true;

// Assign types
let year: number;
year = 2019;
year = '2019'; // This will mark an error
```

If we will run the tsc, we will result in an error that says that we try to pass tha variable 'year' as a `string`, while the expected type is `number`.

## Arrays and Types (Section 2, lecture 12)

Arrays are a little bit more 'advanced'. We'll create a simple array of hobbies, which will contain 2 strings.

```ts
let hobbies = ['Cooking', 'Sports'];
console.log(hobbies[0]); // Cooking
```

We can see that the array holds elements with the type of string. We could run a check for the `typeof` of 'hobbies', and get `object`, but that makes sense since the array is an object. But interestingly enough, if we will try to modify the array elements to include a number, for example, we will encounter a TypeScript error that says that the mutated element in the array, corresponding to the type of `number[]` is not compatible with the original type of `string[]`.

```ts
let hobbies = ['Cooking', 'Sports'];
hobbies = [100]; // Error: type number[] is not assignable to type of string[]
```

TypeScript infers the types automatically, and since we have only strings inside the array, TypeScript will assume that all the array elements should be strings automatically. If we reassign the number with a string, the error will be gone.

We can override this by assigning the type of the array explicitly.

```ts
let hobbies: any[] = ['Cooking', 'Sports'];
hobbies = [100]; // No errors
```

Now as soon as we recompile with tsc, we won't get any errors. The reason is because we're overriding the TypeScript infering the type of the array and telling it that it does not necessarily a type of `string`, but could be of any type. Although, it stills needs to be an array! If we will try to set 'hobbies' to a `string` or `number`, we will encounter a type error.

```ts
let hobbies: any[] = ['Cooking', 'Sports'];
hobbies = [100]; // No errors
hobbies = 100; // Error: type 'number' is not assignable to type 'any[]
```

## Tuples (Section 2, lecture 13)

Staying in the world of arrays, we have a new type that is available in TypeScript, but not in JavaScript: Tuples. Tuples are arrays with mixed types, limited numbers and in a fixed position essentially.

Let's say we have an address, it's an array in the format of a `string` and a `number`.

```ts
let address = ['Superstreet', 99];
```

Without specifying any type, TypeScript will infer this array to the type of `any[]`, and will not throw us any error at compile time. But, if we're sure that this array will have this exact format, first `string`, second `number`, and we would like to be explicit about this type, we can assign in to a class of tuple by adding [] and inside of them stating the type format of the array elements.

```ts
let address: [string, number] = ['Superstreet', 99];
```

If we are to reverse the order of the array elements, first `number`, second `string`, we will get an error at compiling because the tuple order is important, and any other combination or types that are not as specified in the tuple are invalid.

```ts
let address: [string, number] = [99, 'Superstreet']; // Type [number, string] is not assignable to type [string, number]
```

Tuples are useful when we have data object or an array that has a one single format or a fixed value, we could use tuples to validate it.

## Enums (Section 2, lecture 14)

Another new type that was added to TypeScript are enums. Enums is a feature to make numbers more expressive. Lets say we have a few colors, and we want to check in a `switch` statement for a specific color. In the statement we could have strings representing the colors, so we have 'Red', 'Green', 'Blue' etc, but in code that would be a waste of memory space. So what we could do is to have numbers to represent each color. That would be the better way to approach such a scenario, and also have other benefits like avoiding typos etc.

But the problem is that it would make it a bit harder to remember which value stands for which number. In order to make it easier, we can create enums in TypeScript. We do this by first declaring the `enum` keyword and then passing the enum name, followed by curly braces.

```ts
enum Color {}
```

This will basically will create a new type that we could use later on. Inside the curly braces we will add values, in our case we add the color strings.

```ts
enum Color {
	Gray,
	Green,
	Blue,
}
```

These values, behind the scenes, stand for integers that will represent them. Now if we will create a new variable, and set it to the type of `Color`, we can use the `Color` enum as a type. Then we can pass on `Color.Green` for example, if we log it to the console we will receive the value of 1. This means that behind the scenes all the enum values are automatically get assigned with numbers, by default starting from 0.

```ts
enum Color {
	Gray, // 0
	Green, // 1
	Blue, // 2
}

let myColor: Color = Color.Green;
console.log(myColor); // 1
```

At some cases, we would like to override the default enum numerical value, setting the enum values our own numerical value. For example, if we want `Green` to be of a value 100, we could simply use the assign operator and give it a value of 100.

```ts
enum Color {
	Gray,
	Green = 100,
	Blue,
}

let myColor: Color = Color.Green;
console.log(myColor); // 100
```

But then, what will happen to `Blue`? will it be 2 or 101 ? If we will log `Blue`, it will have the value of 101, essentially continuing incrementing according ot the last set item. So if we want `Blue` to have the value of 2, we will have to manually set it to 2, and then whatever value that comes after `Blue` will be 3, etc.

Enums will allow us to set a more "user-friendly" values that we could be used during coding.

## The "Any" Type (Section 2, lecture 15)

Type `any` is essentially the most flexible type we have in TypeScript and the closest type to the vanilla JavaScript typing behavior, and therefore we should try to avoid using it in our code, since it negates all the benefits of TypeScript.

If we have a variable `myCar` and give it a type of string, but then reassign it with an object that contains the car brand nad series, we will encounter an error, since TypeScript infers type `string` to `myCar` by default, as we've seen before.

```ts
let myCar = 'BMW';
console.log(myCar); // BMW
myCar = { brand: 'BMW', series: 3 }; // ERROR
console.log(myCar);
```

We could override this by giving `myCar` a type of `any`, thus making TypeScript accept any kind of type override for the `myCar` variable.

```ts
let myCar: any = 'BMW';
console.log(myCar); // BMW
myCar = { brand: 'BMW', series: 3 };
console.log(myCar); // {brand: "BMW", series: 3}
```

Therefore we should be careful, and actually should be an exception to use `any` as a type. We should always be explicit about our Typing in TypeScript, and use `any` only if we really need the maximum flexibility.

## Understandong the created JavaScript code (Section 2, lecture 16)

We would like to have a look at the result of the tsc compile result. We could do that easily just by looking at the compiled JavaScript file. There we could see that not much changed when it comes to the basic TypeScript types we've input, and that is became JavaScript essentially has no types that can be hard-assigned by code, that's just not how it works. Thus, the role of TypeScript is essentially to warn us during production and compilation time, and not to hard code types into our code, and so its more of a overwatch tool in this sense.

What does have an effect in JavaScript code are, naturally, the enum we've created, since it is in fact hard coded data. It is construceted with an IIFE and a `Color` object, inside we have a mapping that will result in outputing a number instead of a string.

```js
(function(Color) {
	Color[(Color['Gray'] = 0)] = 'Gray';
	Color[(Color['Green'] = 100)] = 'Green';
	Color[(Color['Blue'] = 101)] = 'Blue';
})(Color || (Color = {}));
```

## Using Types in Functions(Arguments & `return` values)(Section 2, lecture 17)

### `return` value types

Functions can take the advantage of types, and utilize them for the arguments and for the returned value. For example, we have a function `returnMyName` that should return us the `myName` variable we've set earlier. If we log this function to the console, we should see 'Eliad'. We know that this function should give us back a string, and we could them be explicit about it. We could add ':' after the function parentheses and add the type to it. The type we add there will always refer to the type of the returned value, and no to the arguments or anything else.

```ts
const returnMyName = (): string => myName;
console.log(returnMyName()); // Eliad
```

As we might expect, if we will try to return `myAge`, which is a number, we will encounter a type error.

### The `void` type

A special type for `return` values in functions is the `void` type. We will have another function named `sayHello` and all it does is to print "Hello" to the console. This function does not return anything, it has no `return` statement, and we can be explicit about this. We add the type `void`, which means that nothing will be returned. It will give us an error if we do try to use the `return` keyword and try to `return` a value in the code.

```ts
const sayHello = (): void => console.log('Hello');
sayHello();
```

### Types for arguments

Types for arguments allow us to ensure that our functions work correctly. We can be explicit about the types of the arguments we set for our functions, adding another layer of security for our functions ensured output. We have the function `multiply` with 2 values that multiply each other. Then, we add the type `number` for the expected result of the `return`, stating that there should be a `number` output. But then if we will try to call the function with one `number` and a `string` arguments? will the code compile successfully?

```ts
const multiply = (a, b): number => a * b;
console.log(multiply(10, 'Eliad'));
```

The compiler will indeed compile, and the result will be `NaN`. We didn't get get any error, since the compiler still expects a number, and a `NaN` value could be converted to a number, but this is faulty. Therefore, we should also pass types for the arguments, to ensure that the arguments we pass will not conflict with the end result type. The types are being passed in the parameters.

```ts
const multiply = (a: number, b: number): number => a * b;
console.log(multiply(10, 10));
```

Now if we will try to pass a `string`, or any other type which is not a `number`, we will encounter an error.

## Functions as Types (Section 2, lecture 18)

Functions are types on their own in TypeScript, and so we're not only get to specify the argument types and the `return` value type, but we can also specify the type for a function and what kind of a function that is.

We'll create a new variable named `myMultiply`, which later will take the `multiply` function we set earlier. But we will first try to assign different functions to it and log the results in the console.

```ts
let myMultiply;
myMultiply = sayHello;
myMultiply();
myMultiply = multiply;
console.log(myMultiply(5, 10));
```

What will be the result of this? We compile the code and look at the console, we can see that "Hello" and 10 being loged to the console. We can see that this is a wrong and inconsistent behavior, we shouldn't be able to assign `myMultiply` to different functions and then be able to call them. It would be good to be able to specify to this function what kind of functions we expect it to be, in which format and type.

To get the idea of how we could tell, let's look at the 2 functions: the `sayHello` function is has no parameters and returns `void` type, while the `multiply` function takes 2 arguments, both are `number` type, and returns a `number` type value.

To ensure that `myMultiply` could only be set to functions which are of the format of `multiply` we could set its function type. We pass ':', and then use () and =>, consistant with the ES6 syntax, and then pass what the function should `return`. How will it look in our case? `multiply: (val1: number, val2: number) => number;`. This way we specify that `myMultiply` is a `function` type, and that we expect it to take a function that takes 2 arguments, both are numbers and it will `return` a number. Once we do this, the `myMultiply = sayHello;` will be marked in with a warning, and we won't be able to compile the code.

```ts
let myMultiply: (val1: number, val2: number) => number;
myMultiply = sayHello; // Error
myMultiply(); // Error
myMultiply = multiply; // No error
console.log(myMultiply(5, 10)); // 50
```

Also we can see, that while we pass the `function` type specifications, we could set the arguments names as we'd like, we don't have to specify the exact name of the parameters or arguments being passed, what matters is their type and the order of the parameters.

## Objects and Types (Section 2, lecture 19)

We'll create a new simple object that holds user data, a name and and age, named `userData`.

```ts
let userData = {
	name: 'Eliad',
	age: 27,
};
```

### Objects turned to types

Right here, TypeScript infers the type that `userData` should have, and it infers it to be an object with a property of `name` and the type of `string`, and an `age` property with the type of `number`. If we try to reassign `userData`, lets say to an empty object, we will encounter an error that '{}' is not assignable.

```ts
let userData = {
	name: 'Eliad',
	age: 27,
};
userData = {}; // '{}' is not assignable to type {name: string, age: number}.
```

### Property names are important

Also, we need to note that unlike in the `function` type example, the property names do have importance! So if we go ahead and try to reassign `userData` with an object that holds a `string` and a `number`, but not correspond to the original property names, we will encounter an error.

```ts
let userData = {
	name: 'Eliad',
	age: 27,
};
userData = {
	a: 'Hello',
	b: 26,
}; // Error
```

The types do match between the objects, we have a `string` and a `number`, but the property names do not match. In the function, the order is the important thing, but in object the order is not clear and could be changed behind the scenes, and so what's important are the property names themselves.

### Explicit `object` type

Like in functions, we can also be explicit about the object type, basically creating a blueprint of what the object should look like. Once again, its done with a ':', followed by '{}', and inside the curly braces we specify the property (with the exact property name), and the expected value type.

```ts
let userData: { name: string; age: number } = {
	name: 'Eliad',
	age: 27,
};
```

Now its important to make the distinction between the `object` type and the object body itself, since they look kind of the same. We need to pay attention to the colon, and note that the real object starts to the right of the assign operator '='. They both have key-value pairs, but we should be able to make the distinction with the TypeScript syntax.

## Example: Putting it all together in a complex object (Section 2, lecture 20)

We have the following object:

```ts
let complex: { data: number[]; output: (all: boolean) => number[] } = {
	data: [10, 20, 30],
	output: function(all: boolean): number[] {
		return this.data;
	},
};
```

At first sight, this looks very complex and intimidating, but as we break it apart we could see that its actually very logical and contains most of the types we already saw.

`complex` is an object that takes the property of `data`, which is an array of numbers, and the property of `output`, which is a function that has one argument, named `all` but its name does not matter, and it takes a type of `boolean`, and expect it to return an array of numbers.

```ts
let complex: { data: number[]; output: (all: boolean) => number[] } = {};
```

Right after we the '=' and the object body, which holds the property of `data`, which is an array of numbers, and `output` which is a function that takes an argument with the type of `boolean` and expects to return an array of `numbers`, which in this case it actually returns the `data` property of the object.

```ts
	data: [10, 20, 30],
	output: function(all: boolean): number[] {
		return this.data;
	},
```

## Creating custom Types with Types Aliases(Section 2, lecture 21)

Complex types, like we saw in the last lecture, could lead us to a bit of an issue. Let's create another object which would be identical to the one from the last lecture, and call it `complex2`. It will have the same type of object as `complex` has, so we could simply copy it to `complex2`.

```ts
let complex2: { data: number[]; output: (all: boolean) => number[] } = {
	data: [10, 20, 30],
	output: function(all: boolean): number[] {
		return this.data;
	},
};
```

But if we want to change one of the type values in one of the objects, we would probably need to change it in all of the other object types that are copied from one another, then we would have to manually change it in every instance of that type. Instead of doing this repetitive fix, we could avoid it alltogether with type alias, by setting a 'variable' like object that will store the type we set, and then we could reuse it throughout our code.

Type alias is initialized with the keyword `type` followed by a name that will refer to that type. Then we will assign this to the type we would like to use.

```ts
type Complex = { data: number[]; output: (all: boolean) => number[] };
```

With this created, we could make it easier and set the `complex2` type to be the type of `Complex`. It will be the same type as before, but now its much more reusable: If we want to change the type, we simply change it one place, if we would like to change one of the values in the type, we could simply do it in the `Complex` type and it will be changed globally.

```ts
type Complex = { data: number[]; output: (all: boolean) => number[] };

let complex2: Complex = {
	data: [10, 20, 30],
	output: function(all: boolean): number[] {
		return this.data;
	},
};
```

## Allowing multiple types with Union Types (Section 2, lecture 22)

Another important concept about types, that can make our lives a bit easier is the concept of Union Types. Up until now, if we have to be a explicit about the type, it's either `number`, `string`, `boolean` etc, or if we're not sure we can use `any` for flexibility. But as we stated before, we don't want to use `any`, but if we need the in between solution? If we're not sure if the function will return a `string` or a `number`, but certainly not `boolean`? TypeScript got us covered.

We'll write a variable that holds our real age, but it could either be a `number` or a `string`. Up until now, we would've used `any` type to achieve that. But we're certain that its value can't possibly be a `boolean`, but having `any` type will allow that still.

```ts
let myRealRealAge: any = 27; // No error
myRealRealAge = '27'; // No error
myRealRealAge = true; // No error
```

Instead of doing that, we will use Union Types to state that the variable could be either `string` or `number`. We do that with stating one of the possibilities, and then using a single pipe '|', we state the other. This is a bit similar to the JavaScript || operator. Now if we will pass a `string` or a `number`, the code will compile, but if we will pass a `boolean`, we will receive an error.

```ts
let myRealRealAge: number | string = 27; // No error
myRealRealAge = '27'; // No error
myRealRealAge = true; // Error
```

## Checking for types during runtime

We already observed the `typeof` operator that can help us know what type is a certain variable, and we could use this in our code. For example, we have a variable called `finalValue` and its value is a `string`. Now we would like to check the value, and then perform a certain action if that type checks out. We will write an `if` statement, if the value of `finalValue` is a `number`, then we will log something to the console. We will use the `typeof` operator to check it, and we will see if the type of the variable is equal to 'number'.

```ts
let finalValue = 'some string';
if (typeof finalValue === 'number') console.log('final value is a number');
```

It is very important to remember that when we're using `typeof` to check equality, we will pass off the type with quotes '', and not by itself like we do in TypeScript.

We see no output in the console, since the type of `finalValue` is `string`, if we change it to a number and recompile, we will see the log in the console.

This is a technique we would like to use in certain situations, like inside functions, especially when we're doing calculations: We would like to output a result only if the type we're getting is a number.

## The "never" Type (TypeScript 2.0)

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

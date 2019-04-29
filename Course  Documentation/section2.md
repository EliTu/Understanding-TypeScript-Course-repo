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

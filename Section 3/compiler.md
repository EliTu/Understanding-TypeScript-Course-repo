# Section 3 - Understanding the TypeScript Compiler

## How Code gets Compiled (Section 3, lecture 31)

In order to understand how the compiler works we will see a very simple example. We have a variable with the type of `string` and it displays a name.

```ts
let myName: string = 'Eliad';
```

We compile it with `tsc`, and this then creates a '.js' file with the compiled code. If we look inside of it, it looks just like the code we wrote in the '.ts' file but with turining `let` to `var` and without the strong typing, as we've seen before in the last section.

```js
var myName = 'Eliad';
```

If we go back to the '.ts' file, try to convert `myName` to a number and compile, we will get a compiler warning, as expected, but looking at the '.js' file, we see that the code was compiled anyway and that `myName` was converted to a number.

```ts
let myName: string = 'Eliad';
myName = 30; // Error
```

```js
var myName = 'Eliad';
myName = 30;
```

Why did the compiler compiled the code even though we got an error? Simply because it is the default behavior of the compiler. The compiler warns us, but performs the compile anyway and let us run the code because it takes different factors, that the compiler might not be able to detect or consider, into consideration, such as different libraries, imports, dependencies and they are all crucial for your code to run. This way we're not really writing a TypeScript friendly code, and deliberately passing on the benefits of TypeScript, but TypeScript won't keep us from executing the code. Though, we could suppress this behavior with configurations done in the tsconfig.json file.

## Changing The Compiler Behavior On Errors (Section 3, lecture 32)

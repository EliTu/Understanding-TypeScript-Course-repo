<!--markdownlint-disable MD010 -->

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

In the tsconfig.json file, that determines how the compilers should behave, and we could go ahead and customize the settings to include or exclude options, and to specify how we want the .js code to be compiled. This file comes with a few default options already marked, and the rest are commented out.

As we saw in the last lecture, the TypeScript compiler allows us to compile code into .js even if we get TypeScript warnings and write incompatible code. We can disable this this behavior with adding a new key named `"noEmit"`, and then set it to `true`. Once we done that, the compiler will no longer emit a .js file if we have any TypeScript warnings, this way making the warnings turn into hard errors that "break" the app.

## Debugging Your TypeScript code Using Source Maps (Section 3, lecture 33)

There are a lot of options we can go ahead and define within the tsconfig.json file, and most of them we will rarely ever have to touch or configure. 2 options, who are created by default, the `noImplicitAny` and `sourceMap` options, are both set to `false` by default.

The `sourceMap` option, if set to `true` and compile the project, will allow the creation of another .ts file named `app.js.map` which is actually the source map for the file. The advantage of that is apparent when we open the file in the browser, go to the dev tools and inside 'sources' section we can actually see the '.ts' file is also available for us in the browser, while running the '.js' file. We can go inside this file and see our TypeScript code, and what's even better is that we can actually use this to debug the code in our console, set break points and run the code to stop at that point to observe the results. This allows us to debug the TypeScript file directly, without us needing to look at the output JavaScript file to solve issues.

This tool could be very helpful in actual larger TypeScript projects, and so we should consider setting it to `true` in that kind of scenario.

## Avoiding implicit "Any" (Section 3, lecture 34)

The `noImplicitAny` does what it name suggests, basically if we have a piece of code, without any types set to it, by default it would be implicitly set to the type `any`, thus negating the functionality of TypeScript and allowing the default behavior of a JavaScript code. If we will turn `noImplicitAny` to `true`, when we run the compiler, it will alert us for any piece of code that is implicitly set to `any`. This is very beneficial in the sense that we get a warning and encouraged to set typing to a TypeScript file code, but again, as long as `noEmit` is set to `false`, the code will compile to .js altough we get the warnings.

We need to keep in mind: even if `noImplicitAny` is set to `true`, we're still allowed to explicitly set the type of `any` in our TypeScript code.

```ts
let anything: any;
anything = 12; // No errors at compiling.
```

## More Compiler Options (Section 3, lecture 35)

In the official TypeScript documentations we could view all the complete tsconfig.json options that are available to us, the configurations, etc.

## Compiler Improvements with TypeScript 2.0 (Section 3, lecture 36)

With the release of TypeScript 2.0, the compiler also got smarter. We have the following example:

```ts
function controlMe(isTrue: boolean) {
	let result: number;
	if (isTrue) {
		result = 12;
	}
	return result;
}
```

This is a function that takes a single parameter, `isTrue`, which is the type of `boolean`. The `result` variable is a number, we set it if `isTrue` is `true` and then we `return` the result.

If we'll compile this code, we won't get any errors, but this code does have a problem: `result` might not be initialized here when we `return`, but it is implicitly set to `null`, though it is should be `number`, this is an error since the compiler by default allows implicit `null` type.

If we go to the tsconfig.json file, and set `strictNullChecks`, that we saw at the end of the last module, to `true` then we will get an error if we will try to compile the code: `Variable result is used before being assigned`. Now TypeScript finds out the error and evaluates if `isTrue` might be false, therefore not assigning any value to `result`, thus it can `return` a `null` value, instead of `number`.

In this way, the compiler got smarter: it now can analyze the flow of the code, which parts of the code we can reach etc, and so it leads to less mistakes.

Another addition in 2.0 is the ability to throw warnings when we have an unused parameters. Consider this code:

```ts
function controlMe(isTrue: boolean, somethingElse: boolean) {
	let result: number;
	if (isTrue) {
		result = 12;
	}
	return result;
}
```

We don't use the `somethingElse` parameter anywhere in our code, and by default, if we compile it we won't get any errors. If we go to the tsconfig.json file and set `noUnusedParameters` to `true`, we will get a warning every time we set parameters but don't use them in our code.

# Section 1 - Getting started

## What is TypeScript? (Section 1, lecture 2)

JavaScript is the language of the browser, a language that is ever expending and allows us to implement many features. It is also a dynamically typed language, meaning we do not need to specify the type of the code we're passing or experting to return. The ES6 update introduced us with even greater features and expanded the JavaScript further, but the problem with ES6 that it is not yet supported on all browsers. Another problem is that there are a lot of good features in other languages that are still not have been introduced into the vanilla JavaScript, or that could've been done better in JavaScript.

TypeScript comes in to solve some of those problems. TypeScript is a "wrapper" for JavaScript, a superset of the language, that in the end compiles down to vanilla JavaScript, and introduces new features to the code that can done run in the browser in the form of JavaScript, as the TypeScript compiler will compile the TypeScript code down to vanilla JavaScript, to ES5 code that could run in any browser today.

The most important TypeScript feature are Types, and the fact that TypeScript is a "strongly typed" language, meaning that we have to be specific about the types of our variables. Meaning, we can't have a string variable, and then assign a number to it, it will throw and error and won't let us execute the code.

In the end of the day, the browser can't read TypeScript, and so it will all be compiled down to plain JavaScript, even TypeScript features that are not available in vanilla JavaScript.

## Why TypeScript and How to use it? (Section 1, lecture 3)

### The why

To better understand why we would want to use TypeScript in our JavaScript code, we will go to the official [TypeScript website](typescriptlang.org) and go to the 'Playground' section, there we have 2 text areas, one for input code, that also will hold the TypeScript code, and one for compiled vanilla JavaScript ES5 code, and it is generally a great place to be able to play with TypeScript.

In the input box above the left text area we can select 'classic JavaScript', and that in turn will display us vanilla ES6 code of a button that should return a 'Hello world'. At this point, we don't have any TypeScript input into the left text area and so the right one is very similar to the left one, only it has `var` instead of `let`. We have our Constructor, and it takes the property of `greeting`, we extend it with the `prototype` property to include `greet()` method that should return a string of `hello + this.greeting`. Afterwards we instantiate the object and create an event handler for the button.

```js
function Greeter(greeting) {
    this.greeting = greeting;
}

Greeter.prototype.greet = function() {
    return "Hello, " + this.greeting;
}

let greeter = new Greeter({message: "world"});  

let button = document.createElement('button');
button.textContent = "Say Hello";
button.onclick = function() {
    alert(greeter.greet());
};

document.body.appendChild(button);
```

When we exectue this code, the result is `Hello [object, object]`, which is a bug. Why did this happen? If we look at the instantiation of the constructor, we could see that we actually pass on an object: `let greeter = new Greeter({message: "world"});`, while the method expects to return a string. Because JavaScript is a dynamically typed language, JavaScript ignores this issue and simply returns us `undefined`, `null` or in our case, `[object, object]`. JavaScript sees this kind of code, which is obviously a mistake, as an executable code and will not warn us, this can lead to an undesired results, bugs and not easily detectable problems in our code.

### The how

We could easily avoid this problem if we enhance our code with TypeScript! We could specify that the `greeting` parameter that an instance pass as an argument must be of the type `string`: `function Greeter(greeting: string) { }`. The moment we typed this, the argument of instance we pass is being highlighted in red, and when we hover over it go get more information, we get: "Argument of type `{message: string;}` is not assignable to parameter of type `string`". We can then better expect errors in our code, and have a correct result.

```ts
function Greeter(greeting: string) {
    this.greeting = greeting;
}

Greeter.prototype.greet = function() {
    return "Hello, " + this.greeting;
}

let greeter = new Greeter({message: "world"}); // The argument will be marked in a red underline

let button = document.createElement('button');
button.textContent = "Say Hello";
button.onclick = function() {
    alert(greeter.greet());
};

document.body.appendChild(button);
```

Once we've detected the problem, we could fix it by removing the object and passing only a string `hello`, and then get the desired result fast.

We mix TypeScript in our simple vanilla JavaScript code in order to get the benefits of having a strongly typed language. Of course, TypeScript has many other features as well, so we will be looking at them as well as the main types feature in detail.

## Installing TypeScript (Section 1, lecture 4)

We used the playground in the last lecture to see and example of TypeScript, but from now on we will be using TypeScript in our IDE, and so we will have to install TypeScript on our machines. We install TypeScript using the terminal using npm with the command `sudo npm i -g typescript` to install it globally on our machine.

## Using TypeScript (Section 1, lecture 5)

Now that we have TypeScript installed, in order for us to use it in ur code we will need to create a '.ts' file, which is the standard TypeScript file. We will create a demo folder with `index.html` and `index.ts`. As we've said before, the browser cannot read '.ts' files as script files, only '.js' files, and so we will link our `<Script>` tag to `index.js`, which doesn't exist yet.

TypeScript also comes with its own compiler, and so any TypeScript code would be easily compiled into vanilla JavaScript, thus enabling us to program an application in TypeScript, with all its features and benefits, and deploy it safely with JavaScript.

In the `index.ts` file, we will paste the same code from the playground. If we leave the object in the argument as it was originally in the playground code, we see that it is being marked in red underline immediately, and the IDE tells us that the argument is not in the type of `string`.

### The TypeScript Compiler

If we want to see the code in the browser, we will need to have a link to a '.js' file, and so we use the built-in TypeScript compiler. To compile the TypeScript code to JavaScript, we open the terminal and type the command `tsc <target .ts file>`, in our case its `tsc index.ts`. If we didn't change the TypeScript error we have before we tried to compile, the compiler will throw us an error, displaying the code errors we have in our '.ts' file, their location and will terminate the process. Only after we dealt with the errors and corrected them, then we could successfully compile the code to JavaScript.

If we now open the file tree, we could see that now we have an `index.js` file along side our `index.ts` file. Now when we open the `index.html` file in the browser, we can see the button, press it and see that we get the desired result.
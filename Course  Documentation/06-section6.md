# Section 6 - Namespaces and Modules

## An Introduction to Namespaces (Section 6, lecture 71)

Namespaces are a way for us to group pieces of code under a single name, making it more modular and seperated from the global scope. But why would we need Namespaces? Let's say we would like to build some mathematical tools that will help us do some calculations:

```ts
const PI = 3.14;

function calculate(diameter: number) {
		return diameter * PI;
	}
function calculateRectangle(width: number, length: number) {
		return width * length;
	}
```

All of these can be grouped together under some mathematical label. For this we would like to create a Namespace which will allow us to group these together, and to avoid placing this functions into the global scope. Without it, it could get messy once the functions we input will start to get more and more, then we will also have to manage not to duplicate names, override variables etc.

### Initiating `namespace`

To create a Namespace, we will start with the `namespace` keyword, then we pass the name of the Namespace and open curly braces. We can thus see that Namespace is kind of a JavaScript object. Now we can simply put all of our common code into the relevant `namespace`.

```ts
namespace MyMath {
	const PI = 3.14;

	function calculate(diameter: number) {
		return diameter * PI;
	}
	function calculateRectangle(width: number, length: number) {
		return width * length;
	}
}
```

### Accessing the code

If we will simply try to access the functions or the variables within the Namespace, we will get an error saying they're undefined, and that makes sense since the Namespace is a new block scope object, not accessible on the global scope.

```ts
namespace MyMath {
	const PI = 3.14;

	function calculate(diameter: number) {
		return diameter * PI;
	}
	function calculateRectangle(width: number, length: number) {
		return width * length;
	}
}
console.log(calculateRectangle(10, 20)); // Error
console.log(calculate(3)); // Error
```

In order to access the code, we would fist have to access then with the dot notations, like we would with an object, but also we would have to `export` t he functions, basically marking the things we want to make available from the Namespace.

```ts
namespace MyMath {
	const PI = 3.14;

	export function calculate(diameter: number) {
		return diameter * PI;
	}
	export function calculateRectangle(width: number, length: number) {
		return width * length;
	}
}
console.log(MyMath.calculateRectangle(10, 20)); // 200
console.log(MyMath.calculate(3)); // 9.42
```

The functions are now available to the outside, provided we will first pass the name of the Namespace to access them. We didn't export our `PI` variable, and so it is still exclusive to the Namespace itself, and not the outside scope.

### The compiled code

Looking at the compiled code at the `app.js` file, we could see that the Namespace eventually will compile into a variable which holds an IIFE.

```js
var MyMath;
(function (MyMath) {
    var PI = 3.14;
    function calculate(diameter) {
        return diameter * PI;
    }
    MyMath.calculate = calculate;
    function calculateRectangle(width, length) {
        return width * length;
    }
    MyMath.calculateRectangle = calculateRectangle;
})(MyMath || (MyMath = {}));
```

## Namespaces and Multiple Files (Section 6, lecture 71)

With the current state, we have all the logic of the Namespace living in a single file. It is fine for a tiny program, but if we would have a bigger Namespace with many other functions, of many other sorts - we would like to split it up, and event split up the current Namespace into different categories, like a Namespace for circle functions, rectangle functions etc.

And so we will create 2 new file: `rectangleMath.ts` and `circleMath.ts`, each will have a `namespace` with the name of `MyMath`. Basically, we're splitting the current Namespace functions into 2 different Namespaces in 2 different files.

```ts
namespace MyMath {
	export function calculateRectangle(width: number, length: number) {
		return width * length;
	}
}
```

```ts
namespace MyMath {
	const PI = 3.14;

	export function calculate(diameter: number) {
		return diameter * PI;
	}
}
```

In the original `app.ts` file, we're left with our `console.log`.

```ts
console.log(MyMath.calculateRectangle(10, 20));
console.log(MyMath.calculate(3));
```

We're refering to the same Namespace in both files. If we will try to compile the code now, We will encounter errors in `app.ts`, stating that `MyMath` is not defined, which makes sense since we're not accessing our Namespace files from anywhere, and so these functions do not exist on `app.ts`. Though, all the files did compile to JavaScript, and so now we also have `circleMath.js` and `rectangleMath.js`.

### Importing the files in the HTML via `<script>` tag

The first way of solving this issue is going to our `index.html` file and import all of the compiled `.js` files with the `<script>` tag, like we do with `app.js` currently. Now if we will use `tsc` and compile `app.ts` again, we could go into the console and see that the functions are being accessed again. The Namespaces are automatically combined into a 'single' Namespace, since they share the same name `MyMath`.

```html
<script src="circleMath.js"></script>
<script src="rectangleMath.js"></script>
<script src="app.js"></script>
```

Doing this we need to keep in mind the order of the files, the `app.js`, which calls both of the Namespaces hosted in the other files, needs to come last, as the other code needs to be available before the `app.js` script runs, otherwise we will encounter errors.

The problem with this method is that it can get very unmanageable if we will have many other files, we would have to manually keep adding them and minding the order, which is not a good way to handle this issue.

### Bundling the files using the TypeScript compiler `tsc --outFile` command

a better solution would be to use the TypeScript compiler built in feature for bundling different `.ts` file into a single `.js` file. We do that by passing `tsc --outFile`, next we will have to specify the name of the output `.js` file, where all the `.ts` file will be bundled up into, and lastly specifying all the `.ts` file names we want to bundle together, and the order would be the order in which they will be added in the file, and this could be important if we have a code that interact with each other and depend on different code to run first. We specify our target file as `app.js`, since this is the default file that is already compiled and available at `index.html`.

```cmd
tsc --outFile app.js circleMath.ts rectangleMath.ts app.ts
```

Now if we reload the code, we could see that the functions are being accessed again, meaning that they are available at the compiled file. If we have a look at `app.js` now, we could see all the different code from the various files being bundled together.

```js
var MyMath;
(function (MyMath) {
    var PI = 3.14;
    function calculate(diameter) {
        return diameter * PI;
    }
    MyMath.calculate = calculate;
})(MyMath || (MyMath = {}));

var MyMath;
(function (MyMath) {
    function calculateRectangle(width, length) {
        return width * length;
    }
    MyMath.calculateRectangle = calculateRectangle;
})(MyMath || (MyMath = {}));

console.log(MyMath.calculateRectangle(10, 20));
console.log(MyMath.calculate(3));
```

This is an improvement from manually passing `.js` files into the `index.html`, but still there are downsides - we need to list all the files we want to bundle together into the terminal, and we could improve that too.

## Namespace Imports (Section 6, lecture 73)
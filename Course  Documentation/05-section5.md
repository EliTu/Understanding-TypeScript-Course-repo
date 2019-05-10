<!-- markdownlint-disable MD010 -->

# Section 5 - Using Classes to Create Objects

## Creating Classes and Classes Properties (Section 5, lecture 57)

We're creating classes with the `class` keyword, and then give the class any name we want, for instacne `Person`. This is exactly like how we create classes in ES6. We can then pass properties to the class, and then assign them with types.

```ts
class Person {
	name: string;
}
```

That's a big difference with the ES6 vanilla JavaScript classes: we created properties without needing to set them up with the `this` keyword or a `constructor` function, we assign them directly in the class body.

### Class prefix keywords

We can prefix the class properties with keywords like `public`, `private` and `protected`, which will determine the exposure of the property.

`public` will basically make sure that the property is available to anyone who wants to access it, and it's the default state of any class property (if we don't specify otherwise), and so we can just leave it out without specifying it exclusively.

`private` means that we can only access it within the class or from an object which is an instance of this class, and this is a major addition with the TypeScript, as JavaScript doesn't know what `public` or `private` is, and so if we want a private property in vanilla JavaScript we would have to create a workaround to achieve that.

`protected` properties are available to any object or classes that inherit from the class that the property was defined in. In a sense, it is very similar to `private`, but for example- a child element of the `Person` class will have access to the `protected` properties, but not to the `private` properties.

```ts
class Person {
	name: string; // by default, its public
	private type: string;
	protected age: number;
}
```

### The `constructor` function

The constructor function takes arguments which are based on the properties we want to pass to the objects that will be created from the class, like `name`, and then we assign the name which will be passed as an argument to the property of `name` with `this.name = name`.

```ts
class Person {
	name: string;
	private type: string;
	protected age: number;

	constructor(name: string) {
		this.name = name;
	}
}
```

TypeScript offers us a quick shortcut for setting up a property that we also set in a constructor. If we want to pass another property, lets say a username, we can pass it straight in the `constructor` and state the keyword and its type at the same time. Looks like this:

```ts
class Person {
	name: string;
	private type: string;
	protected age: number;

	constructor(name: string, public userName: string) {
		this.name = name;
	}
}
```

With that we're telling TypeScript to not only expect to get `userName` in the constructor function, but also automatically create a `public` property (or `private`, `protected`) and assign the argument we get to the `constructor` as a property. So essentially, `public userName: string` in the `constructor` is equivalent to setting `public userName` in the class, putting `userName: string` in the `constructor` and assigning the argument as `thisuserName = userName`. So we could also do this with `name`:

```ts
class Person {
	private type: string;
	protected age: number;

	constructor(public name: string, public userName: string) {}
}
```

### Instantiating the class

We intantiate a class with the `new` keyword, and pass the arguments to match the properties of the class.

```ts
class Person {
	name: string;
	private type: string;
	protected age: number;

	constructor(name: string, public userName: string) {
		this.name = name;
	}
}

const person = new Person('Yoda', 'yod5');
console.log(person); // Person {userName: "yod5", name: "Yoda"}
```

This will log a a `Person` class with the `name` of 'Yoda' and a `userName` of 'yod5', and so the shorthand syntax really does work and able to create an instance successfully. What will happen if we will try to access `type` or `age` ?

```ts
class Person {
	name: string;
	private type: string;
	protected age: number;

	constructor(name: string, public userName: string) {
		this.name = name;
	}
}

const person = new Person('Yoda', 'yod5');
console.log(person); // Person {userName: "yod5", name: "Yoda"}
console.log(person.type, person.age); // undefined, undefined
```

The tsc will throw warnings telling us we are trying to access `private` and a `protected` type of properties: `private` only available within the class, and `protected` only available within the class or subclass. The compiled .js file will just print out `undefined`.

## Class Methods and Access Modifiers (Section 5, lecture 58)

We can't access our modifiers, `private` and `protected` from the outside, but we could do this inside of our function. We will create 2 methods that access `type` and `age`, and mutate their values. Another thing that we could do is to declare the value of a property right after we declare them, and we don't have to do that in the constructor, and so we will set the `age` to 27.

```ts
class Person {
	name: string;
	private type: string;
	protected age: number = 27;

	constructor(name: string, public userName: string) {
		this.name = name;
	}

	printAge() {
		console.log(this.age);
	}

	setType(type: string) {
		this.type = type;
		console.log(type);
	}
}
```

Because we're inside of the `Person` class, we can access `age` and `type` and modify their data. Now we can call these methods with an instance of the class.

```ts
const person = new Person('Yoda', 'yod5');
console.log(person); // Person {userName: "yod5", age: 27, name: "Yoda"}
person.printAge(); // 27
person.setType('TS!!'); // TS!!
```

### Adding modifiers to methods

We could also set methods as `private` or `protected`, and `public` is the default value. Setting them as `private` will basically make it impossible to access them from the outside, but we could still reach to them inside of the class. We will set `setType` as `private`, and if we will try to run the code above again, we will encounter an error saying that we can't access it from outside of the class. We can access them within the class, and so if we use the `setType` inside the `printAge` function for example, it will work.

```ts
class Person {
	name: string;
	private type: string;
	protected age: number = 27;

	constructor(name: string, public userName: string) {
		this.name = name;
	}

	printAge() {
		console.log(this.age);
		this.setType('1991');
	}

	private setType(type: string) {
		this.type = type;
		console.log(type);
	}
}

const person = new Person('Yoda', 'yod5');
person.printAge(); // 27, 1991
// person.setType('TS!!'); // This will throw an error
```

## Inheritance (Section 5, lecture 59)

We can create a class based on another class, or basically a subclass based on a superclass. We could do that with the `extends` keyword. Whatever we pass into the subclass will either be appended as a new property if it is not included in the superclass, or overridden if it is included in the superclass.

```ts
class Eliad extends Person {
	name: string = 'Eliad';
}
```

In this example, the `name` property of the subclass will override the `name` property in the superclass. When we try to instantiate the `Eliad` class, the IDE will indicate an error, saying it expects 2 arguments, as it is stated in the superclass `constructor` function. We will pass 2 arguments, according to the superclass, the first is the `name` and the second is the `username`.

```ts
class Eliad extends Person {
	name: string = 'Eliad';
}
const eliad = new Eliad('notEliad', 'eliad');
console.log(eliad); // Eliad {userName: "eliad", age: 27, name: "Eliad"}
```

We see that the console will still log `Eliad` as the name, as it was overridden by the subclass `name` property. We could solve this issue by adding a `constructor` to the subclass as well.

## Inheritance and Constructors (Section 5, lecture 60)

When we use `extend` on a superclass, we should also pass a `constructor`, which will also always call a `super` function, which basically calls the `constructor` function of the superclass, along with its arguments and properties. We can pass arguments inside of the `super`, like the value of the `name` property, and in the `constructor` we could pass what we expect to receive when instantiating the class. We don't have to pass `public` on the `userName` again, since it was already defined at the superclass.

```ts
class Eliad extends Person {
	constructor(userName: string) {
		super('Eliad', userName);
	}
}
const eliad = new Eliad('eliad');
console.log(eliad); // Eliad {userName: "eliad", age: 27, name: "Eliad"}
```

## Inheritance Wrap up (Section 5, lecture 61)

What if we wanted to change the `age` property? it is a `protected` property, meaning it is available at the subclasses as well, and so we can reach it and set it in our subclass, and we could access it easily with the `this` keyword.

```ts
class Eliad extends Person {
	constructor(userName: string) {
		super('Eliad', userName);
		this.age = 27.5;
	}
}
const eliad = new Eliad('eliad');
console.log(eliad); // Eliad {userName: "eliad", age: 27.5, name: "Eliad"}
```

As for the `type` property, we cannot access it since it is `private`, and does not get inherited to subclasses, and so it is exclusive only to the `Person` class. If we will try to access it or log it, we will encounter a warning in the compiler telling us that `type` is private and could only be accessed in `Person`, but it will print out `undefined` in the console. So we can now clearly see the difference between `private` and `protected`.

```ts
class Eliad extends Person {
	constructor(userName: string) {
		super('Eliad', userName);
		this.age = 27.5;
		console.log(this.type); // ERROR (prints 'undefined')
	}
}
const eliad = new Eliad('eliad');
console.log(eliad); // Eliad {userName: "eliad", age: 27, name: "Eliad"}
```

## Getters and Setters (Section 5, lecture 62)

Another feature that we have with classes are getters and setters, and TypeScript makes it very easy to work with them.

We'll create a new class, and we'll create a `private` property named `_species`. Usually, we should not prefix our properties with and underscore, according to the TypeScript style guide, but we will do in this case because we don't want to access `_species` property fom outside, but we do want to have a controlled access through getters and setters, which will allow us to execute some code before setting the value.

### `set` method 

We want our `_species` to be limited to a string with at least 3 characters, and so we will use the `set` function to make sure that our variable is set correctly before we `return` or `mutate` its value.

Basically the setter function allows to execute a code before we set a certain value to a property, and although its a method, it acts like a property. we initialize it with the `set` keyword and pass on a custom name that is accessible from the outside. We follow up with parantheses, but we do not use these parantheses to make a method call like we usually would with methods. We pass a parameter named `value` which later we will use to set the value of `_species`.

```ts
class Plant {
	private _species: string = 'Default';

	set species(value: string) {
		value.length > 3
			? (this._species = value)
			: (this._species = 'Default');
	}
}
```

### `get` method

In this method we decide what we want to `return`, and so we must `return` something. It is initialized with `get` and takes no parameters. In our case, we will `return` what we set in the `set` method.

```ts
class Plant {
	private _species: string = 'Default';

	get species() {
		return this._species;
	}

	set species(value: string) {
		value.length > 3
			? (this._species = value)
			: (this._species = 'Default');
	}
}
```

### Instantiating

Now that we have our getter and setter, we can make a new instance of `Plant` and try to access the `_species` property. We try to access it by passing the name of the `set` method, that again - we will treat it as a property of the class.

```ts
let plant = new Plant();
console.log(plant.species); // Default
```

If we will try to set `species` to something shorter than 3 characters, we will still get the same result, as this does not accord to the validation we set in the setter method.

```ts
let plant = new Plant();
console.log(plant.species); // Default
plant.species = 'AB';
console.log(plant.species); // Default
```

If we will set `species` to something longer than 3 words, we will see that value being printed to the console.

```ts
let plant = new Plant();
console.log(plant.species); // Default
plant.species = 'AB';
console.log(plant.species); // Default
plant.species = 'Green plant';
console.log(plant.species); // Green plant
```

This makes getters and setters a convenient way to customize the access to properties in our class, basically setting a criteria for setting properties or mutating their values.

## `static` Properties and Methods (Section 5, lecture 63)

Using the `static` keyword, we can expose specific properties or methods outside the class, without even needing to instantiate it first. We will create a class called `Helpers`, which will bundle some helper properties or methods that we can use in our app. Let's say we want to have the access to the value of PI.

```ts
class Helpers {
	PI: number = Math.PI;
}
```

By default, our only way to access  the `PI` property is by first instantiating the `Helpers` class, even if we try to prefix it with `Helpers.PI`, by default it won't work. But if we will set the `PI` property as `static`, we will be able to do that.

```ts
class Helpers {
	static PI: number = Math.PI;
}
console.log(Helpers.PI * 2); // 6.283...
```

This is a good use case for the `static` keyword: whenever we have a "Helper" class that just bundles up some helping methods or properties that I would like to freely use throughout the app.

This could also work with methods of course.

```ts
class Helpers {
	static PI: number = Math.PI;
	static calcCircumference(diameter: number): number {
		return this.PI * diameter;
	}
}
console.log(2 * Helpers.PI); // 6.283...
console.log(Helpers.calcCircumference(8)); // 25.132...
```

## Abstract Classes (Section 8, lecture 64)

Abstract classes, which are marked with the `abstract` keyword, are classes that cannot be instantiated directly, but we have to inherit from them constantly, they are there just to be inherited from. The reason for them is if we have classes that are never meant to be instantiated, but are there only to provide some basic set up for other specialized classes that will be instantiated.

Let's say we have an `abstract` class named `Project`, it has few properties and methods. 

```ts
abstract class Project {
	projectName: string = 'Default';
	budget: number = 1000;

	calcBudget() {
		return this.budget * 2;
	}
}
```

### `abstract` methods

We can also create `abstract` methods, using the `abstract` keyword ahead of the method's name, which can also take argument, but it does not have curly braces, meaning it does not hold a function body. We only define how the function should look like, but we're not implementing any logic. Once we extend the `abstract` class we have to initiate the `abstract` function too, meaning we will have to write the logic in the subclass. the `calcBudget` method will not have to be rewritten at the subclass.

```ts
abstract class Project {
	projectName: string = 'Default';
	budget: number = 1000;

	calcBudget() {
		return this.budget * 2;
	}

	abstract changeName(name: string): void;
}
```

### The inheriting subclass

We can then create a more specialized class that `extends` the `abstract` class we initiated earlier. The moment we create this class, we get an IDE error telling us to set the `changeName` method, and the same error will occur if we will try to compile the TypeScript code. We will implement the `changeName` method by giving it the logic in the curly braces.

```ts
class ITProject extends Project {
	changeName(name: string): void {
		this.projectName = name;
	}
}
```

Now we can go ahead and instantiate the `ITProject` class, since this is the class that can be instantiated. 

```ts
let newProject = new ITProject();
console.log(newProject); // name: Default...
newProject.changeName('Super IT Project');
console.log(newProject); // name: Super IT Project...
```

## Private Constructors & Singletons (TypeScript 2.0) (Section 5, lecture 64)


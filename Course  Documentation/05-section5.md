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

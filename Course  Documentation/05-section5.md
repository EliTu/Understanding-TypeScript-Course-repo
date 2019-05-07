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

`public` will basically make sure that the property  is available to anyone who wants to access it, and it's the default state of any class property (if we don't specify otherwise), and so we can just leave it out without specifying it exclusively.

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

	constructor(public name: string, public userName: string) {
	}
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
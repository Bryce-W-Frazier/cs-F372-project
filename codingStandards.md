# Coding Standards
Bassed from [Mozilla JS Standards](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Code_style_guide/JavaScript#general_guidelines_for_javascript_code_examples)

## Style
- Indents are two spaces.
- Imports should be used at the start of the file after the human readable header.
- Variables should be declared at the beinging of it's scope (local & global).
- Functions/Methonds should be declared at the end of it's scope.
- Do not use elipsis.
- No line should have more than 80 Chars.



## Variables
Variables must be named in a manner that clearly discribes it's abastract meaning.
In general signle values should be singular named and arrays should be plural named. 
For Example: 
```
// An objectt
let apple_mass = 2
// An array
let apples = [];
```
Local Var also must be in `snake_case` while global shall be in `UPPER_SNAKE_CASE`.

## Arrays
- Declare arrays by seting it to `[]` not `new Array(length)`.
- Use `push()` at add items to arrays.

## Funcitons/Methonds
- Funcitons/Methonds names shoud be in `camelCase`.
- Parenthesis after name shall not have a space. Do this: `foo()`.
- Should not be more than 30 lines long.
- Use funciton declaration over function expressions.
  Do this:
  ```
  function sum(a, b) {
  return a + b;
  }
  ```
  Not this:
  ```
  let sum = function (a, b) {
  return a + b;
  };
  ```
- When using anonumous functions as callback, use an arrow funciton to make code cleaner.
  Do this:
  ```
  const array = [1, 2, 3, 4];
  const sum = array.reduce((a, b) => a + b);
  ```
  Not this:
  ```
  const array = [1, 2, 3, 4];
  const sum = array.reduce(function (a, b) {
    return a + b;
  });
  ```
- When using and identifier, don't use arrow funcitons like this:
  ```
  const foo = () => {
    ...
  };
  ```
  Do this:
  ```
  function foo() {
    ...
  }
  ```
- Always use explecit returns of funcitons.

## Flow Control
- Flow control statements should have preceeding space after keyword, i.e. `if ()`.
- When iteragting over a collection, avoid using classical `for (;;)` loop; if possiable use
  `for...of` like this:
  ```
  const dogs = ["Rex", "Lassie"];
  for (const dog of dogs) {
    console.log(dog);
  }
  ```
  Not this:
  ```
  const dogs = ["Rex", "Lassie"];
  for (let i = 0; i < dogs.length; i++) {
    console.log(dogs[i]);
  }
  ```
- When both the key and the value need to accessed use a tupple like this:
  ```
  const gerbils = ["Zoé", "Chloé"];
  gerbils.forEach((gerbil, i) => {
    console.log(`Gerbil #${i}: ${gerbil}`);
  });
  ```
  Not this:
  ```
  const gerbils = ["Zoé", "Chloé"];
  for (let i = 0; i < gerbils.length; i++) {
    console.log(`Gerbil #${i}: ${gerbils[i]}`);
  }
  ```
- If an if statement ends with a rturn, do not add an else statment.
```
if (test) {
  ...
  return; // If this is here...
} // ... don't add this: else {}
```
- Always use braces and indents in flow control like this:
  ```
  for (const car of storedCars) {
    car.paint("red");
  }
  ```
  Not this:
  ```
  for (const car of storedCars) car.paint("red");
  ```
- In a switch case don't use break and return in the same case like this:
  ```
  switch (species) {
    case "chicken":
      return farm.shed;
    case "horse":
      return corral.entry;
    default:
      return "";
  }
  ```
  Not this:
  ```
  switch (species) {
    case "chicken":
      return farm.shed;
      break;
    case "horse":
      return corral.entry;
      break;
    default:
      return "";
  }
  ```

## Error handling
- Use try and catch statements for volatile operations like networks conections.


## Comments 
- Always have a space between `//` and the comment.
- Use when the code's logic or purpose isn't obvious.
- Write in full, brief sentence with proper grammer.
- Make sure comments are on the same indenation leve as is code block.
- `console.log()` and `console.error()` should have it's expeted output on the same line.
  Do this:
  ```
  console.log(fruitBasket) // ['banana', 'mango', 'orange']
  ```
  Not this:
  ```
  // Logs: ['banana', 'mango', 'organge']
  console.log(fruitBasket);
  ```
If the line gets to long then put the comment *after* the log.
- Use `//` all comments even multi-line comments.
Like this:
  ```
  // This is an example of a multi-line comment.
  // The imaginary function that follows has some unusual
  // limitations that I want to call out.
  // Limitation 1
  // Limitation 2
  ```
  Not this:
  ```
  /* This is an example of a multi-line comment.
    The imaginary function that follows has some unusual
    limitations that I want to call out.
    Limitation 1
    Limitation 2 */
  ```

## Human Readable Header
This should be use at the beinging for every file.
```
// <filename>
// <Brief description of purpose.>
// Started: <date of file creation>
```

# Version Control

## Commit Standards
Use connevtional Committ Format <Doc, Feat, Bug, etc.>:<Discription>.

Don't take these guidelines too litartly if it would make reading harder in realality. 
Be sure to be able to articulate why the exception is needed, maybe inculde in commit. 

## Merges
- Always use `git pull --rebase' when possible.
- If there is a merge conflict contact the author of the conflicting code.
- If possible resolve conflicts in a pair programing session.

## Push
- Notify team via discord group chat before working on code.
- Push commit's after every session.
- It's reccomend to push when taking a break.

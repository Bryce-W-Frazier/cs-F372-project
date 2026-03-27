# Coding Standards
Bassed from [Mozilla JS Standards](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Code_style_guide/JavaScript#general_guidelines_for_javascript_code_examples)

## Style
- Indents are two spaces.
- Imports should be used at the start of the file after the human readable header
- Variables should be declared at the beinging of it's scope (local & global)
- Functions/Methonds should be declared at the end of it's scope.
- 

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
### Arrays
- Declare arrays by seting it to `[]` not `new Array(length)`
- Use `push()` at add items to arrays.

## Comments
Use when the code's logic or purpose isn't obvious

## Human Readable Header
This should be use at the beinging for every file.
```
// <filename>
// Started: <date of file creation>
```

## Commit Standards
Use con

Don't take these guidelines too litartly if it would make reading harder in realality. 
Be sure to be able to articulate why the exception is needed, maybe inculde in commit. 

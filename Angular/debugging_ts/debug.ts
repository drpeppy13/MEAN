//1. Setting types
// added an number type to variable to accept both types
var myString: string | number;
myString = "Bee stinger";
myString = 9;

//2. Setting the types for function parameters
// added a number type to the parameters to accept both types
function sayHello(name: string | number){
    return `Hello, ${name}!`;
}
console.log(sayHello("Kermit"));
console.log(sayHello(9));

//3. Optional parameters
// added question mark to make middleName an optional parameter
function fullName(firstName: string, lastName: string, middleName?: string){
    let fullName = `${firstName} ${middleName} ${lastName}`;
    return fullName;
}
console.log(fullName("Mary", "Moore", "Tyler"));
console.log(fullName("Jimbo", "Jones"));

//4. Interfaces and function parameters
//added an s to the belts to follow interface
interface Student{
    firstName: string;
    lastName: string;
    belts: number;
    
}
function graduate(ninja: Student) {
    return `Congratulations, ${ninja.firstName} ${ninja.lastName}, you earned ${ninja.belts} belts!`;
}
const christine = {
    firstName: "Christine",
    lastName: "Yang",
    belts: 2
}
const jay  = {
    firstName: "Christine",
    lastName: "Yang",
    belts: 4
}
console.log(graduate(christine))
console.log(graduate(jay))

//5. Classes and function parameters

class Ninja {
    fullName: string;
    constructor (
        public firstName: string,
        public lastName: string) {
            this.fullName = `${firstName} ${lastName}`;
        }
    debug(){
        console.log("Console.log() is my friend.")
    }
}

const shane = new Ninja("Shane","Kim");
//added  new to utilize Ninja class, and added 2 arguments that it requires.
const turing = {
    fullName: "Alan Turing",
    firstName: "Alan",
    lastName: "Turing",
    debug(){
    }
}

//included debug function so that turing would be able to be passed through study().
function study(programmer: Ninja) :string {
    return `Ready to whiteboard an algorithm, ${programmer.fullName}?`
}
console.log(study(turing));

//6.Arrow functions

var increment = x => x + 1;
console.log(increment(3));
var square = x => x * x;
//doesn't need {}
console.log(square(4));
var multiply = ( x,y ) => x * y;
// added () 
var math = (x , y) => {
    let sum = x + y;
    let product = x * y;
    let difference = Math.abs(x-y);
    return [sum, product, difference];
}
//multiple line expression needs {}

//7. Arrow functions and 'this'
class Elephant {
    constructor(public age: number) {}
    birthday = age => {
        this.age ++;
    }
}
// added arrow function to elephant class for birthday to increment
const babar = new Elephant(8);
setTimeout(babar.birthday, 1000)
setTimeout(function(){
    console.log(`Babar's age is ${babar.age}.`)
}, 2000)
// function greet(person, date) {
//     console.log(`Hello ${person}, today is ${date}`)
// }
// greet("Brendon");

// let x = Math.random() < 0.5 ? 10 : "hello";

// x = 1;
// console.log(x)
// x = "ff"
// console.log(x)

interface Circle {
    kind : "circle";
    radius: number;
};

interface Square {
    kind : "square";
    sideLength: number;
};

interface Triangle {
    kind: "triangle";
    sideLength: number;
};

type Shape = Circle | Square | Triangle;

function getArea(shape: Shape) {
    switch(shape.kind) {
        case "circle" :
            return Math.PI * shape.radius ** 2;
        case "square" :
            return shape.sideLength ** 2;
        default : 
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck;
    }
}
console.log(getArea({kind:"triangle", sideLength: 5}));

// Function type expressions

function greet (fn: (a:string) => void) {
    fn("Hello World")
}

function printFunction (s:string) {
    console.log(s)
}

greet(printFunction);

type FunctionType = (a:string) => void
function greet2(fn: FunctionType) {
    fn("Hello World")
}
function printFunction2 (s: string) {
    console.log(s);
}
greet2(printFunction2)


// generic function 
// when we want to describe the correspondence between two values
// a function which takes array as a parameter and returns the first element of the array. 
// So both return type and parameter have similarity.
function firstElement <Type> (arr: Type[]) : Type | undefined {
    return arr[0]
} 

// Can have more than one arguments/parameters also
function map <Input, Output> (arr: Input[], fn: (n:Input) => Output) : Output[] {
    return arr.map(fn)
  }
  const parsed = map(["1","2","3","4", "Kishan"], (n) => parseInt(n));
  console.log(parsed)


// Constraints can be further used to limit the types of Type that can be passed in parameters
// Here the length property is only accessible by arrays and strings therefore we can pass those only
// In case of numbers we get wrong answer
function constrains <Type extends {length:number}>(a:Type, b:Type) {
    if (a.length > b.length) {
      console.log(a);
    }
    else {
      console.log(b);
    }
  }
  constrains([1,2,3], [55,23,13,12,555])
  constrains("asf", "asafasf")
  constrains(1990,131);



  // we can specify the types while invoking the function
  function func <Type>(a:Type[], b:Type[]) : Type[] {
    return a.concat(b);
  }
  
  console.log(func([1,2,3],[4,5,6]));
  console.log(func<string|number>([1,2,3],["Kishan","Mishra"]));
  
  

  /*** While destructuring the props if we assign any property to a type, that type becomes a local variable and the value of the property is assigned to that variable  ***/ 
    // For ex here, in draw function shape:Shape, means a new local variable named Shape is created and the value of the property shape (prop), is assigned to Shape. Similarly the value of xPos is assigned to kishan, because it is written like xPos : kishan. 
    interface Shape {}
    // declare function render(x: unknown);
    function render <Type>(x:Type) :Type {
      console.log(x)
      return x;
    }
    // ---cut---
    function draw({ shape: Shape, xPos: kishan = 104 /*...*/ }) {
      console.log(kishan);
    }
    draw({shape:'rectange'})






    //----------------------//
      function getPropertyOf <Type, Key extends keyof Type> (obj:Type, key : Key) :Type[Key] {
    return obj[key];
  }
  let items = {"a":1, "b":2, "c":3, "d":4, "e":5};
  console.log(getPropertyOf(items, "a"));
  console.log(getPropertyOf(items, "b"));
  console.log(getPropertyOf(items, "c"));
  console.log(getPropertyOf(items, "d"));

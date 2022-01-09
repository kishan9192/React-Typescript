// function greet(person, date) {
//     console.log(`Hello ${person}, today is ${date}`)
// }
// greet("Brendon");
;
;
;
function getArea(shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * Math.pow(shape.radius, 2);
        case "square":
            return Math.pow(shape.sideLength, 2);
        default:
            var _exhaustiveCheck = shape;
            return _exhaustiveCheck;
    }
}
console.log(getArea({ kind: "triangle", sideLength: 5 }));

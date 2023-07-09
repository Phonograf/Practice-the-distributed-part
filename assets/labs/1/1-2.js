//Техническая зона
(function () {console.log = function (message) {postMessage(message);}})(); async function prompt(msg) {postMessage(`|prompt|${msg}`);let value;var promise = new Promise((resolve, reject) => {onmessage = function nagaf(e) {if (e.data) {resolve(e.data);}};});return promise.then(result => value = result);}
//Основная зона
importScripts('../../jiggzson-nerdamer-9c9edec/all.min.js'); 
nerdamer.set('SOLUTIONS_AS_OBJECT', true)
var eq = nerdamer.solveEquations(["y^2 - 7*x*y + 4*x^2 + 13*x - 2*y = 3","y^2 - 14*x*y + 9*x^2 + 28*x - 4*y = 5"]);
console.log(String(eq.x));
console.log(String(eq.y));

let eqas = nerdamer("y^2 - 7*x*y + 4*x^2 + 13*x - 2*y = 3").evaluate("y^2 - 14*x*y + 9*x^2 + 28*x - 4*y = 5"); 
console.log(String(eqas.solveFor('x')));

/*
x = -2, y = 1
x = 0, y = -1
x = 1, y = 2
x = 2, y = 3
*/
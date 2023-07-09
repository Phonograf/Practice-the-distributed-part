//Техническая зона
(function () {console.log = function (message) {postMessage(message);}})(); async function prompt(msg) {postMessage(`|prompt|${msg}`);let value;var promise = new Promise((resolve, reject) => {onmessage = function nagaf(e) {if (e.data) {resolve(e.data);}};});return promise.then(result => value = result);}
//Основная зона
importScripts('../../jiggzson-nerdamer-9c9edec/all.min.js'); 
var eq = nerdamer('x^3 + (2*a + 1)x^2 + (4*a + 3)x + 2*a + 3=0').evaluate();
console.log(eq.toString());
var solutions = eq.solveFor('x');
console.log(String(nerdamer(`simplify(${solutions[0]})`)));
console.log("");
console.log(String(nerdamer(`simplify(${solutions[1]})`)));
console.log("");
console.log(String(nerdamer(`simplify(${solutions[2]})`)));
console.log("");

//console.log(String(nerdamer(`${solutions[0]}=${solutions[1]}`).evaluate({i:"imagpart(i)"}).solveFor('a')));
//console.log(String(nerdamer(`${solutions[0]}=${solutions[2]}`).evaluate({i:"imagpart(i)"})));
//console.log(String(nerdamer(`${solutions[2]}=${solutions[1]}`).evaluate({i:"imagpart(i)"})));
//Техническая зона
(function () {console.log = function (message) {postMessage(message);}})(); async function prompt(msg) {postMessage(`|prompt|${msg}`);let value;var promise = new Promise((resolve, reject) => {onmessage = function nagaf(e) {if (e.data) {resolve(e.data);}};});return promise.then(result => value = result);}
//Основная зона
importScripts('../../jiggzson-nerdamer-9c9edec/all.min.js'); 
importScripts('../../js/math.js'); 
let a = String(nerdamer.solve("arcsin(cos x) = sin(sqrt(x))","x"));
var result = a.substring(1, a.length-1);
let mas = result.split(",");
for (let index = 0; index < mas.length; index++) {
    let temp = Number(mas[index]);
    let result = Number(math.evaluate(mas[index]));
    if ((result < Number(math.evaluate("4*pi")))&&(result > 0)) {
        console.log(mas[index]);
        console.log(result);
    }
}
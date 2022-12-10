function cmpChar(str, i, substr, array) {
    let f = true
    let t = str.slice(i, i + substr.length)
    for (let j = 0; j < substr.length; j++) {
        if (substr[j] !== t[j]) {
            f = false
            break
        }
    }
    if (f) array.push(i)
}

String.prototype.BruteForce = function (substr) {
    if (substr === "") return null
    let indexBF = []
    for (let i = 0; i < this.length - substr.length + 1; i++) {
        cmpChar(this, i, substr, indexBF)
    }
    return indexBF
}


String.prototype.HashFunc1 = function (substr) {
    let hsubstr = 0
    let hstr = 0
    let indexHF = []
    for (let j = 0; j < substr.length; j++) hsubstr += substr[j].charCodeAt(0)

    for (let j = 0; j < substr.length; j++) hstr += this[j].charCodeAt(0);
    if (hstr === hsubstr){
        cmpChar(this, 0, substr, indexHF)
    }
    for (let i = 1; i < this.length - substr.length + 1; i++) {
        hstr += this[i + substr.length - 1].charCodeAt(0) - this[i - 1].charCodeAt(0)
        if (hstr === hsubstr)
            cmpChar(this, i, substr, indexHF)
    }
    return indexHF
}

String.prototype.HashFunc2 = function (substr) {
    let hsubstr = 0
    let hstr = 0
    let indexHF = []
    for (let j = 0; j < substr.length; j++) hsubstr += Math.pow(substr[j].charCodeAt(0),2)

    for (let j = 0; j < substr.length; j++) hstr += Math.pow(this[j].charCodeAt(0),2)
    if (hstr === hsubstr){
        cmpChar(this, 0, substr, indexHF)
    }
    for (let i = 1; i < this.length - substr.length + 1; i++) {
        hstr += Math.pow(this[i + substr.length - 1].charCodeAt(0),2) - Math.pow(this[i - 1].charCodeAt(0),2)
        if (hstr === hsubstr)
            cmpChar(this, i, substr, indexHF)
    }
    return indexHF
}

String.prototype.HashFunc3 = function (substr) {
    let hsubstr = 0
    let hstr = 0
    let indexHF = []
    for (let j = 0; j < substr.length; j++) {
        hsubstr += substr[j].charCodeAt(0)*Math.pow(2,substr.length-j-1)
    }

    for (let j = 0; j < substr.length; j++) {
        hstr += this[j].charCodeAt(0)*Math.pow(2,substr.length-j-1);
    }
    if (hstr === hsubstr){
        cmpChar(this, 0, substr, indexHF)
    }
    for (let i = 1; i < this.length - substr.length + 1; i++) {
        hstr = (hstr - this.charCodeAt(i - 1)*2**(substr.length-1))*2 + this[i + substr.length - 1].charCodeAt(0)
        if (hstr === hsubstr)
            cmpChar(this, i, substr, indexHF)
    }
    return indexHF
}
fs = require("fs")
let tom1 = fs.readFileSync("war and peace(1 tome).txt").toString()
let tom12 = fs.readFileSync("war and peace(2 tome).txt").toString()+tom1
let tom123 = fs.readFileSync("war and peace(3 tome).txt").toString()+tom12
let tom1234 = fs.readFileSync("war and peace(4 tome).txt").toString()+tom123
let a = fs.readFileSync("1000000a.txt").toString()+"b"
let T1 = "a".repeat(100)+"b"
let T2 = "b" + "a".repeat(100)

console.log("TEST1")
console.time('bf1');
console.log(tom1.BruteForce("князь Андрей").length)
console.timeEnd('bf1');

console.time('bf12');
console.log(tom12.BruteForce("князь Андрей").length)
console.timeEnd('bf12');

console.time('bf123');
console.log(tom123.BruteForce("князь Андрей").length)
console.timeEnd('bf123');

console.time('bf1234');
console.log(tom1234.BruteForce("князь Андрей").length)
console.timeEnd('bf1234');

console.log("TEST2")
console.time('князь');
console.log(tom1234.BruteForce("князь").length)
console.timeEnd('князь');

console.time('князь Андрей');
console.log(tom1234.BruteForce("князь Андрей").length)
console.timeEnd('князь Андрей');

console.time('князь Андрей Болконский');
console.log(tom1234.BruteForce("князь Андрей Болконский").length)
console.timeEnd('князь Андрей Болконский');

console.log("TEST3")
console.time('a...ab bf');
console.log(a.BruteForce(T1).length)
console.timeEnd('a...ab bf');

console.time('a...ab hf');
console.log(a.HashFunc1(T1).length)
console.timeEnd('a...ab hf');

console.time('a...ab hf');
console.log(a.HashFunc2(T1).length)
console.timeEnd('a...ab hf');

console.time('ba...a bf');
console.log(a.BruteForce(T2).length)
console.timeEnd('ba...a bf');

console.time('ba...a hf1');
console.log(a.HashFunc1(T2).length)
console.timeEnd('ba...a hf1');

console.time('ba...a hf2');
console.log(a.HashFunc2(T2).length)
console.timeEnd('ba...a hf2');
console.time('ba...a hf3');
console.log(a.HashFunc3(T2).length)
console.timeEnd('ba...a hf3');




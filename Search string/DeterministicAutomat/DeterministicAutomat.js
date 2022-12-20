fs = require("fs")
let s = fs.readFileSync("text.txt","utf8");
let t = fs.readFileSync("pattern.txt","utf8");
let countState = t.length // конечное множество состояний автомата;
let state = 0; // начальное состояние автомата
alph = []; // конечный алфавит, т. е. множество букв, которое может читать автомат;
del = new Array(countState + 1);// функция перехода, т. е. отображение вида Q х Е —> Q

for (let i = 0; i < countState; i++)
    alph[t.charAt(i)] = 0;
for (let j = 0; j <= countState; j++)
    del[j] = [];
for (let i in alph)
    del[0][i] = 0;
for (let j = 0; j < countState; j++) {
    let prev = del[j][t[j]];
    del[j][t[j]] = j + 1;
    for (let i in alph)
        del[j + 1][i] = del[prev][i];
}
pos = [];
for (let i = 0; i < s.length; i++) {
    if (s[i] in alph)
        state = del[state][s[i]]
    else
        state = 0
    if (state === countState) {
        pos.push(i - countState + 1)
    }
}
console.log(pos)
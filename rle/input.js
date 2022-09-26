function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

let s = ""
const fs = require('fs')
for(let i=0;i<255;i++){
    for(let j=0;j<getRandomInt(0,1000);j++){
        s += String.fromCharCode(i)
    }
}
fs.writeFileSync("input.txt",s)
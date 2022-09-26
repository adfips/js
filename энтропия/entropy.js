fs = require("fs")
str = fs.readFileSync(process.argv[2], "utf-8")
alph = new Array()
try{
    for (let i in str) {
        alph[str[i].charAt()] = 0
    }
    for (let i in str) {
        alph[str[i].charAt()] += 1
    }
    console.log(alph);
    let sum = 0
    let p
    for(i in alph){
        p = alph[i]/str.length
        sum += -(p * (Math.log(p)/Math.log(2)))
    }
    console.log("entropy: "+ sum)
}
catch (e){
    console.log(e.message)
}


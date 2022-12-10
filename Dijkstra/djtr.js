function operation(a,b,o){
    switch (o){
        case "+":
            return a+b;
        case "-":
            return a-b;
        case "*":
            return a*b;
        case "/":
            return a/b;
        case "^":
            return a**b;
    }
}

let strInput = process.argv[2].split(/([+\-*\/^)(])/).filter(function (f){return f!==""});
let stack =[];
let out = [];
let priority = {"(": 0, "+": 1, "-": 1, "*": 2, "/": 2,"^":3};
for (let i = 0; i < strInput.length; i++){
    if (!isNaN(strInput[i]))
        out.push(strInput[i]);
    else if (strInput[i]!==")"){
        while(priority[strInput[i]]<=priority[stack[stack.length-1]] && stack.length>0 && strInput[i]!=="(")
            out.push(stack.pop());
        stack.push(strInput[i]);
    }
    else{
         while(stack[stack.length-1]!=="(")
            out.push(stack.pop());
        stack.pop();
    }
    if (i === strInput.length-1){
        while(stack.length)
            out.push(stack.pop());
    }
}
console.log(out.join(" "));

for (let i = 0; i<out.length; i++){
    if(isNaN(out[i])){
        out[i] = operation(Number(out[i-2]),Number(out[i-1]),out[i]);
        out.splice(i-2,2);
        i-=2;
    }
}

console.log(out[0]);

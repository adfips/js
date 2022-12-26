import {convert} from "./convert.mjs";

function addBinary(a, b) {
    let dec = Number(parseInt(a, 2)) + Number(parseInt(b, 2));
    return dec.toString(2);
}

function convINumber(s){
    let shift = parseInt(s[1],2)-127
    s[2] = (shift<0) ? "0."+"0".repeat(Math.abs(shift)-1)+"1"+s[2] :
        "1"+s[2].slice(0,shift)+"."+s[2].slice(shift)
    let sum=0
    let arr = s[2].split(".")
    for (let i = 1 ; i < arr[1].length+1; i++){
        sum += arr[1][i-1]*2**(-i)
    }
    return s[0]==="0" ? parseInt(arr[0],2)+sum
        : "-"+(parseInt(arr[0],2)+sum)
}


export function add(Num1, Num2){
    let binN1 = convert(Num1).split(" ")
    let binN2 = convert(Num2).split(" ")
    let binAdd = ["0", "00000000", "00000000000000000000000"]
    let del = parseInt(Math.abs(addBinary(binN1[1], -binN2[1])), 2)
    let nan = "01111111100000000000000000000001"
    let inf = "1111111100000000000000000000000"
    if (binN1.join("") === nan || binN2.join("") === nan)
        return NaN

    else if (binN1.join("").slice(1) === inf && binN2.join("").slice(1) === inf)
        return binN1 === binN2 ? Infinity : NaN

    else if (binN1.join("").slice(1) === inf)
        return Num1 > 0 ? Infinity : -Infinity

    else if (binN2.join("").slice(1) === inf)
        return Num1 > 0 ? Infinity : -Infinity

    else if (Math.abs(Num1) === Math.abs(Num2)) {
        if (Num1 !== Num2)
            return 0
        else {
            binAdd[0] = binN1[0]
            binAdd[1] = addBinary(binN1[1], "1")
            binAdd[2] = addBinary("1" + binN1[2], "1" + binN1[2]).slice(1, 24)
            return convINumber(binAdd)
        }
    } else if (binN2[0] === binN1[0] && binN2[1] === binN1[1]) {
        let add = addBinary("1" + binN1[2], "1" + binN2[2])
        binAdd[0] = binN1[0]
        binAdd[1] = addBinary(binN1[1], "1")
        binAdd[2] = add.slice(1, 24)
        return convINumber(binAdd)
    } else if (binN2[0] !== binN1[0] && binN2[1] === binN1[1]) {
        let add = Num1 > 0 ? addBinary("1" + binN1[2], "-1" + binN2[2])
            : addBinary("-1" + binN1[2], "1" + binN2[2])
        let mantis = add.replace("-", "").slice(1);
        binAdd[2] = mantis.padEnd(23, "0")
        binAdd[1] = addBinary(binN2[1], (mantis.length - 23).toString(2)).padStart(8, "0")
        binAdd[0] = Math.abs(Num1) > Math.abs(Num2) ? binN1[0] : binN2[0]
        return convINumber(binAdd)
    } else if (binN2[0] === binN1[0]) {
        let f = function (a, b) {
            b[2] = ("0".repeat(del - 1) + "1" + b[2]).slice(0, 23)
            let add = addBinary("1" + a[2], "0" + b[2])
            binAdd[0] = a[0]
            if (add.length > 23)
                binAdd[1] = addBinary(a[1], (add.length - 24).toString(2))
            binAdd[2] = add.slice(1, 24)
            return binAdd
        }
        if (Math.abs(Num1) > Math.abs(Num2))
            return convINumber(f(binN1, binN2))
        else{
            return convINumber(f(binN2, binN1))
        }
    }
    else {
        let f = function (a, b) {
            b[2] = ("0".repeat(del - 1) + "1" + b[2]).slice(0, 23)
            let add = Num1 > 0 ? addBinary("1" + a[2], "-0" + b[2])
                : addBinary("-1" + a[2], "0" + b[2]).slice(1)
            binAdd[0] = a[0]
            binAdd[1] = addBinary(a[1], (add.length - 24).toString(2)).padStart(8, "0")
            binAdd[2] = add.slice(1, 24)
            return binAdd
        }
        if (Math.abs(Num1) > Math.abs(Num2)) {
            return convINumber(f(binN1, binN2))
        } else {
            return convINumber(f(binN2, binN1))
        }
    }
}
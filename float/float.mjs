import fs from "fs";
import {convert} from "./convert.mjs";
import {expres} from "./Expres.mjs";

function regular(number) {
    let int = number.split(/[.e]/)[0]
    let num = number.slice(0, number.indexOf("e"))
    let shift = number.slice(number.indexOf("e") + 2) * 1 + 1
    if (number[number.indexOf("e") + 1] === "-")
        return "0." + "0".repeat(shift - 2) + num.split(".")[0] + num.split(".")[1]
    return (int + num.slice(2, shift - 1)).padEnd(shift, "0") + "." + num.slice(shift - 1)
}

switch (process.argv[2]) {
    case "convert":
        let number = fs.readFileSync(process.argv[3].toString(),"utf-8")
        if (number.indexOf("e") !== -1)//числа меньше 10^(-6) записываются в научной нотации
            number = regular(number)
        fs.writeFileSync(process.argv[4],convert(number))
        break
    case "expression":
        let s = fs.readFileSync(process.argv[3], "utf-8").replace(/ /g, "")
        let Num1,Num2
        if (Num1.indexOf("e") !== -1)//числа меньше 10^(-6) записываются в научной нотации
            Num1 = regular(Num1)
        if (Num2.indexOf("e") !== -1)//числа меньше 10^(-6) записываются в научной нотации
            Num2 = regular(Num2)
        for (let i = 1; i < s.length; i++) {
            if (isNaN(s[i]) && s[i] !== ".") {
                Num1 = s.slice(0, i) * 1
                Num2 = (s[i] + 1) * s.slice(i + 1)
                break
            }
        }
        fs.writeFileSync(process.argv[4],expres(Num1,Num2))

}


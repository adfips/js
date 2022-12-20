import fs from "fs";
import {convert} from "./convert.mjs";
import {expres} from "./Expres.mjs";

switch (process.argv[2]) {
    case "convert":
        if (isNaN(process.argv * 1)) {
            fs.writeFileSync(process.argv[4],"0 11111111 00000000000000000000001")
            break
        }
        fs.writeFileSync(process.argv[4],convert(fs.readFileSync(process.argv[3],"utf-8")))
        break
    case "expression":
        let s = fs.readFileSync(process.argv[3], "utf-8").replace(/ /g, "")
        let Num1,Num2
        for (let i = 1; i < s.length; i++) {
            if (isNaN(s[i]) && s[i] !== ".") {
                Num1 = s.slice(0, i) * 1
                Num2 = (s[i] + 1) * s.slice(i + 1)
                break
            }
        }
        fs.writeFileSync(process.argv[4],expres(Num1,Num2))

}


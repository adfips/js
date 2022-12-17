import fs from "fs";
import {convert} from "./convert.mjs";
import {add} from "./add.mjs";

switch (process.argv[2]){
    case "convert":
        fs.writeFileSync(process.argv[4],convert(fs.readFileSync(process.argv[3],"utf-8")))
        break
    case "add":
        let s = fs.readFileSync(process.argv[3], "utf-8").replace(/ /g, "")
        let Num1,Num2
        for (let i = 1; i < s.length; i++) {
            if (isNaN(s[i]) && s[i] !== ".") {
                Num1 = s.slice(0, i) * 1
                Num2 = (s[i] + 1) * s.slice(i + 1)
                break
            }
        }
        fs.writeFileSync(process.argv[4],add(Num1,Num2))

}


function CoderRLE(readfile, strCoder = "", count = 1) {
    for (let i = 0; i <= readfile.length; i++) {
        if (readfile[i] === readfile[i + 1]) {
            count += 1;
            continue
        }
        while (count>= 255){
            count -=255
            strCoder += "#" + String.fromCharCode(count) + readfile[i];
        }
        if (count >= 4 || readfile[i] === "#") {
            strCoder += "#" + String.fromCharCode(count) + readfile[i];
            count = 1;
        } else {
            while (count>0) {
                strCoder += readfile[i];
                count--
            }
            count = 1;
        }

    }
    return strCoder;
}

function deCoderRLE(strCoder, strDeCoder = "") {
    for (let i = 0; i !== strCoder.length; i++) {
        if (strCoder[i] !== "#") {
            strDeCoder += strCoder[i];
        } else {
            for (let j = 0; j !== strCoder[i + 1].charCodeAt(0); j++) {
                strDeCoder += strCoder[i + 2];
            }
            i += 2
        }
    }
    return strDeCoder;
}

fs = require('fs');
try {
    readfile = fs.readFileSync(process.argv[2], "utf8");
    a = CoderRLE(readfile)
    fs.writeFileSync(process.argv[3], a);
    fs.writeFileSync(process.argv[4], deCoderRLE(a));

} catch (e) {
    console.log(e.message);
}
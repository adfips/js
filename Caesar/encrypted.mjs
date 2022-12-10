export function code(s,alph,text){
    let strNew = "";

    for (let i = 0; i < text.length; i++) {
        if (alph.indexOf(text[i]) === -1)
            strNew+=text[i];
        else
            strNew += alph[(alph.indexOf(text[i]) + s) % 33];
    }
    return strNew
}


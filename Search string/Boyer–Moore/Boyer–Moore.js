function rpr(subStr,arr=[]) {
    let m = subStr.length;
    let T = "";
    for (let i = 0; i < m; i++) T += "*";
    T += subStr;
    for (let l = 0; l < m; l++) {
        let maxK = 0;
        for (let k = 2; k <= m - l; k++) {
            let c = 0;
            for (let j = 0; j < l; j++)
                if (T[k + j] === "*" || T[k + j] === subStr[m - l + 1 + j]) c++;
            if ((k > 1 && subStr[k - 1] !== subStr[m - l] && c === l) || (k <= 1 && c === l)) maxK = k;
        }
        arr.push(m-l+1-maxK);
    }
    return arr;
}

function BadSymbol(Str, subStr, arrFind = []) {
    let m = subStr.length;
    let N = [];
    for (let j = subStr.length-1, ind=0; j > 0 ; j--,ind++)
        N[subStr[ind]] = j;
    if (!N[subStr[m-1]]) N[subStr[m-1]] = m-1;
    for (let i = 0; i < Str.length;) {
        let l = 0;
        while (Str.slice(i + m - l - 1, i + m) === subStr.slice(m - l - 1, m) && l !== Str.length)
            l++;
        let char = Str[i+m-l-1];
        if (l === m) {
            arrFind.push(i);
            i += N[char];
        } else {
            if (N[char])
                i += N[char];
            else
                i += m;
        }
    }
    return arrFind;
}


console.log(BadSymbol("abccabcbbccabcdabcdabc","abcdabc"))


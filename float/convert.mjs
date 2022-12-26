function regular(number) {
    let int = number.split(/[.e]/)[0]
    let num = number.slice(0, number.indexOf("e"))
    let shift = number.slice(number.indexOf("e") + 2) * 1 + 1
    if (number[number.indexOf("e") + 1] === "-")
        return "0." + "0".repeat(shift - 2) + num.split(".")[0] + num.split(".")[1]
    return (int + num.slice(2, shift - 1)).padEnd(shift, "0") + "." + num.slice(shift - 1)
}
export function convert(n) {
    let number = (n).toString()//числа больше 10^20 записываются в научной нотации
    let res = "";

    if (number[0] === "-") {
        res += "1"
        number = number.slice(1,)
    } else
        res += "0"
    if (number.indexOf("e") !== -1)//числа меньше 10^(-6) записываются в научной нотации
        number = regular(number)
    if (isNaN(number * 1))
        return res + " 11111111 00000000000000000000001"

    else if (Math.abs(number * 1) > (2 - 2 ** (-23)) * 2 ** 127)
        return res + " 11111111 00000000000000000000000"

    else if (number * 1 >= 2 ** (-126)) {
        let int = (number.split(".")[0] * 1).toString(2)
        let float = number.split(".")[1] ? (("0." + number.split(".")[1]) * 1).toString(2) : ""
        let t = float.slice(1,).indexOf("1")
        let extent = (int === "0") ? (127 - t) :
            (int.length - 1 + 127)
        let mantis = (int + float.slice(2,) + "0".repeat(23)).slice(1, 24)
        extent = extent.toString(2).padStart(8, "0")
        return res + " " + extent + " " + mantis
    } else if (number * 1 >= 2 ** (-149)) {
        let float = (number * 1).toString(2)
        let mantissa = float.slice(128) + "00000000000000000000000"
        return (res + " 00000000 " + mantissa).slice(0, 34)
    } else
        return "0 00000000 00000000000000000000000"
}
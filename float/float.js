let num = Number(process.argv[2])+128
console.log("00000000".substr(num.length)+num.toString(2))
// if (Number(process.argv[2])>=-128 && process.argv[2]<=127){
//     if (num>=0) mark = "0";
//     else mark = "1";
//     order = (Math.trunc()+127).toString(2)
//     num = Math.abs(num)
//     console.log(mark,order,num.toString(2).slice(1,));
// }

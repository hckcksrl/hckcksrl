// var count = 0;
// var MultiplicativePersistence = function(num) {
//   var str = String(num);
//   var s = 1;
//   if(!(str.length===1)){
//     for(var i = 0 ; i < str.length;i++){
//       s = s * str[i];
//     }
//     count++;
//     MultiplicativePersistence(s);
//   }
//   return count;
// };
//
// console.log(MultiplicativePersistence(2312));
var primeMover = function(num){
  var k = 2;
  var s = [k];
  if(num === 1){
    return s[0];
  }else{
    for(var t = 0 ; t < num-1 ; t++){
      while( k % s[t] === 0 ){
        k++;
        t = 0;
      }
      if(!(s.includes(k))&& (t===s.length-1) ){
          s.push(k);
      }
    }
    return s[s.length-1];
  }
};

console.log(primeMover(4));

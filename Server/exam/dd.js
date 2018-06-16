var JosephusProblem = function(string) {
  // 초기값 세팅
  var input = string.split(" "); // use k, n variables
  var n = Number(input[0]);
  var k = Number(input[1]);
  var arr = [];
  var result = [];
  var index = k - 1;

  // 1 ~ n 까지 배열 만들기
  for (var i = 1; i <= n; i++) {
    arr.push(i);
  }

  // 배열의 원소가 없을 때까지 반복
  while (arr.length !== 0) {
    // 배열의 원소가 하나 남았을 때
    if (arr.length === 1) {
      result.push(Number(arr.splice(0, 1)))
    }
    // 그 외
    else {
      while (arr.length > index) {
        result.push(Number(arr.splice(index, 1)))
        index = index + (k - 1);
      }
      index = (index % arr.length);
      }
    }
  return result;
};

console.log(JosephusProblem("7 3"));

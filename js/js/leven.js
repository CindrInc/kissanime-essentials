var arr = [];
var charCodeCache = [];

var leven = function(a, b) {
	if (a === b) return 0;
	var aLen = a.length;
	var bLen = b.length;
	if (aLen === 0) return bLen;
	if (bLen === 0) return aLen;
	var bCharCode;
	var ret;
	var tmp;
	var tmp2;
	var i = 0;
	var j = 0;
	while (i < aLen) {
		charCodeCache[i] = a.charCodeAt(i);
		arr[i] = ++i;
	}
	while (j < bLen) {
		bCharCode = b.charCodeAt(j);
		tmp = j++;
		ret = j;
		for (i = 0; i < aLen; i++) {
			tmp2 = bCharCode === charCodeCache[i] ? tmp : tmp + 1;
			tmp = arr[i];
			ret = arr[i] = tmp > ret ? tmp2 > ret ? ret + 1 : tmp2 : tmp2 > tmp ? tmp + 1 : tmp2;
		}
	}
	return ret;
};

var levMinInAry = function(array, src) {
  var min = 1000;
  var len = array.length;
  for (var counter = 0; counter < len; counter++) {
    var val = array[counter];
    if (val && val.length && val.length > 0) {
      var levScore = leven(src, array[counter]);
      if (levScore < min) min = levScore;
    }
  }
  return min;
};

var levenSort = function(ary, src1, key1, src2, key2) {
  return ary.sort(function (a, b) {
    if (key1 instanceof Array) {
      var aLev = levMinInAry(key1.map(function (k) { return a[k] }), src1)
      var bLev = levMinInAry(key1.map(function (k) { return b[k] }), src1)
      return aLev - bLev
    }
    if (!key1 && !key2) return leven(src1, a) < leven(src1, b) ? -1 : 1
    if (!key2) return leven(src1, a[key1]) < leven(src1, b[key1]) ? -1 : 1
    var score = 0
    var a1 = leven(src1, a[key1])
    var b1 = leven(src1, b[key1])
    var a2 = leven(src2, a[key2])
    var b2 = leven(src2, b[key2])
    if (a1 < b1) score = score - 10
    if (a1 > b1) score = score + 10
    if (a2 < b2) score = score - 1
    if (a2 > b2) score = score + 1
    return score
  })
};

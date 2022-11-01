/**
 * 把数字或字符串转换为以 k 为单位的字符串
 */
export function hotNumber(val) {
	let num = parseInt(val);
	if (num < 1000) return val;
	num = num + '';
	return num.substring(0, num.length - 3) + 'k'
}

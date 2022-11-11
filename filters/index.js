// 1. 导入dayjs
import dayjs from 'dayjs';
// 2. dayjs 默认语言是英文，我们这里配置为中文
import 'dayjs/locale/zh-cn';
// 3. 引入 relativeTime
import rTime from 'dayjs/plugin/relativeTime';

// 4. 加载中文语言包
dayjs.locale('zh-cn');
// 5. 加载相对时间插件
dayjs.extend(rTime);

/**
 * 6. 定义过滤器，通过 dayjs().to(dayjs(val)) 方法把【当前时间】处理为【相对时间】
 */
export function relativeTime(val) {
	return dayjs().to(dayjs(val));
}

/**
 * 把数字或字符串转换为以 k 为单位的字符串
 */
export function hotNumber(val) {
	let num = parseInt(val);
	if (num < 1000) return val;
	num = num + '';
	return num.substring(0, num.length - 3) + 'k'
}

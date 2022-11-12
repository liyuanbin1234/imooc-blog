import request from '@/utils/request.js';

/**
 * 登陆接口
 */

export function login(data) {
	return request({
		url: '/sys/login',
		method: 'POST',
		data
	})
}

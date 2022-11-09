import request from '@/utils/request.js';

/**
 * 获取文章详情
 */
export function getArticleDetail(data) {
	return request({
		url: '/article/details',
		data
	})
}
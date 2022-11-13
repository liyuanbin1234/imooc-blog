import request from '@/utils/request.js';

/**
 * @param {Object} data
 * 登陆
 */
export function login(data) {
	return request({
		url: '/sys/login',
		method: 'POST',
		data
	})
}

/**
 * @param {Object} data
 * 关注用户
 */
export function userFollow(data) {
	return request({
		url: '/user/follow',
		data
	})
}

/**
 * @param {Object} data
 * 发表评论
 */
export function userArticleComment(data) {
	return request({
		url: '/user/article/comment',
		method: 'POST',
		data
	})
}

/**
 * @param {Object} data
 * 用户点赞
 */
export function userPraise(data) {
	return request({
		url: '/user/praise',
		data
	})
}

/**
 * @param {Object} data
 * 用户收藏
 */
export function userCollect(data) {
	return request({
		url: '/user/collect',
		data
	})
}

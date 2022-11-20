import request from '@/utils/request.js';


/**
 * @param {Object} data
 * 获取热播列表
 */
export function getHotVideoList(data) {
	return request({
		url: '/video/list',
		data
	})
}

/**
 * @param {Object} data
 * 获取视频弹幕
 */
export function getVideoDanmuList(data) {
	return request({
		url: '/video/danmu',
		data
	})
}

/**
 * @param {Object} data
 * 获取视频评论
 */
export function getVideoCommentList(data) {
	return request({
		url: '/video/comment/list',
		data
	})
}

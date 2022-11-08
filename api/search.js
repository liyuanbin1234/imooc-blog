import request from '@/utils/request.js';

/**
 * 搜索框placeholder
 */
export function getDefaultText() {
	return request({
		url: "/search/default-text"
	})
}

/**
 * 热搜搜索列表
 */
export function getSearchHotList() {
	return request({
		url: "/search/hot-list"
	})
}

/**
 * 获取搜索结果
 */
export function getSearchResult(data) {
	return request({
		url: '/search',
		data
	})
}
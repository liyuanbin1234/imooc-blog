const STORAGE_KEY = 'search-list';
const HISTORY_MAX = 10;
export default {
	namespaced: true,
	state: () => {
		return {
			// 搜索历史
			searchData: uni.getStorageSync(STORAGE_KEY) || []
		}
	},
	mutations: {
		// 保存数据到storage
		saveToStorage(state) {
			uni.setStorage({
				key: STORAGE_KEY,
				data: state.searchData
			})
		},
		// 添加搜索历史
		addSearchData(state, val) {
			const index = state.searchData.findIndex(item => item === val)
			if (index !== -1) {
				state.searchData.splice(index, 1)
			}
			state.searchData.unshift(val)
			if (state.searchData.length > HISTORY_MAX) {
				// state.searchData.length = HISTORY_MAX
				state.searchData.splice(HISTORY_MAX, state.searchData.length - HISTORY_MAX)
			}
			this.commit('search/saveToStorage')
		},
		// 删除指定搜索历史
		removeSearchData(state, index) {
			state.searchData.splice(index, 1)
			this.commit('search/saveToStorage')
		},
		// 删除全部搜索历史
		removeAllSearchData(state) {
			state.searchData = []
			this.commit('search/saveToStorage')
		}
	}
}

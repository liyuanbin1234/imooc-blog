export default {
	namespaced: true,
	state: () => ({
		// 视频数据
		videoData: {}
	}),
	mutations: {
		/**
		 * @param {Object} state
		 * @param {Object} videoData
		 * 保存视频数据到vuex
		 */
		setVideoData(state, videoData) {
			state.videoData = videoData
		}
	}
}

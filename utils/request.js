import store from '@/store/index.js';
// 封装网络请求
const BASE_URL = 'https://api.imooc-blog.lgdsunday.club/api';

function request({
	url,
	data,
	method
}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			data,
			method,
			header: {
				Authorization: store.state.user.token,
				icode: 'D071327B7C605120'
			},
			success: ({
				data,
				statusCode,
				header
			}) => {
				if (data.success) {
					resolve(data)
				} else {
					uni.showToast({
						title: data.message,
						icon: 'none',
						mask: true,
						duration: 3000
					})
					reject(data.message)
				}
			},
			fail: (error) => {
				reject(error)
			},
			// 完成回调：无论成功还是失败都会执行
			complete: () => {
				// 关闭加载框
				uni.hideLoading()
			}
		})
	})
}

export default request;

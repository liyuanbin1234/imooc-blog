import {
	login
} from '@/api/user.js';
const TOKEN_KEY = 'token';
const USER_INFO_KEY = 'user-info';
export default {
	namespaced: true,
	state: () => ({
		token: uni.getStorageSync(TOKEN_KEY) || '',
		userinfo: uni.getStorageSync(USER_INFO_KEY) || {}
	}),
	mutations: {
		/**
		 * @param {Object} state
		 * @param {String} token
		 * 设置token
		 */
		setToken(state, token) {
			state.token = token;
			this.commit('user/saveToToken');
		},

		/**
		 * @param {Object} state
		 * 保存token持久化
		 */
		saveToToken(state) {
			uni.setStorage({
				key: TOKEN_KEY,
				data: state.token
			})
		},

		/**
		 * @param {Object} state
		 * 删除token
		 */
		removeToken(state) {
			state.token = '';
			this.commit('user/saveToToken');
		},

		/**
		 * @param {Object} state
		 * @param {Object} userinfo
		 * 设置userinfo
		 */
		setUserinfo(state, userinfo) {
			state.userinfo = userinfo;
			this.commit('user/saveToUserinfo');
		},

		/**
		 * @param {Object} state
		 * 保存userinfo持久化
		 */
		saveToUserinfo(state) {
			uni.setStorage({
				key: USER_INFO_KEY,
				data: state.userinfo
			})
		},

		/**
		 * @param {Object} state
		 * 删除userinfo
		 */
		removeUserinfo(state) {
			state.userinfo = {};
			this.commit('user/saveToUserinfo');
		}
	},
	// actions 中执行异步操作
	actions: {
		/**
		 * @param {Object} context 上下文
		 * @param {Object} userProfile
		 * 登陆方法
		 */
		async login(context, userProfile) {
			const {
				userInfo
			} = userProfile
			const {
				data: res
			} = await login({
				signature: userProfile.signature,
				iv: userProfile.iv,
				nickName: userInfo.nickName,
				gender: userInfo.gender,
				city: userInfo.city,
				province: userInfo.province,
				avatarUrl: userInfo.avatarUrl
			})
			this.commit('user/setToken', res.token);
			this.commit('user/setUserinfo', userInfo);
		},

		/**
		 * @param {Object} context
		 * 退出登陆
		 */
		logout(context) {
			this.commit('user/removeToken');
			this.commit('user/removeUserinfo');
		},

		/**
		 * @param {Object} context
		 * 判断用户是否已经登陆
		 */
		async isLogin(context) {
			if (context.state.token) return true;
			const [error, res] = await uni.showModal({
				title: '登陆后才可以进行后续操作',
				content: '立即跳转到登陆页面？（登陆后自动返回当前页面哦～～）'
			})
			const {
				cancel,
				confirm
			} = res;
			if (confirm) {
				uni.navigateTo({
					url: '/subpkg/pages/login-page/login-page'
				})
			}
			return false;
		}
	}
}

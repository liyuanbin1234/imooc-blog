<template>
	<view class="my-container">
		<!-- 用户未登录 -->
		<block v-if="!token">
			<image class="avatar avatar-img" src="/static/images/default-avatar.png" mode="scaleToFill" />
			<view class="login-desc">登录后可同步数据</view>
			<!-- #ifdef MP-WEIXIN -->
			<button class="login-btn" type="primary" @click="getUserInfo">微信用户一键登录</button>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<button class="login-btn" type="primary" @click="onAutoLogin">一键登录</button>
			<!-- #endif -->
		</block>
		<block v-else>
			<image class="avatar avatar-img" :src="userinfo.avatarUrl" mode="scaleToFill" />
			<view class="login-desc">{{ userinfo.nickName }}</view>
			<button class="login-btn" type="default" @click="onLogoutClick">退出登陆</button>
		</block>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
	/**
	 * H5端 报错 【RangeError: Maximum call stack size exceeded】
	 * 原因：子组件名称和父组件名称相同 引发调用死循环
	 * 解决方案：修改【子组件名称||父组件名称】
	 */
	name: 'my-login-component',
	data() {
		return {};
	},
	computed: {
		...mapState('user', ['token', 'userinfo'])
	},
	methods: {
		...mapActions('user', ['login', 'logout']),

		/**
		 * 微信端 登陆按钮点击事件
		 */
		getUserInfo() {
			// 展示加载框
			uni.showLoading({
				title: '加载中',
				mask: true
			});

			uni.getUserProfile({
				desc: '登录后可同步数据',
				success: async obj => {
					await this.login(obj);
					// 用户登陆成功，发送成功回调
					this.$emit('onLoginSuccess');
				},
				fail: () => {
					uni.showToast({
						title: '登陆已取消',
						icon: 'error',
						mask: true
					});
				},
				complete: () => {
					// 隐藏加载框
					uni.hideLoading();
				}
			});
		},

		/**
		 * 退出登陆按钮点击事件
		 */
		onLogoutClick() {
			uni.showModal({
				title: '提示',
				content: '退出登陆将无法同步数据哦～～',
				showCancel: true,
				success: e => {
					if (e.confirm) {
						this.logout();
					}
				}
			});
		},

		/**
		 * 非 微信端 一键登录
		 */
		async onAutoLogin() {
			// 展示 loading
			uni.showLoading({
				title: '加载中',
				mask: true
			});

			await this.login({
				encryptedData: 'BmGEMqpGI5w',
				errMsg: 'getUserProfile:ok',
				iv: 'c+NbINO4CuEWCBYGG2FxWw==',
				rawData:
					'{"nickName":"小慕同学","gender":1,"language":"zh_CN","city":"","province":"","country":"China","avatarUrl":"https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"}',
				signature: '449a10f11998daf680fe546a5176e6e2973516ce',
				userInfo: { nickName: '小慕同学', gender: 1, language: 'zh_CN', city: '', province: '' }
			});

			// 用户登陆成功，发送成功回调
			this.$emit('onLoginSuccess');

			// 隐藏 loading
			uni.hideLoading();
		}
	}
};
</script>

<style lang="scss" scoped>
.my-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 25%;
	.avatar-img {
		width: 78px;
		height: 78px;
	}
	.login-desc {
		color: $uni-text-color-grey;
		font-size: $uni-font-size-base;
		margin-top: $uni-spacing-col-big;
	}
	.login-btn {
		margin-top: $uni-spacing-col-big;
		width: 85%;
	}
}
</style>

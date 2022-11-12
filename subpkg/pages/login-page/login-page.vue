<template>
	<my-login @onLoginSuccess="onLoginSuccess"></my-login>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		/**
		 * 登陆成功的回调函数
		 */
		onLoginSuccess() {
			uni.navigateBack({ delta: 1 });
		}
	}
};
</script>

<style lang="scss"></style>

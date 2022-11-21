<script>
export default {
	onLaunch: function() {
		// 处于 H5 端时， 打印：当前处于 H5 编译平台
		// #ifdef H5
		console.log('当前处于 H5 编译平台')
		// #endif
		
		// 处于 非H5 端时， 打印：当前处于 非H5 编译平台
		// #ifndef H5
		console.log('当前处于 非H5 编译平台')
		// #endif
	},
	onShow: function() {},
	onHide: function() {}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import '@/uni_modules/uni-scss/index.scss';
/* #ifndef APP-NVUE */
@import '@/static/customicons.css';
// 设置整个项目的背景色
page {
	background-color: #f5f5f5;
}

/* #endif */
.example-info {
	font-size: 14px;
	color: #333;
	padding: 10px;
}
</style>

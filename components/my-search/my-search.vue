<template>
	<view class="my-search-container">
		<view class="my-search-box">
			<image class="icon" src="@/static/images/search.png" mode=""></image>
			<text class="placeholder">{{placeholderText}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		props: {
			placeholderText: {
				type: String,
				default: "热搜"
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.my-search-container {
		display: flex;
		align-items: center;

		.my-search-box {
			height: 36px;
			width: 100%;
			background-color: $uni-bg-color;
			border-radius: 15px;
			border: 1px solid #c9c9c9;
			display: flex;
			align-items: center;
			padding: 0 10px;
		}

		.icon {
			width: 20px;
			height: 20px;
		}

		.placeholder {
			font-size: 12px;
			margin-left: 5px;
			color: #808080;
		}
	}
</style>

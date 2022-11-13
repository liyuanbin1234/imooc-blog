<template>
	<view class="collect-box">
		<image class="img" :src="icon" />
		<text class="txt">收藏</text>
	</view>
</template>

<script>
export default {
	name: 'article-collect',
	data() {
		return {};
	},
	props: {
		isCollect: {
			type: Boolean,
			required: true
		}
	},
	computed: {
		icon() {
			return this.isCollect ? '/static/images/collect.png' : '/static/images/un-collect.png';
		}
	}
};
</script>

<style lang="scss" scoped>
.collect-box {
	display: flex;
	flex-direction: column;
	align-items: center;

	.img {
		width: $uni-img-size-base;
		height: $uni-img-size-base;
	}

	.txt {
		font-size: $uni-font-size-sm;
		color: $uni-text-color;
	}
}
</style>

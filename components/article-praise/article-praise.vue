<template>
	<view class="praise-box">
		<image class="img" :src="icon" />
		<text class="txt">点赞</text>
	</view>
</template>

<script>
export default {
	name: 'article-praise',
	data() {
		return {};
	},
	computed: {
		icon() {
			return this.isPraise ? '/static/images/praise.png' : '/static/images/un-praise.png';
		}
	},
	props: {
		isPraise: {
			type: Boolean,
			required: true
		}
	}
};
</script>

<style lang="scss" scoped>
.praise-box {
	display: flex;
	flex-direction: column;
	align-items: center;

	.img {
		width: $uni-img-size-base;
		height: $uni-img-size-base;
		color: $uni-text-color;
	}

	.txt {
		font-size: $uni-font-size-sm;
		color: $uni-text-color;
	}
}
</style>

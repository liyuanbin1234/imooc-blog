<template>
	<view class="ranking-container">
		<image class="ranking-bg" :src="getRankingBg"></image>
		<text class="ranking-text" :class="{'color-white': ranking <= 3}">{{ranking}}</text>
	</view>
</template>

<script>
	export default {
		name: "hot-ranking",
		props: {
			ranking: {
				type: Number,
				required: true
			}
		},
		computed: {
			getRankingBg() {
				if (this.ranking <= 3) {
					return require(`@/static/images/ranking-${this.ranking}.png`)
				}
				return require('@/static/images/ranking-other.png')
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.ranking-container {
		position: relative;
		text-align: center;
		width: 18px;
		height: 20px;

		.ranking-bg {
			width: 100%;
			height: 100%;
		}

		.ranking-text {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-55%, -55%);
			font-size: 12px;
			font-weight: bold;
			color: $uni-text-color;
		}

		.color-white {
			color: white;
		}
	}
</style>

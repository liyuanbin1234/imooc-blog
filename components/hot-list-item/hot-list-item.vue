<template>
	<view class="item-container">
		<view class="item-box">
			<!-- 左侧 -->
			<view class="item-box-left">
				<!-- 排名 -->
				<hot-ranking :ranking="ranking"></hot-ranking>
			</view>
			<!-- 右侧 -->
			<view class="item-box-right">
				<view class="item-title line-clamp-2">
					{{data.title}}
				</view>
				<view class="item-desc line-clamp-2">
					{{data.desc}}
				</view>
				<view class="item-bottom-box">
					<text class="item-author">{{data.nickname}}</text>
					<view class="hot-box">
						<image class="hot-icon" src="@/static/images/hot-icon.png"></image>
						<text class="hot-text">{{data.views | hotNumber}} 热度</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "hot-list-item",
		props: {
			data: {
				type: Object,
				required: true
			},
			ranking: {
				type: Number,
				required: true
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.item-container {
		padding-bottom: 12px;

		.item-box {
			display: flex;
			margin: 0 10px;
			padding: 12px 10px;
			background-color: $uni-bg-color;
			border-radius: 6px;
			box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, 0.1);

			.item-box-left {
				margin-right: 5px;
			}

			.item-box-right {
				width: 90%;

				.item-title {
					font-size: 16px;
					font-weight: bold;
					color: $uni-text-color-title;
				}

				.item-desc {
					padding-top: 4px;
					font-size: 14px;
					color: $uni-text-color;
				}

				.item-bottom-box {
					margin-top: 4px;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.item-author {
						font-size: 12px;
						color: $uni-text-color-gray;
					}

					.hot-box {
						.hot-icon {
							width: 20px;
							height: 20px;
							vertical-align: top;
						}

						.hot-text {
							margin-left: 5px;
							font-size: 12px;
							color: $uni-text-color-hot;
						}
					}
				}
			}
		}
	}
</style>

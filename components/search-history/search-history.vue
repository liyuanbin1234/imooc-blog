<template>
	<view class="search-history-container">
		<!-- 标题 -->
		<view class="search-history-title-box">
			<view class="search-history-title">搜索历史</view>
			<view v-if="!isShowClear"><uni-icons type="trash" @click="isShowClear = true"></uni-icons></view>
			<view v-else>
				<text class="txt" @click="clearAllSearchData">全部删除</text>
				<text class="txt" @click="isShowClear = false">完成</text>
			</view>
		</view>
		<!-- 内容 -->
		<view class="search-history-box">
			<block v-for="(item, index) in searchData" :key="index">
				<view class="search-history-item" @click="onHistoryItemClick(item, index)">
					<text class="history-txt line-clamp">{{ item }}</text>
					<uni-icons type="clear" v-show="isShowClear"></uni-icons>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	name: 'search-history',
	data() {
		return {
			isShowClear: false
		};
	},
	computed: {
		...mapState('search', ['searchData'])
	},
	methods: {
		...mapMutations('search', ['removeSearchData', 'removeAllSearchData']),
		clearAllSearchData() {
			uni.showModal({
				title: '提示',
				content: '删除全部历史搜索？',
				showCancel: true,
				success: ({ confirm, cancel }) => {
					if (confirm) {
						this.isShowClear = false;
						this.removeAllSearchData();
					}
				}
			});
		},
		onHistoryItemClick(item, index) {
			if (this.isShowClear) {
				this.removeSearchData(index);
			} else {
				this.$emit('onSearch', item);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.search-history-container {
	padding: $uni-spacing-col-lg $uni-spacing-row-lg;

	.search-history-title-box {
		display: flex;
		justify-content: space-between;

		.search-history-title {
			font-size: $uni-font-size-sm;
			color: $uni-text-color;
			padding: $uni-spacing-col-sm $uni-spacing-row-sm;
		}

		.txt {
			color: $uni-text-color-grey;
			font-size: $uni-font-size-sm;
			padding: $uni-spacing-col-sm $uni-spacing-row-sm;
		}
	}

	.search-history-box {
		margin-top: $uni-spacing-col-lg;

		.search-history-item {
			width: 50%;
			box-sizing: border-box;
			display: inline-block;
			padding: $uni-spacing-col-base $uni-spacing-row-base;
			position: relative;

			.history-txt {
				width: 85%;
				display: inline-block;
				color: $uni-text-color;
				font-size: $uni-font-size-base;
			}
		}

		.search-history-item:nth-child(odd)::before {
			content: ' ';
			border-left: 1px solid #999;
			display: inline-block;
			height: 10px;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: 0;
		}
	}
}
</style>

<template>
	<view class="search-hot-list-container">
		<!-- 标题 -->
		<view class="search-hot-title">慕课热搜 - 全网技术 一网打尽</view>
		<!-- 列表 -->
		<block v-for="(item, index) in hotList" :key="index">
			<view class="hot-list-item" @click="onItemClick(item)">
				<hot-ranking :ranking="index + 1"></hot-ranking>
				<text class="title line-clamp">{{ item.label }}</text>
				<image class="search-hot-icon" src="@/static/images/hot-icon.png"></image>
			</view>
		</block>
	</view>
</template>

<script>
import { getSearchHotList } from '@/api/search.js';
export default {
	name: 'search-hot-list',
	data() {
		return {
			hotList: []
		};
	},
	created() {
		this.loadSearchHotList();
	},
	methods: {
		// 获取热搜搜索列表
		async loadSearchHotList() {
			const { data: res } = await getSearchHotList();
			this.hotList = res.list;
		},
		onItemClick(item) {
			this.$emit('onSearch', item.label);
		}
	}
};
</script>

<style lang="scss" scoped>
.search-hot-list-container {
	.search-hot-title {
		font-weight: bold;
		color: $uni-text-color-hot;
		font-size: 14px;
		padding: 0 12px 12px 12px;
		margin: 0 -12px 12px -12px;
		box-shadow: 2px 2px 5px 1px grab(143, 143, 143, 0.1);
	}

	.hot-list-item {
		display: flex;
		align-items: center;
		padding: 12px 0;

		.title {
			color: $uni-text-color;
			font-size: 12px;
			margin: 0 12px;
		}

		.search-hot-icon {
			width: 14px;
			height: 14px;
		}
	}
}
</style>

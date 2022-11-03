<template>
	<view class="search-blog-container">
		<!-- 搜索框 -->
		<view class="search-bar-box">
			<my-search :isShowInput="true" :placeholderText="defaultText" v-model="searchVal"
				:config="{backgroundColor: '#f1f0f3'}" @search="onSearchConfirm" @focus="onSearchFocus"
				@blur="onSearchBlur" @cancel="onSearchCancel" @clear="onSearchClear"></my-search>
		</view>
		<!-- 热搜列表 -->
		<view class="search-hot-list-box card" v-if="showType === SEARCH_HOT_LIST">
			<search-hot-list></search-hot-list>
		</view>
		<!-- 搜索历史 -->
		<view class="search-history-box" v-else-if="showType === SEARCH_HISTORY">
			<search-history></search-history>
		</view>
		<!-- 搜索结果 -->
		<view class="search-result-list-box" v-else>
			<search-result-list></search-result-list>
		</view>
	</view>
</template>

<script>
	import {
		getDefaultText
	} from '@/api/search.js';
	// 热搜列表
	const SEARCH_HOT_LIST = "0";
	// 搜索历史
	const SEARCH_HISTORY = "1";
	// 搜索结果
	const SEARCH_RESULT = "2";
	export default {
		data() {
			return {
				defaultText: "默认的 placeholderText",
				searchVal: "",
				// 默认情况下 || 点击输入框取消按钮，展示【热搜列表】
				SEARCH_HOT_LIST,
				// 当search bar获取焦点时 || 点击输入框清除按钮时，展示【搜索历史】
				SEARCH_HISTORY,
				// 用户点击热搜列表 item || 用户点击搜索历史 item || 用户按下搜索按钮时，展示【搜索结果】
				SEARCH_RESULT,
				showType: SEARCH_HOT_LIST
			};
		},
		created() {
			this.loadDefaultText()
		},
		methods: {
			// 搜索按钮
			onSearchConfirm(val) {
				this.searchVal = val ? val : this.defaultText
				if (this.searchVal) {
					this.showType = SEARCH_RESULT
				}
			},
			// 获取焦点
			onSearchFocus(val) {
				this.showType = SEARCH_HISTORY
			},
			// 失去焦点
			onSearchBlur(val) {},
			// 取消按钮
			onSearchCancel(val) {
				this.showType = SEARCH_HOT_LIST
			},
			// 清除按钮
			onSearchClear(val) {
				this.showType = SEARCH_HISTORY
			},
			// 获取搜索框placeholder
			async loadDefaultText() {
				const {
					data: res
				} = await getDefaultText()
				this.defaultText = res.defaultText
			}
		}
	};
</script>

<style lang="scss" scoped>
	.search-blog-container {
		.search-bar-box {
			background-color: $uni-bg-color;
			padding: 5px;
			position: sticky;
			top: 0;
			z-index: 9;
		}
	}
</style>

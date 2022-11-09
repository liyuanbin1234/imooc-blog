<template>
	<view class="search-result-list-container">
		<empty-data v-if="isEmpty"></empty-data>
		<mescroll-body v-else ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<block v-for="(item, index) in resultList" :key="index">
				<view class="search-result-item-box" @click="onItemClick(item)">
					<search-result-item-theme-1 v-if="!item.pic_list || item.pic_list.length === 0" :data="item" />
					<search-result-item-theme-2 v-else-if="item.pic_list.length === 1" :data="item" />
					<search-result-item-theme-3 v-else :data="item" />
				</view>
			</block>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'
	import {
		getSearchResult
	} from '@/api/search.js'
	export default {
		name: "search-result-list",
		mixins: [MescrollMixin],
		props: {
			queryStr: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				resultList: [],
				page: 1,
				// mescroll 初始化回执行 down 和 up 回调函数，isInit 限制 down 和 up 第一次执行；
				isInit: true,
				mescroll: null,
				// 是否展示空数据组件
				isEmpty: false
			};
		},
		mounted() {
			this.mescroll = this.$refs.mescrollRef.mescroll;
		},
		methods: {
			async mescrollInit() {
				await this.loadSearchResult();
				this.isInit = false;
				// 关闭mescroll动画
				this.mescroll.endSuccess();
			},
			async downCallback() {
				if (this.isInit) return;
				this.page = 1;
				await this.loadSearchResult();
				// 关闭mescroll动画
				this.mescroll.endSuccess();
			},
			async upCallback() {
				if (this.isInit) return;
				this.page += 1;
				await this.loadSearchResult();
				// 关闭mescroll动画
				this.mescroll.endSuccess();
			},
			async loadSearchResult() {
				const {
					data: res
				} = await getSearchResult({
					q: this.queryStr,
					p: this.page
				})
				// 搜索关键字高亮
				res.list.forEach((item, index) => {
					item.title = item.title.replace(/<em>/g, "<em style='color:#f94d2a;margin:0 2px;'>");
					
					if (item.description) {
						item.description = item.description.replace(/<em>/g,
							"<em style='color:#f94d2a;margin:0 2px;'>");
					}
				})

				if (this.page === 1) {
					// 首次加载和下拉刷新赋值
					this.resultList = res.list;
				} else {
					// 上拉加载赋值
					this.resultList = [...this.resultList, ...res.list];
				}

				// 判断是否展示空数据组件
				if (this.resultList.length === 0) {
					this.isEmpty = true;
				}
			},
			onItemClick(item) {
				uni.navigateTo({
					url: `/subpkg/pages/blog-detail/blog-detail?author=${item.author}&articleId=${item.id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-result-list-container {
		padding: $uni-spacing-col-lg $uni-spacing-row-lg;

		.search-result-item-box {
			margin-bottom: $uni-spacing-col-big;
		}
	}
</style>

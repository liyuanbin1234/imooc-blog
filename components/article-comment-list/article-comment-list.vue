<template>
	<!-- 精简评论 -->
	<view class="comment-limt-container" v-if="!showAllCommentList">
		<view class="comment-title">精简评论</view>
		<block v-for="(item, index) in commentList.slice(0, 2)" :key="index">
			<!-- item 项组件 -->
			<article-comment-item :data="item.info" />
		</block>
		<view class="show-more" @click="onMoreClick">查看更多评论</view>
	</view>
	<!-- 全部评论 -->
	<view class="comment-all-container" v-else>
		<mescroll-body
			ref="mescrollRef"
			@init="mescrollInit"
			@up="upCallback"
			:down="{ use: false }"
			:up="{ textNoMore: '-- 我也是有底线的！！ --', page: { size } }"
		>
			<view class="comment-title">全部评论</view>
			<block v-for="(item, index) in commentList" :key="index">
				<!-- item 项组件 -->
				<article-comment-item :data="item.info" />
			</block>
		</mescroll-body>
	</view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
import { getArticleCommentList } from '@/api/article.js';
export default {
	name: 'article-comment-list',
	props: {
		articleId: {
			type: String,
			required: true
		}
	},
	mixins: [MescrollMixin],
	data() {
		return {
			page: 1,
			size: 10,
			commentList: [],
			showAllCommentList: false,
			isInit: true,
			mescroll: null,
			commentListTotal: 0
		};
	},
	created() {
		this.loadArticleCommentList();
	},
	methods: {
		async mescrollInit() {
			await this.loadArticleCommentList();
			this.isInit = false;
			this.getMescroll().endSuccess(this.commentList.length, this.commentList.length < this.commentListTotal);
			// console.log(`当获取到的评论数量：${this.commentList.length}, 全部的评论数量：${this.commentListTotal}`)
			/**
			 * 正常来说这个代码会起到展示底部无更多数据提示，但是有些问题，比如共 【31】 条数据，在请求 【20】 条时就展示底部提示了
			 * this.getMescroll().endBySize(this.commentList.length, this.commentListTotal);
			 */
		},
		async upCallback() {
			if (this.isInit) return;
			this.page += 1;
			await this.loadArticleCommentList();
			this.getMescroll().endSuccess(this.commentList.length, this.commentList.length < this.commentListTotal);
			// console.log(`当获取到的评论数量：${this.commentList.length}, 全部的评论数量：${this.commentListTotal}`)
			/**
			 * 正常来说这个代码会起到展示底部无更多数据提示，但是有些问题，比如共 【31】 条数据，在请求 【20】 条时就展示底部提示了
			 * this.getMescroll().endBySize(this.commentList.length, this.commentListTotal);
			 */
		},
		getMescroll() {
			if (this.$refs.mescrollRef) {
				this.mescroll = this.$refs.mescrollRef.mescroll;
			}
			return this.mescroll;
		},
		async loadArticleCommentList() {
			const { data: res } = await getArticleCommentList({
				articleId: this.articleId,
				page: this.page,
				size: this.size
			});
			this.commentListTotal = res.count;
			if (this.page === 1) {
				this.commentList = res.list;
			} else {
				this.commentList = [...this.commentList, ...res.list];
			}
		},
		onMoreClick() {
			this.showAllCommentList = true;
		},
		/**
		 * @param {Object} data:评论项
		 * 为 commentList 增加评论项
		 */
		addCommentList(data) {
			this.commentList.unshift(data);
		}
	}
};
</script>

<style lang="scss" scoped>
.comment-title {
	font-weight: bold;
	color: $uni-text-color-title;
	font-size: $uni-font-size-lg;
	margin: $uni-spacing-col-lg 0;
}

.comment-limt-container {
	.show-more {
		margin: $uni-spacing-col-lg;
		text-align: center;
		color: $uni-text-color-more;
		font-size: $uni-font-size-base;
	}
}
</style>

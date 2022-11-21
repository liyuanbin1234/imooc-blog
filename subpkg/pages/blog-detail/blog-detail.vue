<template>
	<!-- #ifndef H5 -->
	<page-meta root-font-size="52px">
	<!-- #endif -->
		<view class="detail-container">
			<!-- 文章内容区域 -->
			<block v-if="articleData">
				<!-- 标题 -->
				<view class="title">{{ articleData.articleTitle }}</view>
				<view class="detail-info">
					<view class="detail-left">
						<view class="avatar-box">
							<!-- 头像 -->
							<image class="avatar" :src="articleData.avatar"></image>
						</view>
						<view class="author-box">
							<!-- 作者 -->
							<text class="author">{{ articleData.nickName }}</text>
							<!-- 发布时间 -->
							<rich-text :nodes="articleData.date" class="release-time"></rich-text>
							<!-- <text class="release-time">{{ articleData.date }}</text> -->
						</view>
					</view>
					<view class="detail-right">
						<!-- 关注按钮 -->
						<button
							class="follow"
							size="mini"
							:loading="isFollowLoading"
							:type="articleData.isFollow ? 'primary' : 'default'"
							@click="onFollowClick"
						>
							关注
						</button>
					</view>
				</view>
				<!-- 文章内容 -->
				<!-- 不需要引入，可直接使用 -->
				<mp-html class="markdown_views" :content="addClassFromHTML(articleData.content)" scroll-table />
				<!-- 文章评论 -->
				<view class="comment-box">
					<article-comment-list ref="mescrollItem" :articleId="articleId"></article-comment-list>
				</view>
			</block>
			<!-- 底部功能 -->
			<block v-if="articleData">
				<article-operate
					@commentClick="onComment"
					:articleData="articleData"
					@praiseChange="onPraiseChange"
					@collectChange="onCollectChange"
				></article-operate>
			</block>
			<!-- 底部弹出框 -->
			<uni-popup ref="popup" type="bottom" @change="onCommentPopupChange">
				<article-comment-commit
					v-if="isShowComment"
					:articleId="articleId"
					@success="onCommentSuccess"
				></article-comment-commit>
			</uni-popup>
		</view>
	<!-- #ifndef H5 -->
	</page-meta>
	<!-- #endif -->
</template>

<script>
import MescrollCompMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js';
import { getArticleDetail } from '@/api/article.js';
import { mapActions } from 'vuex';
import { userFollow } from '@/api/user.js';
export default {
	data() {
		return {
			author: '',
			articleId: '',
			articleData: null,
			isFollowLoading: false,
			isShowComment: false
		};
	},
	mixins: [MescrollCompMixin],
	onLoad(options) {
		this.author = options.author;
		this.articleId = options.articleId;
		this.loadArticleDetail();
	},
	methods: {
		...mapActions('user', ['isLogin']),
		addClassFromHTML(info) {
			return info
				.replace(/<p>/gi, '<p class="p-cls">')
				.replace(/<a>/gi, '<a class="a-cls">')
				.replace(/<h1>/gi, '<h1 class="h1-cls">')
				.replace(/<h2>/gi, '<h2 class="h2-cls">')
				.replace(/<h3>/gi, '<h3 class="h3-cls">')
				.replace(/<h4>/gi, '<h4 class="h4-cls">')
				.replace(/<h5>/gi, '<h5 class="h5-cls">')
				.replace(/<h6>/gi, '<h6 class="h6-cls">')
				.replace(/<ul>/gi, '<ul class="ul-cls">')
				.replace(/<li>/gi, '<li class="li-cls">')
				.replace(/<ol>/gi, '<ol class="ol-cls">')
				.replace(/<td>/gi, '<td class="td-cls">')
				.replace(/<th>/gi, '<th class="th-cls">')
				.replace(/<tr>/gi, '<tr class="tr-cls">')
				.replace(/<dl>/gi, '<dl class="dl-cls">')
				.replace(/<dd>/gi, '<dd class="dd-cls">')
				.replace(/<hr>/gi, '<hr class="hr-cls">')
				.replace(/<pre>/gi, '<pre class="pre-cls">')
				.replace(/<strong>/gi, '<strong class="strong-cls">')
				.replace(/<input>/gi, '<input class="input-cls">')
				.replace(/<table>/gi, '<table class="table-cls">')
				.replace(/<details>/gi, '<details class="details-cls">')
				.replace(/<code>/gi, '<code class="code-cls">')
				.replace(/<kbd>/gi, '<kbd class="kbd-cls">')
				.replace(/<summary>/gi, '<summary class="summary-cls">')
				.replace(/<blockquote>/gi, '<blockquote class="blockquote-cls">')
				.replace(/<img/gi, '<img class="img-cls"');
		},
		async loadArticleDetail() {
			uni.showLoading({
				title: '加载中'
			});
			const { data: res } = await getArticleDetail({
				author: this.author,
				articleId: this.articleId
			});
			this.articleData = res.data;
		},
		async onFollowClick() {
			const isLogin = await this.isLogin();
			if (!isLogin) return;

			this.isFollowLoading = true;
			await userFollow({
				author: this.author,
				isFollow: !this.articleData.isFollow
			});
			this.articleData.isFollow = !this.articleData.isFollow;
			this.isFollowLoading = false;
		},
		onComment() {
			this.$refs.popup.open();
		},
		onCommentPopupChange(e) {
			if (e.show) {
				this.isShowComment = e.show;
			} else {
				setTimeout(() => {
					this.isShowComment = e.show;
				}, 200);
			}
		},
		onCommentSuccess(data) {
			this.$refs.popup.close();
			this.$refs.mescrollItem.addCommentList(data);
		},
		onPraiseChange(isPraise) {
			this.articleData.isPraise = isPraise;
		},
		onCollectChange(isCollect) {
			this.articleData.isCollect = isCollect;
		}
	}
};
</script>

<style lang="scss">

.detail-container {
	padding: $uni-spacing-col-base $uni-spacing-row-base;
	padding-bottom: 88px;

	.title {
		font-size: $uni-font-size-title;
		color: $uni-text-color-title;
		font-weight: bold;
	}

	.detail-info {
		padding: $uni-spacing-col-base 0;
		display: flex;
		justify-content: space-between;

		.detail-left {
			display: flex;

			.author-box {
				margin-left: $uni-spacing-row-base;
				display: flex;
				flex-direction: column;

				.author {
					font-size: $uni-font-size-base;
					font-weight: bolder;
					color: $uni-color-title;
				}

				.release-time {
					font-size: $uni-font-size-sm;
					color: $uni-text-color-grey;
				}
			}
		}

		.detail-right {
			display: flex;
			align-items: center;
		}
	}
}
</style>

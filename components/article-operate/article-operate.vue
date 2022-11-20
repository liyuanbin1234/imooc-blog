<template>
	<view class="operate-container">
		<!-- 输入框 -->
		<view class="comment-box" @click="onCommentClick">
			<my-search
				:placeholderText="placeholder"
				:config="{
					height: 28,
					backgroundColor: '#eeedf4',
					icon: '/static/images/input-icon.png',
					textColor: '#a6a5ab',
					border: 'none'
				}"
			></my-search>
		</view>
		<!-- 点赞 -->
		<view class="options-box" @click="onPraiseClick"><article-praise :isPraise="articleData.isPraise" /></view>
		<!-- 收藏 -->
		<view class="options-box" @click="onCollectClick"><article-collect :isCollect="articleData.isCollect" /></view>
	</view>
</template>

<script>
import { mapActions } from 'vuex';
import { userPraise, userCollect } from '@/api/user.js';
export default {
	name: 'article-operate',
	data() {
		return {};
	},
	props: {
		articleData: {
			type: Object,
			required: true
		},
		placeholder: {
			type: String,
			default: '评论一句，前排打call...'
		},
		paremtModel: {
			type: String
		}
	},
	methods: {
		...mapActions('user', ['isLogin']),

		/**
		 * 输入框点击事件
		 */
		async onCommentClick() {
			const login = await this.isLogin();
			if (!login) return;
			this.$emit('commentClick');
		},

		/**
		 * 点赞按钮点击事件
		 */
		async onPraiseClick() {
			const login = await this.isLogin();
			if (!login) return;
			// video 的 点赞
			if (this.paremtModel === 'video') {
				this.$emit('praiseChange', !this.articleData.isPraise);
				return;
			}
			// --
			uni.showLoading({
				title: '加载中'
			});
			await userPraise({
				articleId: this.articleData.articleId,
				isPraise: !this.articleData.isPraise
			});
			this.$emit('praiseChange', !this.articleData.isPraise);
		},

		/**
		 * 收藏按钮点击事件
		 */
		async onCollectClick() {
			const login = await this.isLogin();
			if (!login) return;
			// video 的收藏
			if (this.paremtModel === 'video') {
				this.$emit('collectChange', !this.articleData.isCollect);
				return;
			}
			// --
			uni.showLoading({
				title: '加载中'
			});
			await userCollect({
				articleId: this.articleData.articleId,
				isCollect: !this.articleData.isCollect
			});
			this.$emit('collectChange', !this.articleData.isCollect);
		}
	}
};
</script>

<style lang="scss" scoped>
.operate-container {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: $uni-bg-color;
	padding: 4px 6px 32px 6px;
	display: flex;
	border-top: 1px solid $uni-bg-color-grey;
	align-items: center;

	.comment-box {
		flex-grow: 2;
	}

	.options-box {
		flex-grow: 1;
	}
}
</style>

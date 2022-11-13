<template>
	<view class="comment-container" :style="{ bottom: bottom + 'px' }">
		<uni-easyinput
			v-model="value"
			type="textarea"
			placeholder="说点什么..."
			:maxlength="50"
			:inputBorder="false"
		></uni-easyinput>
		<button class="commit" type="primary" :disabled="!value" size="mini" @click="onBtnClick">发送</button>
	</view>
</template>

<script>
import { userArticleComment } from '@/api/user.js';
export default {
	name: 'article-comment-commit',
	data() {
		return {
			value: '',
			bottom: 0
		};
	},
	props: {
		articleId: {
			type: String,
			required: true
		}
	},
	created() {
		uni.onKeyboardHeightChange(res => {
			this.bottom = res.height;
		});
	},
	methods: {
		/**
		 * 发送按钮点击事件
		 */
		async onBtnClick() {
			uni.showLoading({
				title: '加载中'
			});
			const { data: res } = await userArticleComment({
				articleId: this.articleId,
				content: this.value
			});
			uni.showToast({
				title: '发表成功',
				icon: 'success',
				mask: true
			});
			this.$emit('success', res);
		}
	}
};
</script>

<style lang="scss" scoped>
.comment-container {
	background-color: $uni-bg-color;
	text-align: right;
	padding: $uni-spacing-row-base;
	position: relative;
}
</style>

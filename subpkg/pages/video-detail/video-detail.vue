<template>
	<view class="video-detail-container">
		<view class="video-box">
			<video
				id="myVideo"
				class="video"
				:danmu-list="danmuList"
				:src="videoData.play_url"
				enable-danmu
				danmu-btn
				controls
			/>
		</view>
		<hot-video-info :data="videoData" />
		<!-- 弹幕模块 -->
		<view class="danmu-box">
			<!-- 弹幕列表 -->
			<view class="comment-container">
				<view class="all-comment-title">全部弹幕</view>
				<uni-load-more status="loading" v-if="isLoadingComment"></uni-load-more>
				<empty-data v-else-if="danmuList.length === 0"></empty-data>
				<view class="list" v-else>
					<!-- 1.导入 mescroll-body -->
					<!-- auto  是否在初始化完毕之后自动执行一次回调函数 callback -->
					<mescroll-body
						ref="mescrollRef"
						@init="mescrollInit"
						@down="downCallback"
						:down="{ auto: false }"
						@up="upCallback"
						:up="{ auto: false, textNoMore: '-- 我也是有底线的！！ --', page: { size } }"
					>
						<block v-for="(item, index) in commentList" :key="index"><article-comment-item :data="item" /></block>
					</mescroll-body>
				</view>
			</view>
		</view>
		<!-- 底部功能 -->
		<article-operate
			@commentClick="onCommit"
			placeholder="发个评论，开心一下..."
			:articleData="videoData"
			@praiseChange="onPraiseChange"
			@collectChange="onCollectChange"
			:paremtModel="'video'"
		></article-operate>
		<uni-popup ref="popup" type="bottom" @change="onCommentPopupChange">
			<article-comment-commit
				v-if="isShowCommit"
				:articleId="videoData.id"
				@success="onSendDanmu"
			></article-comment-commit>
		</uni-popup>
	</view>
</template>

<script>
// 2.导入mixins
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
import { getVideoDanmuList, getVideoCommentList } from '@/api/video.js';
import { getRandomColor } from '@/utils/index.js';
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			danmuList: [],
			commentList: [],
			page: 1,
			size: 10,
			mescroll: null,
			hasNextPage: true,
			isShowCommit: false,
			isLoadingComment: true
		};
	},
	// 3.注册mixins
	mixins: [MescrollMixin],
	computed: {
		...mapState('video', ['videoData'])
	},
	created() {
		this.loadVideoDanmuList();
		console.log(this.videoData);
	},
	onReady: function(res) {
		// #ifndef MP-ALIPAY
		this.videoContext = uni.createVideoContext('myVideo');
		// #endif
	},
	methods: {
		...mapMutations('video', ['setVideoData']),
		/**
		 * 获取视频弹幕
		 */
		async loadVideoDanmuList() {
			const { data: res } = await getVideoDanmuList({
				videoId: this.videoData.id
			});
			this.danmuList = res.list;
			this.danmuList.forEach(item => {
				item.color = getRandomColor();
			});
			this.isLoadingComment = false;
		},

		/**
		 * 获取视频评论
		 */
		async loadVideoCommentList() {
			const { data: res } = await getVideoCommentList({
				videoId: this.videoData.id,
				page: this.page,
				size: this.size
			});
			if (this.page === 1) {
				this.commentList = res.list;
			} else {
				this.commentList = [...this.commentList, ...res.list];
			}
			if (res.list.length < this.size) {
				this.hasNextPage = false;
			}
		},

		/**
		 * 获取 mescroll 实例
		 */
		getMescroll() {
			if (this.$refs.mescrollRef) {
				this.mescroll = this.$refs.mescrollRef.mescroll;
			}
			return this.mescroll;
		},

		/**
		 * mescroll初始化
		 */
		async mescrollInit() {
			await this.loadVideoCommentList();
			this.getMescroll().endSuccess(this.commentList.length, this.hasNextPage);
		},

		/**
		 * 下拉刷新的回调函数
		 */
		async downCallback() {
			console.log('下拉刷新');
			this.page = 1;
			await this.loadVideoCommentList();
			this.getMescroll().endSuccess(this.commentList.length, this.hasNextPage);
		},

		/**
		 * 上拉加载的回调函数
		 */
		async upCallback() {
			console.log('上拉加载');
			this.page += 1;
			await this.loadVideoCommentList();
			this.getMescroll().endSuccess(this.commentList.length, this.hasNextPage);
		},

		/**
		 * 输入框点击事件
		 */
		onCommit() {
			this.$refs.popup.open();
		},

		/**
		 * @param {Object} e
		 * popup 切换事件
		 */
		onCommentPopupChange(e) {
			if (e.show) {
				this.isShowCommit = e.show;
			} else {
				setTimeout(() => {
					this.isShowCommit = e.show;
				}, 200);
			}
		},

		/**
		 * @param {Object} data
		 * 弹幕发送成功后的回调函数
		 */
		onSendDanmu(data) {
			this.videoContext.sendDanmu({
				text: data.info.content,
				color: getRandomColor()
			});
			this.commentList.unshift(data.info);
			this.$refs.popup.close();
			this.isShowCommit = false;
		},

		onPraiseChange(isPraise) {
			this.setVideoData({ ...this.videoData, isPraise });
		},
		onCollectChange(isCollect) {
			this.setVideoData({ ...this.videoData, isCollect });
		}
	}
};
</script>

<style lang="scss" scoped>
.video-detail-container {
	.video-box {
		background-color: $uni-bg-color;
		position: sticky;
		top: 0;
		z-index: 9;
		.video {
			width: 100%;
			height: 230px;
		}
	}
	.danmu-box {
		border-top: $uni-spacing-col-sm solid $uni-bg-color-grey;
		margin-bottom: 36px;
		.comment-container {
			padding: $uni-spacing-col-lg $uni-spacing-row-lg;
			.all-comment-title {
				font-size: $uni-font-size-lg;
				font-weight: bold;
			}
			.list {
				margin-bottom: 60px;
				box-sizing: border-box;
			}
		}
	}
}
</style>

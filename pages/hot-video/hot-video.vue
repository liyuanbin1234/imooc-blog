<template>
	<view class="hot-video-container">
		<!-- 1.导入 mescroll-body -->
		<!-- auto  是否在初始化完毕之后自动执行一次回调函数 callback -->
		<mescroll-body
			ref="mescrollRef"
			@init="mescrollInit"
			@down="downCallback"
			:down="{ auto: false }"
			@up="upCallback"
			:up="{ auto: false }"
		>
			<block v-for="(item, index) in videoList" :key="index">
				<hot-video-item :data="item" @click="onItemClick"></hot-video-item>
			</block>
		</mescroll-body>
	</view>
</template>

<script>
// 2. 导入 mixin
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
import { getHotVideoList } from '@/api/video.js';
import { mapMutations } from 'vuex';
export default {
	data() {
		return {
			videoList: [],
			page: 1,
			size: 10,
			// mescroll实例
			mescroll: null
		};
	},
	// 注册mixins
	mixins: [MescrollMixin],
	created() {
		uni.showModal({
			title: '提示',
			content: '因浏览器对视频解析问题，具体呈现效果可能会存在差异！'
		});
	},
	mounted() {
		this.mescroll = this.$refs.mescrollRef.mescroll;
	},
	methods: {
		...mapMutations('video', ['setVideoData']),

		/**
		 * 获取热播列表数据
		 */
		async loadHotVideoList() {
			const { data: res } = await getHotVideoList({
				page: this.page,
				size: this.size
			});
			if (this.page === 1) {
				this.videoList = res.list;
			} else {
				this.videoList = [...this.videoList, ...res.list];
			}
		},

		/**
		 * mescroll初始化
		 */
		async mescrollInit() {
			await this.loadHotVideoList();
			this.mescroll.endSuccess();
		},

		/**
		 * 下拉刷新的回调函数
		 */
		async downCallback() {
			console.log('下拉刷新');
			this.page = 1;
			await this.loadHotVideoList();
			this.mescroll.endSuccess();
		},

		/**
		 * 上拉加载的回调函数
		 */
		async upCallback() {
			console.log('上拉加载');
			this.page += 1;
			await this.loadHotVideoList();
			this.mescroll.endSuccess();
		},

		/**
		 * item 点击事件
		 */
		onItemClick(data) {
			data.isPraise = false;
			data.isCollect = false;
			this.setVideoData(data);
			uni.navigateTo({
				url: '/subpkg/pages/video-detail/video-detail'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.hot-video-container {
	background-color: $uni-bg-color-grey;
}
</style>

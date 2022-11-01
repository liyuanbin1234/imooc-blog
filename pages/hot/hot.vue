<template>
	<view class="hot-container">
		<image class="logo" src="@/static/images/logo.png" mode="aspectFit"></image>
		<view class="search-box">
			<my-search placeholderText="uni-app 自定义组件"></my-search>
		</view>
		<view class="tab-sticky">
			<my-tabs :tabsData="tabsData" :defaultIndex="currentIndex" @tabClick="onTabClick"></my-tabs>
		</view>
		<!-- list -->
		<swiper 
			class="swiper" 
			:current="currentIndex" 
			:style="{height: currentSwiperHeight + 'px'}"
			@animationfinish="onSwiperEnd" 
			@change="onSwiperChange">
			<swiper-item class="swiper-item" v-for="(tabItem, tabIndex) in tabsData" :key="tabIndex">
				<view>
					<uni-load-more status="loading" v-if="isLoading"></uni-load-more>
					<block v-else>
						<hot-list-item v-for="(item, index) in listData[tabIndex]" :key="index" :data="item"
							:ranking="index+1" :class="'hot-list-item-' + tabIndex"></hot-list-item>
					</block>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		getHotTabs,
		getHotListFromTabType
	} from '@/api/hot.js'
	export default {
		data() {
			return {
				tabsData: [],
				currentIndex: 0,
				listData: {},
				isLoading: true,
				currentSwiperHeight: 0,
				swiperHeightData: {},
				currentPageScrollTop: 0
			};
		},
		created() {
			this.loadHotTabs()
		},
		onPageScroll(res) {
			this.currentPageScrollTop = res.scrollTop;
		},
		methods: {
			async loadHotTabs() {
				const res = await getHotTabs()
				this.tabsData = res.data.list;
				this.loadHotListFromTab()
			},
			onTabClick(index) {
				this.currentIndex = index;
				// this.loadHotListFromTab()
			},
			async loadHotListFromTab() {
				if (!this.listData[this.currentIndex]) {
					this.isLoading = true;
					const res = await getHotListFromTabType(this.tabsData[this.currentIndex].id)
					this.listData[this.currentIndex] = res.data.list;
					this.isLoading = false;

					setTimeout(async () => {
						this.currentSwiperHeight = await this.getCurrentSwiperHeight()
						this.swiperHeightData[this.currentIndex] = this.currentSwiperHeight;
					}, 0)
				}
			},
			getCurrentSwiperHeight() {
				return new Promise((resolve, reject) => {
					let sum = 0;
					const query = uni.createSelectorQuery().in(this)
					query
						.selectAll('.hot-list-item-' + this.currentIndex)
						.boundingClientRect(res => {
							res.forEach(item => {
								sum += item.height;
							})
							resolve(sum)
						})
						.exec()
				})
			},
			onSwiperEnd() {
				if (!this.listData[this.currentIndex]) {
					this.loadHotListFromTab()
					return;
				}
				this.currentSwiperHeight = this.swiperHeightData[this.currentIndex];
			},
			onSwiperChange(e) {
				if (this.currentPageScrollTop > 130) {
					uni.pageScrollTo({
						scrollTop: 130
					})
				}
				this.currentIndex = e.detail.current;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hot-container {
		background-color: $uni-bg-color;

		.logo {
			width: 100%;
			height: 80px;
		}

		.search-box {
			padding: 0 16px;
			margin-bottom: 8px;
		}

		.tab-sticky {
			position: sticky;
			z-index: 99;
			top: 0;
		}
	}
</style>

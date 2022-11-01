<template>
	<!-- 
	my-tabs：
		1.可以在父组件定制样式
		2.可以在父组件定制数据
		3.可以在父组件指定选中项
	 -->
	<view class="tab-container">
		<view class="tab-box">
			<scroll-view class="scroll-view" scroll-x scroll-with-animation :scroll-left="scrollLeft">
				<view class="scroll-content">
					<view class="tab-item-box">
						<block v-for="(item, index) in tabsData" :key="index">
							<view :id="'_tab_'+index" class="tab-item"
								:class="{ 'tab-item-active': activeIndex === index }" @click="tabItemClick(index)"
								:style="{
									color: activeIndex === index ? defaultConfig.activeTextColor : defaultConfig.textColor
								}">
								{{item.label || item}}
							</view>
						</block>
					</view>
					<!-- 滑块 -->
					<view class="underLine" :style="{
						transform: 'translateX('+ slider.left +'px)',
						width: defaultConfig.underLineWidth+'px',
						height: defaultConfig.underLineHeight+'px',
						backgroundColor: defaultConfig.underLineColor
					}">
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-tabs",
		props: {
			// 配置对象
			config: {
				type: Object,
				default: () => {
					return {}
				}
			},
			// 可以在父组件定制数据
			tabsData: {
				type: Array,
				default: () => {
					return []
				}
			},
			// 可以在父组件指定选中项
			defaultIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				tabList: [],
				activeIndex: -1,
				defaultConfig: {
					// 字体颜色
					textColor: '#333333',
					// 选中字体颜色
					activeTextColor: '#f94d2a',
					// 滑块的宽度
					underLineWidth: 24,
					// 滑块的高度
					underLineHeight: 2,
					// 滑块的颜色
					underLineColor: '#f94d2a'
				},
				slider: {
					left: 0
				},
				scrollLeft: 0
			};
		},
		watch: {
			config: {
				handler(val) {
					this.defaultConfig = {
						...this.defaultConfig,
						...this.config
					}
				},
				immediate: true
			},
			tabsData: {
				handler(val) {
					this.tabList = val
					// setTimeout 异步更新队列，确保计算 滑块 left 时，dom已经渲染完毕
					setTimeout(() => {
						this.updateTabWidth()
					}, 0)
				},
				immediate: true
			},
			defaultIndex: {
				handler(val) {
					this.activeIndex = val
					this.tabToIndex()
				},
				immediate: true
			}
		},
		methods: {
			updateTabWidth() {
				let data = this.tabList
				if (data.length === 0) return;
				// uniapp 中获取 dom 的固定方法 uni.createSelectorQuery().in(this)
				const query = uni.createSelectorQuery().in(this);
				data.forEach((item, index) => {
					query
						.select('#_tab_' + index)
						.boundingClientRect((res) => {
							// res 是获取到的 dom
							item._slider = {
								// 滑块 的位置：当前选中 dom 的 left + （当前选中 dom 的宽度 - 滑块的宽度）/ 2
								left: res.left + (res.width - this.defaultConfig.underLineWidth) / 2
							}
							// 计算完毕后 调用一次 tabToIndex 获取 滑块 的位置
							if (index === data.length - 1) {
								this.tabToIndex()
							}
						})
						.exec();
				})
			},
			tabItemClick(index) {
				this.activeIndex = index
				this.tabToIndex()
				this.$emit('tabClick', index)
			},
			tabToIndex() {
				if (this.tabsData.length === 0) return;
				const index = this.activeIndex;
				this.slider.left = this.tabList[index]._slider.left;
				this.scrollLeft = this.activeIndex * this.defaultConfig.underLineWidth;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tab-container {
		font-size: 14px;
		height: 45px;
		line-height: 45px;
		background-color: $uni-bg-color;

		.tab-box {
			width: 100%;
			height: 45px;
			display: flex;
			position: relative;

			.scroll-view {
				white-space: nowrap;
				width: 100%;
				height: 100%;
				box-sizing: border-box;

				.scroll-content {
					width: 100%;
					height: 100%;
					position: relative;

					.tab-item-box {
						height: 100%;

						.tab-item {
							height: 100%;
							display: inline-block;
							text-align: center;
							padding: 0 15px;
							position: relative;
							color: #333;

							&-active {
								color: $uni-text-color-hot;
							}
						}
					}

					.underLine {
						border-radius: 3px;
						transition: .5s;
						position: absolute;
						bottom: 0;
					}
				}
			}
		}
	}
</style>

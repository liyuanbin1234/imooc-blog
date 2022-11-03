<template>
	<view class="my-search-container">
		<uni-search-bar class="my-search-bar" v-if="isShowInput" :radius="100" :placeholder="placeholderText"
			:bgColor="config.backgroundColor" :value="value" @confirm="onSearch" @focus="onFocus" @blur="onBlur"
			@cancel="onCancel" @input="onInput" @clear="onClear">
			<uni-icons slot="clearIcon" type="clear" color="#999999"></uni-icons>
		</uni-search-bar>
		<view class="my-search-box" v-else>
			<image class="icon" src="@/static/images/search.png" mode=""></image>
			<text class="placeholder">{{placeholderText}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		props: {
			isShowInput: {
				type: Boolean,
				default: false
			},
			value: {
				type: String
			},
			config: {
				type: Object,
				default: () => ({
					backgroundColor: "#ffffff",
					textColor: "#454545",
					height: 36,
					icon: "/static/images/search.png",
					border: "1px solid #c9c9c9"
				})
			},
			placeholderText: {
				type: String,
				default: "热搜"
			}
		},
		data() {
			return {

			};
		},
		methods: {
			// 点击搜索按钮
			onSearch() {
				this.$emit('search', this.value)
			},
			// 搜索框获取焦点
			onFocus() {
				this.$emit('focus', this.value)
			},
			// 输入框失去焦点
			onBlur() {
				this.$emit('blur', this.value)
			},
			// 点击取消按钮
			onCancel() {
				this.$emit('cancel', this.value)
			},
			// value值改变
			onInput(val) {
				/**
				 * v-model 是 vue 中双向数据绑定的指令，如果想应用到组件的绑定中，需要遵守以下规则： 
					 1.子组件中接收的值必须以 value 命名
					 2.子组件想要修改时,必须发送一个叫做 input 的事件
				 * */
				this.$emit('input', val)
			},
			// 点击清除按钮
			onClear() {
				this.$emit('clear', this.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-search-container {
		display: flex;
		align-items: center;

		.my-search-bar {
			width: 100%;
		}

		.my-search-box {
			height: 36px;
			width: 100%;
			background-color: $uni-bg-color;
			border-radius: 15px;
			border: 1px solid #c9c9c9;
			display: flex;
			align-items: center;
			padding: 0 10px;
		}

		.icon {
			width: 20px;
			height: 20px;
		}

		.placeholder {
			font-size: 12px;
			margin-left: 5px;
			color: #808080;
		}
	}
</style>

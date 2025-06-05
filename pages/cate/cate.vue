<template>
  <view>
    <view class="scroll-view-container">
      <!-- 左侧滑动栏 -->
      <scroll-view class="left-scroll-view" scroll-y="true" :style="{ height: wh + 'px' }">
        <block v-for="(item, index) in cateList" :key="index">
          <view :class="['left-scroll-view-item', index === active ? 'active' : '']" @click="activeChanged(index)">
            {{ item.cat_name }}
          </view>
        </block>
      </scroll-view>
      <!-- 右侧滑动栏 -->
      <scroll-view class="right-scroll-view" scroll-y="true" :style="{ height: wh + 'px' }">
        <view>YYY</view>
        <view>YYY</view>
        <view>YYY</view>
        <view>YYY</view>
        <view>YYY</view>
        <view>YYY</view>
        <view>YYY</view>
        <view>YYY</view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 当前屏幕的可用窗口高度
      wh: 0,
      // 当前选中的左侧滑动栏索引
      active: 0,
      // 左侧滑动栏数据
      cateList: []
    };
  },
  onLoad() {
    const sysInfo = uni.getSystemInfoSync();

    this.wh = sysInfo.windowHeight;

    this.getCateList();
  },
  methods: {
    async getCateList() {
      const { data: res } = await uni.$http.get('/api/public/v1/categories');
      if (res.meta.status !== 200) return uni.$showMsg();

      this.cateList = res.message;
    },
    activeChanged(index) {
      this.active = index;
    }
  }
};
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 120px;

    .left-scroll-view-item {
      background-color: #f7f7f7;
      line-height: 60px;
      text-align: center;
      font-size: 12px;

      &.active {
        background-color: #ffffff;
        position: relative;

        &::before {
          content: ' ';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>

<template>
  <view>
    <view class="scroll-view-container">
      <!-- 左侧滑动栏 -->
      <scroll-view class="left-scroll-view" scroll-y="true">
        <view>XXX</view>
      </scroll-view>
      <!-- 右侧滑动栏 -->
      <scroll-view class="right-scroll-view" scroll-y="true">
        <view>YYY</view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 120px;
  }
}
</style>

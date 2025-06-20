<template>
  <view class="my-userinfo-container">
    <!-- 头像和昵称区域 -->
    <view class="top-box">
      <image src="" class="avatar"></image>
      <view class="nickname"> xxx </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'my-userinfo',
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.my-userinfo-container {
  height: 100%;
  background-color: #f4f4f4;

  .top-box {
    height: 400rpx;
    background-color: #c00000;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .avtar {
      width: 90px;
      height: 90px;
      border-radius: 45px;
      border: 2px solid #fff;
      box-shadow: 0 1px 5px black;
    }
  }
}
</style>

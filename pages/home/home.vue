<template>
  <view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <image :src="item.image_src" mode=""></image>
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, index) in navList" :key="index" @click="navClickHandler(item)">
        <image :src="item.image_src" mode="" class="nav-img"></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 轮播表数据数组
      swiperList: [],
      // 分类导航栏数据
      navList: []
    };
  },
  onLoad() {
    this.getSwiperList();
    this.getNavList();
  },
  methods: {
    async getSwiperList() {
      const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata');
      // 请求失败
      if (res.meta.status !== 200) {
        return uni.$showMsg;
      }

      this.swiperList = res.message;
      // uni.$showMsg('成功获得数据');
    },
    async getNavList() {
      const { data: res } = await uni.$http.get('/api/public/v1/home/catitems');
      // 请求失败
      if (res.meta.status !== 200) {
        return uni.$showMsg;
      }

      this.navList = res.message;
    },
    navClickHandler(item) {
      if (item.name === '分类') {
        uni.switchTab({
          url: '/pages/cate/cate'
        });
      }
    }
  }
};
</script>

<style lang="scss">
swiper {
  height: 330rpx;

  .swiper-item,
  image {
    width: 100%;
    height: 100%;
  }
}

.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;

  .nav-img {
    width: 120rpx;
    height: 140rpx;
  }
}
</style>

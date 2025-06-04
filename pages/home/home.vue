<template>
  <!-- 轮播图区域 -->
  <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
    <swiper-item v-for="(item, index) in swiperList" :key="index">
      <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
        <image :src="item.image_src" mode=""></image>
      </navigator>
    </swiper-item>
  </swiper>
</template>

<script>
export default {
  data() {
    return {
      // 轮播表数据数组
      swiperList: []
    };
  },
  onLoad() {
    this.getSwiperList();
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
</style>

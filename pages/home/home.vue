<template>
  <view>
    <!-- 搜索栏，吸顶 -->
    <view class="search-box">
      <my-search @click="gotoSearch"></my-search>
    </view>

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

    <!-- 楼层区域 -->
    <!-- 楼层的容器 -->
    <view class="floor-list">
      <!-- 每一个楼层的 item 项 -->
      <view class="floor-item" v-for="(item, index) in floorList" :key="index">
        <!-- 楼层的标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层的图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{ width: item.product_list[0].image_width + 'rpx' }" mode="widthFix"></image>
          </navigator>
          <!-- 右侧4个小图片的盒子 -->
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item2, index2) in item.product_list" :key="index2" v-if="index2 !== 0" :url="item2.url">
              <image :src="item2.image_src" :style="{ width: item2.image_width + 'rpx' }" mode="widthFix"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js';
export default {
  mixins: [badgeMix],
  data() {
    return {
      // 轮播表数据数组
      swiperList: [],
      // 分类导航栏数据
      navList: [],
      // 楼层数据
      floorList: []
    };
  },
  onLoad() {
    this.getSwiperList();
    this.getNavList();
    this.getFloorList();
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
    async getFloorList() {
      const { data: res } = await uni.$http.get('/api/public/v1/home/floordata');
      // 请求失败
      if (res.meta.status !== 200) {
        return uni.$showMsg;
      }

      res.message.forEach((floor) => {
        floor.product_list.forEach((prod) => {
          prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1];
        });
      });

      this.floorList = res.message;
    },
    navClickHandler(item) {
      if (item.name === '分类') {
        uni.switchTab({
          url: '/pages/cate/cate'
        });
      }
    },
    gotoSearch() {
      uni.navigateTo({
        url: '/subpkg/search/search'
      });
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

.floor-title {
  width: 100%;
  height: 60rpx;
}

.right-img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.floor-img-box {
  display: flex;
  padding-left: 10rpx;
}

.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>

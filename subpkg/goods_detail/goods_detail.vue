<template>
  <view v-if="goods_info.goods_name" class="goods-details-container">
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, index) in goods_info.pics" :key="index">
        <image :src="item.pics_big" @click="preview(index)"></image>
      </swiper-item>
    </swiper>

    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="price">¥{{ goods_info.goods_price }}</view>
      <!-- 商品信息主体区域 -->
      <view class="goods-info-body">
        <!-- 商品的名字 -->
        <view class="goods-name">
          {{ goods_info.goods_name }}
        </view>
        <!-- 收藏 -->
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>

      <!-- 运费 -->
      <view class="yf">快递：免运费</view>
    </view>

    <!-- 详细内容介绍 -->
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>

    <!-- 底部购买栏 -->
    <view class="goods_nav">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
// 调用辅助函数映射全局存储，使用时使用数组中的对应名称
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
  computed: {
    // 通过store中注册的modules名调用，然后在数组中映射需要的数据
    ...mapState('m_cart', []),
    ...mapGetters('m_cart', ['total'])
  },
  watch: {
    // 定义监听器监听total值的变化
    total: {
      handler(newVal) {
        const findResult = this.options.find((x) => x.text === '购物车');
        if (findResult) {
          findResult.info = newVal;
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      goods_info: {},
      options: [
        {
          icon: 'shop',
          text: '店铺',
          infoBackgroundColor: '#007aff',
          infoColor: '#f5f5f5'
        },
        {
          icon: 'cart',
          text: '购物车',
          info: 0
        }
      ],
      buttonGroup: [
        {
          text: '加入购物车',
          backgroundColor: '#ff0000',
          color: '#fff'
        },
        {
          text: '立即购买',
          backgroundColor: '#ffa200',
          color: '#fff'
        }
      ]
    };
  },
  onLoad(options) {
    const goods_id = options.goods_id;
    this.getGoodsDetail(goods_id);
  },
  methods: {
    ...mapMutations('m_cart', ['addToCart']),
    async getGoodsDetail(goods_id) {
      const { data: res } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id });

      if (res.meta.status !== 200) return uni.$showMsg();

      // 使用正则替换商品详细中的数据
      res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display: block"').replace(/.webp/g, '.jpg');

      this.goods_info = res.message;
    },
    preview(index) {
      uni.previewImage({
        current: index,
        urls: this.goods_info.pics.map((x) => x.pics_big)
      });
    },
    onClick(e) {
      if (e.content.text === '购物车') {
        uni.switchTab({
          url: '/pages/cart/cart'
        });
      }
    },
    buttonClick(e) {
      if (e.content.text === '加入购物车') {
        // 购物车的数组，用来存储购物车中每个商品的信息对象
        // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state
        const goods = {
          goods_id: this.goods_info.goods_id,
          goods_name: this.goods_info.goods_name,
          goods_price: this.goods_info.goods_price,
          goods_count: 1,
          goods_small_logo: this.goods_info.goods_small_logo,
          goods_state: true
        };

        // 调用addToCart方法
        this.addToCart(goods);
      }
    }
  }
};
</script>

<style lang="scss">
swiper {
  height: 750rpx;

  image {
    width: 100%;
    height: 100%;
  }
}

.goods-info-box {
  padding: 10px;
  padding-right: 0;

  .price {
    color: #c00000;
    font-size: 18px;
    margin: 10px 0;
  }

  .goods-info-body {
    display: flex;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
      margin-right: 10px;
    }

    .favi {
      width: 120px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-left: 1px solid #efefef;
      color: gray;
    }
  }

  .yf {
    font-size: 12px;
    color: gray;
    margin: 10px 0;
  }
}

.goods_nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

.goods-details-container {
  padding-bottom: 50px;
}
</style>

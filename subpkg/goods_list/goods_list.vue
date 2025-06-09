<template>
  <view>
    <view class="goods-list">
      <block v-for="(goods, index) in goodsList" :key="index">
        <view class="goods-item">
          <!-- 左侧的盒子 -->
          <view class="goods-item-left">
            <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
          </view>
          <!-- 右侧的盒子 -->
          <view class="goods-item-right">
            <!-- 商品的名字 -->
            <view class="goods-name">
              {{ goods.goods_name }}
            </view>
            <view class="goods-info-box">
              <view class="goods-price">¥{{ goods.goods_price }}</view>
            </view>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 请求参数对象
      queryObj: {
        query: '',
        cid: '',
        pagenum: 1,
        pagesize: 10
      },
      goodsList: [],
      total: 0,
      defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
    };
  },
  onLoad(options) {
    this.queryObj.cid = options.cid || '';
    this.queryObj.query = options.query || '';

    this.getGoodsList();
  },
  methods: {
    async getGoodsList() {
      const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj);
      if (res.meta.status !== 200) return uni.$showMsg();

      this.goodsList = res.message.goods;
      this.total = res.message.total;
    }
  }
};
</script>

<style lang="scss">
.goods-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;

  .goods-item-left {
    margin-left: 5px;

    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }

  .goods-item-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 5px;

    .goods-name {
      font-size: 13px;
    }

    .goods-info-box {
      .goods-price {
        color: #c00000;
        font-size: 16px;
      }
    }
  }
}
</style>
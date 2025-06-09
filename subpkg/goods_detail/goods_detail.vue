<template>
  <view></view>
</template>

<script>
export default {
  data() {
    return {
      goods_info: {}
    };
  },
  onLoad(options) {
    const goods_id = options.goods_id;
    this.getGoodsDetail(goods_id);
  },
  methods: {
    async getGoodsDetail(goods_id) {
      const { data: res } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id });

      if (res.meta.status !== 200) return uni.$showMsg();

      this.goods_info = res.message;
    }
  }
};
</script>

<style></style>

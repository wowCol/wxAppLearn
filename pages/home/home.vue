<template>
  <view>Home</view>
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
        return uni.showToast({
          title: '数据请求失败',
          duration: 1500,
          icon: 'none'
        });
      }

      this.swiperList = res.message;
    }
  }
};
</script>

<style lang="scss"></style>

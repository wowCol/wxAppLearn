<template>
  <view>
    <view class="search-box">
      <uni-search-bar :focus="true" @input="input" :radius="100" clear-button="auto" cancel-button="none" />
    </view>

    <view class="sugg-list" v-if="searchList.length !== 0">
      <view class="sugg-item" v-for="(item, index) in searchList" :key="index" @click="gotoDetail(item)">
        <view class="goods-name">
          {{ item.goods_name }}
        </view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>

    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="clean"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item, index) in historys" :key="index" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      kw: '',
      // 返回的搜索相关内容列表
      searchList: [],
      // 搜索历史记录列表
      historyList: []
    };
  },
  onLoad() {
    this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]');
  },
  methods: {
    input(e) {
      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        this.kw = e;
        this.getSearchList();
        // console.log(e);
      }, 800);
    },
    async getSearchList() {
      if (this.kw.length === 0) {
        this.searchList = [];
        return;
      }

      const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw });
      if (res.meta.status !== 200) return uni.$showMsg();

      this.searchList = res.message;
      this.saveHistory();
    },
    gotoDetail(item) {
      uni.navigateTo({
        url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
      });
    },
    saveHistory() {
      // this.historyList.push(this.kw);

      const set = new Set(this.historyList);
      set.delete(this.kw);
      set.add(this.kw);

      this.historyList = Array.from(set);

      // 对搜索数据持久化存储
      uni.setStorageSync('kw', JSON.stringify(this.historyList));
    },
    clean() {
      this.historyList = [];
      uni.setStorageSync('kw', '[]');
    },
    gotoGoodsList(kw) {
      uni.navigateTo({
        url: '/subpkg/goods_list/goods_list?query=' + kw
      });
    }
  },
  computed: {
    historys() {
      return [...this.historyList].reverse();
    }
  }
};
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}

.sugg-list {
  padding: 0 5px;

  .sugg-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
  }

  .goods-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.history-box {
  padding: 0 5px;

  .history-title {
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;

    .uni-tag {
      margin-top: 5px;
      margin-right: 5px;
    }
  }
}
</style>

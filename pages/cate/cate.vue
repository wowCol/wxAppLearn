<template>
  <view>
    <view class="scroll-view-container">
      <!-- 左侧滑动栏 -->
      <scroll-view class="left-scroll-view" scroll-y="true" :style="{ height: wh + 'px' }">
        <block v-for="(item, index) in cateList" :key="index">
          <view :class="['left-scroll-view-item', index === active ? 'active' : '']" @click="activeChanged(index)">
            {{ item.cat_name }}
          </view>
        </block>
      </scroll-view>
      <!-- 右侧滑动栏 -->
      <scroll-view class="right-scroll-view" scroll-y="true" :style="{ height: wh + 'px' }" :scroll-top="scrollTop">
        <view class="cate-lv2" v-for="(item2, index2) in cateLevel2" :key="index2">
          <!-- 二级分类的标题 -->
          <view class="cate-lv2-title">/ {{ item2.cat_name }} /</view>
          <!-- 当前二级分类下的三级分类列表 -->
          <view class="cate-lv2-list">
            <!-- 三级分类的item项 -->
            <view class="cate-lv3-item" v-for="(item3, index3) in item2.children" :key="index3" @click="gotGoodsList(item3)">
              <!-- 三级分类的图片 -->
              <image :src="item3.cat_icon" mode=""></image>
              <!-- 三级分类的文本 -->
              <text>{{ item3.cat_name }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 当前屏幕的可用窗口高度
      wh: 0,
      // 当前选中的左侧滑动栏索引
      active: 0,
      // 左侧滑动栏数据
      cateList: [],
      // 二级分类的列表数据
      cateLevel2: [],
      // 三级分类的列表数据
      cateLevel3: [],
      scrollTop: 0
    };
  },
  onLoad() {
    const sysInfo = uni.getSystemInfoSync();

    this.wh = sysInfo.windowHeight;

    this.getCateList();
  },
  methods: {
    async getCateList() {
      const { data: res } = await uni.$http.get('/api/public/v1/categories');
      if (res.meta.status !== 200) return uni.$showMsg();

      this.cateList = res.message;

      // 为二级分类列表赋值
      this.cateLevel2 = res.message[0].children;
    },
    activeChanged(index) {
      this.active = index;

      // 为二级分类列表重新赋值
      this.cateLevel2 = this.cateList[index].children;

      this.scrollTop = this.scrollTop === 0 ? 1 : 0;
    },
    gotGoodsList(item) {
      uni.navigateTo({
        url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
      });
    }
  }
};
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 120px;

    .left-scroll-view-item {
      background-color: #f7f7f7;
      line-height: 60px;
      text-align: center;
      font-size: 12px;

      &.active {
        background-color: #ffffff;
        position: relative;

        &::before {
          content: ' ';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }
  }

  .right-scroll-view {
    .cate-lv2 {
      .cate-lv2-title {
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        padding: 15px 0;
      }

      .cate-lv2-list {
        display: flex;
        flex-wrap: wrap;
        background-color: white;

        .cate-lv3-item {
          width: 33.33%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-bottom: 10px;

          image {
            width: 70px;
            height: 70px;
          }

          text {
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
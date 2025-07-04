// 导入全局存储库
import {
  mapGetters,
} from 'vuex';

export default {
  computed: {
    ...mapGetters('m_cart', ['total']),
  },
  watch: {
    total() {
      this.setBadge();
    }
  },
  onShow() {
    this.setBadge();
  },
  data() {
    return {};
  },
  methods: {
    setBadge() {
      uni.setTabBarBadge({
        index: 2,
        text: `${this.total}`,
      });
    },
  },
};
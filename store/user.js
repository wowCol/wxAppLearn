export default {
  // 开启命名空间
  namespaced: true,

  // 数据
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    token: ''
  }),

  // 方法
  mutations: {
    updateAddress(state, address) {
      state.address = address;

      this.commit('m_user/saveAddressToStorage')
    },
    // 持久化存储address
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    }
  },

  // 获取数据
  getters: {
    addStr(state) {
      if (!state.address.provinceName) return '';

      return `${state.address.provinceName}-${state.address.cityName}-${state.address.countyName}-${state.address.detailInfo}`;
    }
  },
};
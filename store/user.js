export default {
  // 开启命名空间
  namespaced: true,

  // 数据
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    token: uni.getStorageSync('token')
  }),

  // 方法
  mutations: {
    updateAddress(state, address) {
      state.address = address;

      this.commit('m_user/saveAddressToStorage');
    },
    // 持久化存储address
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address));
    },
    updateUserInfo(state, userinfo) {
      state.userinfo = userinfo;

      this.commit('m_user/saveUserInfoToStorage');
    },
    // 持久化存储userinfo
    saveUserInfoToStorage(state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userinfo));
    },
    updateToken(state, token) {
      state.token = token;

      this.commit('m_user/saveTokenToStorage');
    },
    // 持久化存储token
    saveTokenToStorage(state) {
      uni.setStorageSync('token', state.token);
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
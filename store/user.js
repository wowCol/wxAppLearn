export default {
  // 开启命名空间
  namespaced: true,

  // 数据
  state: () => ({
    address: {},
  }),

  // 方法
  mutations: {
    updateAddress(state, address) {
      state.address = address;
    },
  },

  // 获取数据
  getters: {},
};
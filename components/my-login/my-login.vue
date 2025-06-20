<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
    <text class="tips-text">登录后尽享更多权益</text>
  </view>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'my-login',
  data() {
    return {};
  },
  methods: {
    ...mapMutations('m_user', ['updateUserInfo', 'updateToken']),
    async getToken(info) {
      // 获得code对应的值
      const [err, res] = await uni.login().catch((err) => err);

      if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败');

      // 准备参数
      const query = {
        code: res.code,
        encryptedData: info.encryptedData,
        iv: info.iv,
        rawData: info.rawData,
        signature: info.signature,
      };

      // console.log(info);
      // console.log(query);

      const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query);
      // if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！');

      this.updateToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo');
    },
    getUserProfile() {
      uni.getUserProfile({
        desc: '你的授权信息',
        success: (res) => {
          // 将信息存到 vuex 中
          res.userInfo.avatarUrl = '/static/avatar.jpg';
          this.updateUserInfo(res.userInfo);
          this.getToken(res);
        },
        fail: (res) => {
          return uni.$showMsg('您取消了登录授权');
        },
      });
    },
  },
};
</script>

<style lang="scss">
.login-container {
  height: 750rpx;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: ' ';
    display: block;
    width: 100%;
    height: 40px;
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 100%;
    transform: translateY(50%);
  }

  .contact-filled {
  }

  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #c00000;
  }

  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>

const STORAGE_KEY = 'user-info';
const TOKEN_KEY = 'token';
export default {
  namespaced: true,
  state: () => {
    return {
      // 用户 token
      token: uni.getStorageSync(TOKEN_KEY) || '',
      // 用户信息
      userInfo: uni.getStorageSync(STORAGE_KEY) || {}
    };
  },
  mutations: {
    /**
     * 保存 token 到 vuex
     */
    setToken(state, token) {
      state.token = token;
      this.commit('user/saveToken');
    },
    /**
     * 保存 token 到 本地存储
     */
    saveToken(state) {
      uni.setStorage({
        key: TOKEN_KEY,
        data: state.token
      });
    },
    /**
     * 删除 token
     */
    removeToken(state) {
        state.token = '';
        this.commit('user/saveToken');
    },
    /**
     * 保存 用户信息 到 vuex
     */
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      this.commit('user/saveUserInfo');
    },
    /**
     * 保存 用户信息 到 本地存储
     */
    saveUserInfo(state) {
      uni.setStorage({
        key: STORAGE_KEY,
        data: state.userInfo
      });
    },
    /**
     * 删除用户信息
     */
    removeUserInfo(state) {
        state.userInfo = {};
        this.commit('user/saveUserInfo');
    }    
  },
  actions: {
    
  }
};

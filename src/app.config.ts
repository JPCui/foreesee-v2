export default {
  pages: ["pages/index/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  },
  permission: {
    "scope.userLocation": {
      desc: "获取地理位置信息的用途描述"
    }
  }
};

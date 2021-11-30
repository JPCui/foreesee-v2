export default {
  pages: ["pages/index/index", "pages/search/index", "pages/wxa_login/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "轻云天气",
    navigationBarTextStyle: "black"
  },
  permission: {
    "scope.userLocation": {
      desc: "获取地理位置信息的用途描述"
    }
  }
};

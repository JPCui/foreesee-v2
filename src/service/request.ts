import * as Taro from "@tarojs/taro";


// api请求
export const httpRequest = function (
  url: string,
  params: object,
  method: any,
  showToast: boolean
) {

  if (showToast) {
    Taro.showLoading({
      title: "请稍后",
    });
  }

  return new Promise((resolve, reject) => {
    Taro.request({
      url: url,
      data: params,
      method: method,
      header: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        Taro.hideLoading();
        if(res.data.Code) {
          switch (res.data.Code) {
            case 200:
              return resolve(res.data);
  
            default:
              setTimeout(() => {
                Taro.showToast({
                  title: res.data.Msg,
                  icon: "none",
                });
              }, 500);
          }
        } else {
          return resolve(res.data);
        }
      })
      .catch((err) => {
        console.log(err)
        Taro.showToast({
          title: "网络繁忙，请稍后再试",
          icon: "none",
        });
        return reject(err);
      });
  });
};

const call = function (reqStr: string, params?: any) {
  console.log(reqStr);
  
  const arr = reqStr.split(" ");
  const method = arr[0];
  const url = arr[1];
  return httpRequest(url, params || {}, method, true);
};

export default call;

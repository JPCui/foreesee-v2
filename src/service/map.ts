import call from "./request";
// @ts-ignore
import Taro from "@tarojs/taro";

const Domain = `https://apis.map.qq.com`;

const MapApi = {
  /** status: 0, message: "query ok", result: ->
   {
      "ip": "36.110.47.57",
      "location": {
          "lat": 39.90569,
          "lng": 116.22299
      },
      "ad_info": {
          "nation": "中国",
          "province": "北京市",
          "city": "北京市",
          "district": "石景山区",
          "adcode": 110107
      }
    }
   */
  GetLocation: `GET ${Domain}/ws/location/v1/ip?key=QJCBZ-Q2TK3-NWM3K-YN2M2-D4M6V-PABR7`
};

export interface GetLocationResp {
  status: number;
  result: GetLocationModel;
}

export interface GetLocationModel {
  ip: string;
  ad_info: {
    nation: string;
    province: string;
    city: string;
    district: string;
    adcode: string;
  };
}

const cache_key_location = "curr_location";

const MapService = {
  GetLocation: async (refresh?: boolean): Promise<GetLocationModel> => {
    if (!refresh) {
      return new Promise((resolve, reject) => {
        Taro.getStorage({
          key: cache_key_location,
          success: ({ data }) => {
            resolve(data);
          },
          fail: async e => {
            const d = await MapService._GetLocation();
            resolve(d);
          }
        }).catch(e => {
          try {
            console.warn(e);
            reject(e);
          } catch (err) {
            console.error(err);
          }
        });
      });
    } else {
      return MapService._GetLocation();
    }
  },

  _GetLocation: async (): Promise<GetLocationModel> => {
    let location: GetLocationModel = null;
    let result: GetLocationResp = (await call(
      MapApi.GetLocation
    )) as GetLocationResp;
    if (result.status !== 0) {
      console.error(result);
      return;
    }
    const info = result.result;
    if (info.ad_info.province) {
      const length = info.ad_info.province.length;
      info.ad_info.province = info.ad_info.province.substr(0, length - 1);
    }
    if (info.ad_info.city) {
      const length = info.ad_info.city.length;
      info.ad_info.city = info.ad_info.city.substr(0, length - 1);
    }
    if (info.ad_info.district) {
      const length = info.ad_info.district.length;
      info.ad_info.district = info.ad_info.district.substr(0, length - 1);
    }
    console.log("set currLocation", info);
    Taro.setStorage({ key: cache_key_location, data: info });
    location = info;
    return new Promise((resolve, reject) => {
      resolve(location);
    });
  }
};

export default MapService;

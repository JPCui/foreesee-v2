import call from "./request";

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
    adcode: string;
  };
}

const MapService = {
  GetLocation: async () => {
    const location: GetLocationResp = (await call(
      MapApi.GetLocation
    )) as GetLocationResp;

    if (location.status !== 0) {
      console.error(location);
      return;
    }
    return location.result;
  }
};

export default MapService;

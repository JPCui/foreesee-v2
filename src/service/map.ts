const Domain = `https://apis.map.qq.com`;

const MapService = {
  GetLocation: `GET ${Domain}/ws/location/v1/ip?key=QJCBZ-Q2TK3-NWM3K-YN2M2-D4M6V-PABR7`
};

export default MapService;

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

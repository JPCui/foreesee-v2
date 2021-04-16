export class CityInfo {
  constructor(province, city, district: string) {
    this.province = province;
    this.city = city;
    this.district = district;
  }

  province: string;
  city: string;
  district: string;

  showSimple = (): string => {
    return this.district ? this.district : this.city;
  };

  showDetail = (): string => {
    return this.district
      ? this.city + ", " + this.district
      : this.province + ", " + this.city;
  };
}

export const pushCityInfo = (arr: CityInfo[], c: CityInfo) => {
  let exist = false;
  let found = null;
  let i = 0;
  for (; i < arr.length; i++) {
    let curr = arr[i];
    if (
      curr.province == c.province &&
      curr.city == c.city &&
      curr.district == c.district
    ) {
      found = curr;
      exist = true;
      break;
    }
  }
  if (exist) {
    console.log(arr);
    arr = [c].concat(arr.slice(0, i)).concat(arr.slice(i + 1, arr.length));
    console.log(arr);
    return arr;
  } else {
    return [c].concat(arr);
  }
};

// CityInfo.prototype.show = function () {
//   return this.district
//     ? this.city + " " + this.district
//     : this.province + " " + this.city;
// }

export interface SearchProps {
  onSelectCity: (cityInfo: CityInfo) => void;
}

export interface SearchState {
  keyword: string;
  items: {};

  isOnSearch: boolean;

  /**
   * 历史搜索
   */
  histories?: CityInfo[];
  /**
   * 热门
   */
  hots?: CityInfo[];
}

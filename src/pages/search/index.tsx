import * as React from "react";
import { Component } from "react";
import { View } from "@tarojs/components";

import "taro-ui/dist/style/components/calendar.scss";
import "taro-ui/dist/style/components/search-bar.scss";
import "taro-ui/dist/style/components/list.scss"; // 按需引入
import "taro-ui/dist/style/components/flex.scss";
import "../components/calendar/style/calendar.scss";
import "./style/search.scss";
import call from "../../service/request";
// @ts-ignore
import { AtList, AtListItem, AtSearchBar } from "taro-ui";
import Service, { CitySearchResponse } from "../../service/api";
import {
  CityInfo,
  pushCityInfo,
  SearchProps,
  SearchState
} from "./props/search";
import { back } from "../../sdk/page";
// @ts-ignore
import Taro from "@tarojs/taro";
import MapService from "../../service/map";

const KEY_HOTS = "hots";

export default class SearchComponent extends Component<
  SearchProps,
  SearchState
> {
  constructor(props) {
    super(props);
    this.state = {
      isOnSearch: false,
      keyword: "",
      items: {},
      histories: [],
      currLocation: new CityInfo("", "", ""),
      hots: [
        new CityInfo("北京", "北京", ""),
        new CityInfo("上海", "上海", ""),
        new CityInfo("广东", "广州", ""),

        new CityInfo("广东", "深圳", ""),
        new CityInfo("河南", "郑州", ""),
        new CityInfo("辽宁", "沈阳", ""),

        new CityInfo("浙江", "杭州", ""),
        new CityInfo("重庆", "重庆", ""),
        new CityInfo("四川", "成都", ""),

        new CityInfo("海南", "三亚", ""),
        new CityInfo("山东", "青岛", ""),
        new CityInfo("云南", "大理", "")
      ]
    };
  }

  componentWillMount() {
    Taro.setNavigationBarTitle({ title: "城市搜索" });

    // 初始化当前城市
    Taro.getLocation({
      type: "wgs84",
      success: async res => {
        // FIXIT
        const location = await MapService.GetLocation(false);
        const currLocation: CityInfo = new CityInfo(
          location.ad_info.province,
          location.ad_info.city,
          location.ad_info.district
        );
        this.setState({ currLocation });
      }
    });

    // 初始化历史搜索
    const key = KEY_HOTS;
    const _this = this;
    Taro.getStorage({
      key,
      fail: (res: Taro.getStorage.General.CallbackResult) => {
        try {
          console.error(res);
          _this.setState({ histories: res.data || [] });
        } catch (e) {
          console.error(e);
        }
      },
      success: (res: Taro.getStorage.SuccessCallbackResult<CityInfo[]>) => {
        let arr: CityInfo[] = res.data || [];
        Taro.setStorage({
          key,
          data: arr,
          success: () => {
            _this.setState({ histories: arr });
          }
        });
      }
    });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  /**
   * 用户选中某个城市后，回调到首页
   * @param item
   */
  onSelectCity = (cityInfo: CityInfo): number => {
    // item
    this.saveToHistory(cityInfo);
    // 触发事件
    Taro.eventCenter.trigger("onSelectItem", cityInfo);

    back();
    return 1;
  };

  saveToHistory(c: CityInfo) {
    const key = KEY_HOTS;
    const _this = this;
    Taro.getStorage({
      key,
      fail: (res: Taro.getStorage.General.CallbackResult) => {
        try {
          console.error(res);
          Taro.setStorage({
            key,
            data: [c],
            success: () => {
              _this.setState({ histories: [c] });
            }
          });
        } catch (e) {
          console.warn(e);
        }
      },
      success: (res: Taro.getStorage.SuccessCallbackResult<CityInfo[]>) => {
        let arr: CityInfo[] = res.data || [];
        if (arr.length >= 9) {
          arr = arr.slice(0, 8);
        }
        arr = pushCityInfo(arr, c);
        Taro.setStorage({
          key,
          data: arr,
          success: () => {
            _this.setState({ histories: arr });
          }
        });
      }
    });
  }

  /**
   *   清除历史
   */
  clearHistory() {
    const key = KEY_HOTS;
    Taro.clearStorage({ key });
  }

  async onKeywordInput(keyword) {
    this.setState({ keyword });
    if (!keyword) return;
    const resp: CitySearchResponse = (await call(
      Service.CITY_SEARCH + "city=" + keyword
    )) as CitySearchResponse;
    if (resp.status !== 200) {
      console.error(resp);
      return;
    }
    // FIXIT
    const items = resp.data.internal;
    this.setState({ items, isOnSearch: true });
  }

  onClearSearch = () => {
    this.setState({ isOnSearch: false });
  };

  onBlurSearch = () => {
    const { keyword } = this.state;
    if (!keyword) {
      this.onClearSearch();
    }
  };

  render() {
    const { hots, histories, items, isOnSearch, currLocation } = this.state;

    return (
      <View className="index" id="search-box">
        <AtSearchBar
          actionName="搜索"
          onActionClick={this.onKeywordInput.bind(this)}
          onChange={this.onKeywordInput.bind(this)}
          onClear={this.onClearSearch}
          onBlur={this.onBlurSearch}
          value={this.state.keyword}
        />
        <View className={`search-select-area ${isOnSearch ? "hide" : ""}`}>
          <View className="search-block" hidden={false}>
            <View className="search-item-title">当前定位</View>
            <View className="at-row at-row--wrap" hidden={currLocation == null}>
              <View className="at-col at-col-4">
                <View
                  className="search-item"
                  onClick={() => this.onSelectCity(currLocation)}
                >
                  {currLocation.showSimple()}
                </View>
              </View>
            </View>
          </View>
          <View className="search-block" hidden={hots.length == 0}>
            <View className="search-item-title">热门城市</View>
            <View className="at-row at-row--wrap">
              {hots.map((c: CityInfo) => {
                return (
                  <View className="at-col at-col-4">
                    <View
                      className="search-item"
                      onClick={() => this.onSelectCity(c)}
                    >
                      {c.showSimple()}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          <View className="search-block" hidden={histories.length == 0}>
            <View className="search-item-title">历史记录</View>
            <View className="at-row at-row--wrap">
              {histories.map((c: CityInfo) => {
                c = new CityInfo(c.province, c.city, c.district);
                return (
                  <View className="at-col at-col-4">
                    <View
                      className="search-item"
                      onClick={() => this.onSelectCity(c)}
                    >
                      {c.showSimple()}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        <View className={`${!isOnSearch ? "hide" : ""}`}>
          <AtList>
            {Object.values(items)?.map((item: string, idx) => {
              return (
                <AtListItem
                  key={idx}
                  title={item}
                  onClick={this.onSelectCity.bind(this, item)}
                />
              );
            })}
          </AtList>
        </View>
      </View>
    );
  }
}

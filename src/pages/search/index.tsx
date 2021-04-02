import * as React from "react";
import { Component } from "react";
import { View } from "@tarojs/components";

import "taro-ui/dist/style/components/calendar.scss";
import "taro-ui/dist/style/components/search-bar.scss";
import "taro-ui/dist/style/components/list.scss"; // 按需引入
import "taro-ui/dist/style/components/grid.scss";
import "taro-ui/dist/style/components/flex.scss";
import "../components/calendar/style/calendar.scss";
import call from "../../service/request";
// @ts-ignore
import { AtList, AtListItem, AtSearchBar } from "taro-ui";
import Service, { CitySearchResponse } from "../../service/api";
import { CityInfo, SearchProps, SearchState } from "./props/search";
import { back, getCurrentPages } from "../../sdk/page";
// @ts-ignore
import Taro from "@tarojs/taro";

export default class SearchComponent extends Component<
  SearchProps,
  SearchState
> {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      items: {}
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  /**
   * 用户选中某个城市后，回调到首页
   * @param item
   */
  onSelectCity = (item: string): number => {
    // item
    const arr = item.split(", ");
    const cityInfo: CityInfo = {
      province: arr[0],
      city: arr[1],
      district: arr[2]
    };

    console.log(this.props.onSelectCity);
    // this.props.onSelectCity(cityInfo);

    // 触发事件
    Taro.eventCenter.trigger("onSelectItem", cityInfo);

    back();
    return 1;
  };

  async onKeywordInput(keyword) {
    if (!keyword) return;
    this.setState({ keyword });
    const resp: CitySearchResponse = (await call(
      Service.CITY_SEARCH + "city=" + keyword
    )) as CitySearchResponse;
    if (resp.status !== 200) {
      console.error(resp);
      return;
    }
    const items = resp.data.internal;
    this.setState({ items });
  }

  render() {
    const { items } = this.state;

    return (
      <View className="index">
        <AtSearchBar
          actionName="搜索"
          onActionClick={this.onKeywordInput.bind(this)}
          onChange={this.onKeywordInput.bind(this)}
          value={this.state.keyword}
        />
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
    );
  }
}

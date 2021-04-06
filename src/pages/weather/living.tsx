import * as React from "react";
import { View } from "@tarojs/components";
import "taro-ui/dist/style/components/flex.scss";
import "./style/living.scss";
// @ts-ignore
import {
  livingIconMap,
  LivingModel,
  LivingProps,
  LivingState
} from "./props/living";

export default class Living extends React.Component<LivingProps, LivingState> {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { items } = this.props;
    return (
      <View className="living at-row at-row--wrap">
        {Object.keys(items).map(itemKey => {
          const item: LivingModel = items[itemKey];
          const icon = "icon " + livingIconMap[itemKey];
          return (
            livingIconMap[itemKey] && (
              <View className="at-col at-col-3 item">
                <View className={icon}>&nbsp;</View>
                <View className="content">{item.info}</View>
                <View className="title">{item.name}</View>
              </View>
            )
          );
        })}
      </View>
    );
  }
}

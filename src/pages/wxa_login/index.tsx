import * as React from "react";
import { Component } from "react";
import { Button, View } from "@tarojs/components";

import "taro-ui/dist/style/components/calendar.scss";
import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "taro-ui/dist/style/components/grid.scss";
import "taro-ui/dist/style/components/flex.scss";

const defaultProps = {};

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onLoad(props) {
    console.log("props", props);
  }

  render() {
    return (
      <View className="index">
        <View style={{ minHeight: "300px", textAlign: "center" }}>
          <Button type="primary">Login</Button>
        </View>
      </View>
    );
  }
}

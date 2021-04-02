// @ts-ignore
import Taro, { navigateTo as TaroNavigateTo } from "@tarojs/taro";

export function getCurrentPages() {
  return Taro.getCurrentPages();
}

export function back() {
  Taro.navigateBack({});
}

export function navigateTo(option: TaroNavigateTo.Option) {
  Taro.navigateTo(option);
}

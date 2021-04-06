/**
 * 生活 icon
 */
export const livingIconMap = {};
const livingIcons = [
  { key: "clothes", icon: "icon_chuanyi" },
  { key: "umbrella", icon: "icon_yusan" },
  { key: "cold", icon: "icon_ganmao" },
  { key: "carwash", icon: "icon_xiche" },
  { key: "sports", icon: "icon_yundong" },
  { key: "sunscreen", icon: "icon_fangsai" },
  { key: "fish", icon: "icon_diaoyu" },
  { key: "tourism", icon: "icon_lvyou" },
  { key: "traffic", icon: "icon_jiaotong" },
  { key: "diffusion", icon: "icon_wurankuosan" },
  { key: "comfort", icon: "icon_shushidu" },
  { key: "drying", icon: "icon_liangshai" }
];
livingIcons.map(item => {
  livingIconMap[item.key] = item.icon;
});
/**
 * 穿衣 icon
 */
export const chuanYiIconMap = {};
export const chuanYiIcons = [
  { key: 1, level: "炎热", icon: "icon_chuanyi_hot" },
  { key: 2, level: "热", icon: "icon_chuanyi_hot" },
  { key: 3, level: "舒适", icon: "icon_chuanyi_shushi" },
  { key: 4, level: "较舒适", icon: "icon_chuanyi_shushi" },
  { key: 5, level: "较冷", icon: "icon_chuanyi_jiaoleng" },
  { key: 6, level: "冷", icon: "icon_chuanyi_cool" },
  { key: 7, level: "寒冷", icon: "icon_chuanyi_cool" }
];
chuanYiIcons.forEach(item => {
  chuanYiIconMap[item.level] = item.icon;
});

export interface LivingModel {
  detail: string;
  info: string;
  name: string;
}

export interface LivingProps {
  items: LivingModel[];
}

export interface LivingState {}

import { IMenuItem } from "@/components/Layout/Menu";
import Home from "@/pages/Home";

export interface IMenuMap {
  [key: string]: IMenuItem;
}

const menuList: Array<IMenuItem> = [
  {
    key: 'home',
    title: '首页',
    path: '/home',
    component: Home
  }
];

export const menuMap = getMenuMap(menuList);

function getMenuMap (list: Array<IMenuItem>, map: IMenuMap = {}): IMenuMap {
  return list.reduce((res, cur) => {
    const { key, children } = cur;
    if (children) {
      getMenuMap(children, res);
    }
    res[key] = cur;
    return res;
  }, map);
}

export default menuList;
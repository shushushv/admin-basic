import { IMenuItem } from "@/components/Layout/Menu";

export interface IMenuMap {
  [key: string]: IMenuItem;
}

const menuList: Array<IMenuItem> = [
  {
    key: 'order-manager',
    title: '订单管理',
    path: '/order-manager',
    children: [
      // {
      //   key: 'order-list',
      //   title: '订单列表',
      //   path: '/order-manager/order-list',
      //   component: OrderList
      // }
    ]
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
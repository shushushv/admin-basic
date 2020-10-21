import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { SubMenu } = Menu;

export interface IMenuItem {
  title: string,
  key: string;
  path: string;
  component?: any;
  children?: Array<IMenuItem>;
}


interface ISiderMenuProps {
  menus: IMenuItem[];
}
const SiderMenu: React.FC<ISiderMenuProps> = ({
  menus
}) => {
  const { pathname } = useLocation();
  const paths = pathname.split('/').slice(1);

  const renderList = (subMenus?: Array<IMenuItem>) => {
    return (subMenus || menus).map(menuItem => {
      if (menuItem.children && menuItem.children.length > 0) {
        return <SubMenu key={menuItem.key} title={menuItem.title}>
          {renderList(menuItem.children)}
        </SubMenu>;
      }
      return <Menu.Item key={menuItem.key}>
        <Link to={menuItem.path}>
          {menuItem.title}
        </Link>
      </Menu.Item>;
    });
  }

  return <Menu
    mode="inline"
    theme="light"
    defaultOpenKeys={[paths[0]]}
    defaultSelectedKeys={paths}
  >
    {renderList()}
  </Menu>;
}

export default SiderMenu;
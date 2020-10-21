import React from 'react';
import { Layout } from "antd";
import configs from '@/configs';
import ScrollBar from '../ScrollBar';
import SiderMenu, { IMenuItem } from './Menu';
import './Sider.less';

interface ISiderProps {
  menus: IMenuItem[];
  collapsed: boolean;
}

const Sider: React.FC<ISiderProps> = ({
  menus,
  collapsed
}) => {
  return <Layout.Sider
    width={256}
    theme="light"
    breakpoint="lg"
    trigger={null}
    collapsed={collapsed}
    className="sider"
  >
    <div className="brand">
      <div className="logo">
        <img alt="logo" src={configs.logoPath} />
        {!collapsed && <h1>{configs.siteName}</h1>}
      </div>
    </div>
    <div className="menuContainer">
      <ScrollBar
        options={{
          // Disabled horizontal scrolling, https://github.com/utatti/perfect-scrollbar#options
          suppressScrollX: true,
        }}
      >
        <SiderMenu menus={menus}></SiderMenu>
      </ScrollBar>
    </div>
  </Layout.Sider>;
}

export default Sider;
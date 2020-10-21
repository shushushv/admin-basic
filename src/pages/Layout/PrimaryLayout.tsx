import React, { useState } from "react";
import { Layout } from "antd";
import { Fragment } from "react";
import MyLayout from "@/components/Layout";
import menuList from "@/configs/menu";
import store from 'store';
import './PrimaryLayout.less';

const { Sider, Header } = MyLayout;

const PrimaryLayout: React.FC<any> = () => {
  const [collapsed, setCollapsed] = useState(store.get('collapsed') || false);
  
  const { username, avatar } = store.get('user') || {};

  const onCollapseChange = () => {
    store.set('collapsed', !collapsed);
    setCollapsed(!collapsed);
  };

  const onSignOut = () => {

  };

  return <Fragment>
    <Layout>
      <Sider
        menus={menuList}
        collapsed={collapsed}
      ></Sider>
      <div
        className="container"
      >
        <Header
          username={username}
          avatar={avatar}
          collapsed={collapsed}
          onCollapseChange={onCollapseChange}
          onSignOut={onSignOut}
        ></Header>
      </div>
    </Layout>
  </Fragment>;
}

export default PrimaryLayout;
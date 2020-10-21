import React, { Fragment } from 'react';
import { Layout, Menu } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import './Header.less';

interface IHeaderProps {
  username: string;
  avatar: string;
  collapsed: boolean;
  onCollapseChange: () => void;
  onSignOut: () => void;
}

const Header: React.FC<IHeaderProps> = ({
  collapsed,
  username,
  avatar,
  onCollapseChange,
  onSignOut
}) => {
  const rightContent = [
    <Menu key="user" mode="horizontal">
      <Menu.SubMenu
        title={
          <Fragment>
            <span style={{ marginRight: 10 }}>你好，{username || '-'}</span>
            <Avatar src={avatar}></Avatar>
          </Fragment>
        }>
        <Menu.Item key="SignOut" onClick={onSignOut}>退出登录</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  ];

  return <Layout.Header className={collapsed ? 'collapsed header' : 'header'}>
    <div className="button"
      onClick={onCollapseChange}>
      {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </div>
    <div className="rightContainer">
      {rightContent}
    </div>
  </Layout.Header>;
};

export default Header;
import configs from '@/configs';
import { queryLayout } from '@/utils';
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import PrimaryLayout from './PrimaryLayout';
import PublicLayout from './PublicLayout';

interface ILayoutProps {}

const LayoutMap = {
  primary: PrimaryLayout,
  public: PublicLayout
}

const Layout: React.FC<ILayoutProps> = ({
  children
}) => {
  const { pathname } = useLocation();
  const Container = Reflect.get(LayoutMap, queryLayout(configs.layouts, pathname));
  
  return <Fragment>
    <Helmet>
      <title>{configs.siteName}</title>
    </Helmet>
    <Container>{children}</Container>
  </Fragment>;
};

export default Layout;
import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { menuMap } from '@/configs/menu';
import Layout from './Layout';

const App = () => {
  const routeList = () => {
    return Object.keys(menuMap)
      .map(key => menuMap[key])
      .filter(info => info.component)
      .map(({
        key,
        path,
        component
      }) => 
      <Route
        key={key}
        path={path}
        component={component}
      ></Route>);
  };

  return <Router>
    <Layout>{routeList()}</Layout>
  </Router>;
}

export default App;
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Routers } from './components/RouterContainer/Routers';
import { routeConfig } from '@/config/router';
import NoMatch from './pages/__Component/NoMatch';

function App() {
  return (
    <HashRouter>
      <Routers
        routers={routeConfig}
        noMatch={
          () => <NoMatch/>
        }
        intercept={(route) => {

        }} />
    </HashRouter>
  );
}

export default App;

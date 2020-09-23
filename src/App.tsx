import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routers } from './components/RouterContainer/Routers';
import { routeConfig } from '@/config/router';
import NoMatch from './pages/__Component/NoMatch';

function App() {
  return (
    <BrowserRouter>
      <Routers
        routers={routeConfig}
        noMatch={
          () => <NoMatch/>
        }
        intercept={(route) => {
        }} />
    </BrowserRouter>
  );
}

export default App;
